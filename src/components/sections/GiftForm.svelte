<script>
  import { onMount } from 'svelte'
  import { Quote } from 'svelte-bootstrap-icons'
  import Swal from 'sweetalert2'
  import dayjs from 'dayjs'

  import { data as langDataStore } from '../../stores/lang'
  import WishListModal from '../WishListModal.svelte'
  import relativeTime from 'dayjs/plugin/relativeTime'
  import {
    SPREADSHEET_RESPONSE_ID,
    SPREADSHEET_RESPONSE_MESSAGE_SHEET_NAME
  } from '../../config';

  dayjs.extend(relativeTime)

  const spreadsheetUrl = `https://opensheet.herokuapp.com/${SPREADSHEET_RESPONSE_ID}/${SPREADSHEET_RESPONSE_MESSAGE_SHEET_NAME}`
  
  $: sentAlready = localStorage.getItem('m')?.startsWith(`${SPREADSHEET_RESPONSE_MESSAGE_SHEET_NAME}!`) || false

  let messagesState = []

  let nameInput = ''
  let messageTextarea = ''
  let sendingMessage = false

  const swal = {
    title: 'alert_send_message_title',
    text: 'alert_send_message_text',
    showCancelButton: true,
    confirmButtonText: 'alert_send_message_yes',
    cancelButtonText: 'alert_send_message_no',
    confirmButtonColor: '#c26522',
    cancelButtonColor: '#80a6b8'
  }

  const swalValidationName = {
    title: 'alert_send_message_oops',
    text: 'alert_send_message_validation_name'
  }

  const swalValidationMessage = {
    title: 'alert_send_message_oops',
    text: 'alert_send_message_validation_message'
  }

  onMount(() => {
    langDataStore.subscribe((value) => {
      swal.title = value.alert_send_message_title
      swal.text = value.alert_send_message_text
      swal.confirmButtonText = value.alert_send_message_yes
      swal.cancelButtonText = value.alert_send_message_no
      swalValidationName.title = value.alert_send_message_oops
      swalValidationName.text = value.alert_send_message_validation_name
      swalValidationMessage.title = value.alert_send_message_oops
      swalValidationMessage.text = value.alert_send_message_validation_message
    })
  })

  const fetchMessages = async () => {
    try {
      const response = await fetch(spreadsheetUrl)
      const result = (await response.json() || []).slice().reverse()
      messagesState = result
      return result
    } catch (error) {
      return []
    }
  }

  const postMessage = async () => {
    sendingMessage = true
    try {
      const response = await fetch(spreadsheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([
          nameInput,
          messageTextarea,
          new Date().toLocaleString(),
          new Date().toUTCString()
        ])
      })
      const result = await response.json()
      localStorage.setItem('m', result?.updates?.updatedRange)
      sentAlready = true
      await fetchMessages()
      return result
    } catch (error) {
      return null
    } finally {
      nameInput = ''
      messageTextarea = ''
      sendingMessage = false
    }
  }
</script>

<div style="padding: 55px 35px; padding-bottom: 30px; text-align: left;">
  <p
    class="locale-text bold-text primary-text"
    style="font-size: 20px;"
  >{$langDataStore?.section_gift_note || 'section_gift_note'}</p>
  <p
    class="mb-4 locale-text primary-text"
    style="font-size: 16px;"
  >{$langDataStore?.section_gift_description || 'section_gift_description'}</p>

  <button
    type="button"
    class="bold-text btn btn-hirzi mb-3"
    style="display: block; width: 180px"
  >{$langDataStore?.section_gift_send_money || 'section_gift_send_money'}</button>

  <button
    type="button"
    class="bold-text btn btn-urfa mb-5"
    style="display: block; width: 180px"
    data-bs-toggle="modal"
    data-bs-target="#giftModal"
  >{$langDataStore?.section_gift_send_gift || 'section_gift_send_gift'}</button>

  <div id="congrats">
    <p
      class="locale-text bold-text primary-text"
      style="font-size: 20px;"
    >{$langDataStore?.section_gift_form_title || 'section_gift_form_title'}</p>

    <form class="my-4">
      <div class="mb-3">
        <input
          type="text"
          minlength="3"
          class="form-control"
          disabled={sendingMessage || sentAlready}
          style="font-size: 14px;"
          placeholder={$langDataStore?.section_gift_form_name || 'section_gift_form_name'}
          bind:value={nameInput}>
      </div>
      <div class="mb-3">
        <textarea
          class="form-control"
          disabled={sendingMessage || sentAlready}
          placeholder={$langDataStore?.section_gift_form_message || 'section_gift_form_message'}
          minlength="10"
          maxlength="500"
          rows="5"
          style="font-size: 14px;"
          bind:value={messageTextarea}
        ></textarea>
      </div>
      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-urfa"
          disabled={sendingMessage || sentAlready}
          on:click|preventDefault={() => {
            if (nameInput.length < 3) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationName
              })
              return
            }
            if (messageTextarea.length < 10) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationMessage
              })
              return
            }
            Swal.fire({...swal, icon: 'question'})
              .then(async (res) => {
                if (res.value) {
                  await postMessage()
                }
              })
          }}
        >{sendingMessage ?
          'Sending...' :
            sentAlready ?
              $langDataStore?.alert_send_message_alreadysent || 'alert_send_message_alreadysent' :
              $langDataStore?.section_gift_form_send || 'section_gift_form_send'}</button>
      </div>
    </form>

    <div class="card shadow p-2 my-3 bg-body rounded" style="max-height: 300px; overflow-y: auto;">
      <div class="card-body">
        {#await fetchMessages()}
          <div class="d-flex justify-content-center align-items-center">
            <div class="spinner-grow text-secondary" role="status" style="width: 3rem; height: 3rem;" ></div>
          </div>
        {:then}
          {#if !messagesState.length}
            <h6 style="font-weight: 600;">{$langDataStore?.section_gift_messages_empty || 'section_gift_messages_empty'}</h6>
          {:else}
            {#each messagesState as message}
              <figure style="border-bottom: 1px dashed #c26522;">
                <blockquote class="blockquote mb-4" style="font-size: 16px;">
                  <Quote width=24 height=24 />
                  <p style="padding-left: 12px;">{message.message}</p>
                </blockquote>
                <figcaption class="blockquote-footer" style="font-size: 12px; font-weight: 600;">
                  {message.name}<cite title="time ago"> - {dayjs().to(dayjs(message.submittedAtUTC))}</cite>
                </figcaption>
              </figure>
            {/each}
          {/if}
        {/await}
      </div>
    </div>
  </div>
</div>

<WishListModal />

<style>
::-webkit-scrollbar {
  display: block !important;
  width: 5px !important;
}
 
::-webkit-scrollbar-thumb {
  background: #f9c6a1 !important; 
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #c26522 !important; 
}
</style>
