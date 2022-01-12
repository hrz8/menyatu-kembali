<script>
  import Swal from 'sweetalert2'

  import { data as langDataStore } from '../stores/lang'
  import { sessionIds as sessionIdsStore } from '../stores/params'
  import {
    SPREADSHEET_RESPONSE_ATTENDANCE_SHEET_NAME,
    SPREADSHEET_RESPONSE_ID
  } from 'src/config';

  const spreadsheetUrl = `https://opensheet.herokuapp.com/${SPREADSHEET_RESPONSE_ID}/${SPREADSHEET_RESPONSE_ATTENDANCE_SHEET_NAME}`

  $: sentAlready = localStorage.getItem('cfmd') !== null

  const g_sess = Number(localStorage.getItem('g_sess'))
  const e_sess = JSON.parse(localStorage.getItem('e_sess') || '[]')

  let isAttendOrMaybe = true

  let nameInput = ''
  let emailInput = ''
  let originInput = ''
  let isAttendInput = null
  let sessionInput = null
  let personAmountInput = 0
  let sendingCorfimation = false

  langDataStore.subscribe(val => {
    isAttendInput = val?.confirm_placeholder_isattend_options.split(',')[0]
    isAttendOrMaybe =
      (val?.confirm_placeholder_isattend_options || '').split(',')[0] === isAttendInput
      || (val?.confirm_placeholder_isattend_options || '').split(',')[2] === isAttendInput
  });

  sessionIdsStore.subscribe(val => {
    sessionInput = val[g_sess - 1]
  })

  const swal = {
    title: 'alert_send_message_title',
    text: 'alert_send_confirmation_text',
    showCancelButton: true,
    confirmButtonText: 'alert_send_message_yes',
    cancelButtonText: 'alert_send_message_no',
    confirmButtonColor: '#c26522',
    cancelButtonColor: '#80a6b8'
  }

  const swalValidationEmail = {
    title: 'alert_send_message_oops',
    text: 'alert_send_confirmation_validation_email'
  }

  const swalValidationName = {
    title: 'alert_send_message_oops',
    text: 'alert_send_message_validation_name'
  }

  const swalValidationOrigin = {
    title: 'alert_send_message_oops',
    text: 'alert_send_confirmation_validation_origin'
  }

  const swalValidationPersonAmount = {
    title: 'alert_send_message_oops',
    text: 'alert_send_confirmation_validation_personAmount'
  }

  const mappingIsAttend = (isAttendInput) => {
    switch (isAttendInput) {
      case 0:
        return 1
      case 1:
        return 0
      case 2:
        return 'TENTATIVE'
      default:
        return ''
    }
  }

  const postConfirmation = async () => {
    sendingCorfimation = true
    try {
      const payload = JSON.stringify([
        nameInput,
        emailInput,
        originInput,
        mappingIsAttend(isAttendInput),
        e_sess.findIndex((o) => o === sessionInput),
        personAmountInput,
        new Date().toLocaleString(),
        new Date().toUTCString()
      ])
      const response = await fetch(spreadsheetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload
      })
      const result = await response.json()
      localStorage.setItem('cfmd', payload)
      sentAlready = true
      return result
    } catch (error) {
      return null
    } finally {
      sendingCorfimation = false
    }
  }
</script>

<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">{$langDataStore?.cover_button_confirm || 'place_only'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">
        {#if sentAlready}
          <h3>Hi {JSON.parse(localStorage.getItem('cfmd'))?.[0]}, thank you for your confirmation</h3>
        {:else}
          <form>
            <div class="mb-3">
              <label for="nameInput" class="form-label">{$langDataStore?.confirm_placeholder_name || 'confirm_placeholder_name'}</label>
              <input
                id="nameInput"
                type="text"
                minlength="3"
                class="form-control"
                disabled={sendingCorfimation || sentAlready}
                style="font-size: 14px;"
                bind:value={nameInput}>
            </div>
            <div class="mb-3">
              <label for="originInput" class="form-label">{$langDataStore?.confirm_placeholder_origin || 'confirm_placeholder_origin'}</label>
              <input
                id="originInput"
                type="text"
                minlength="3"
                class="form-control"
                disabled={sendingCorfimation || sentAlready}
                style="font-size: 14px;"
                bind:value={originInput}>
            </div>
            <div class="mb-3">
              <label for="isAttendInput" class="form-label">{$langDataStore?.confirm_placeholder_isattend || 'confirm_placeholder_isattend'}</label>
              <select
                id="isAttendInput"
                class="form-select"
                size="3"
                aria-label="attendance confirmation"
                disabled={sendingCorfimation || sentAlready}
                bind:value={isAttendInput}
              >
                {#each ($langDataStore?.confirm_placeholder_isattend_options || '').split(',') as option, i}
                  <option value={i}>{option}</option>
                {/each}
              </select>
            </div>
            {#if isAttendOrMaybe}
              <div class="mb-3">
                <label for="sessionInput" class="form-label">{$langDataStore?.confirm_placeholder_session || 'confirm_placeholder_session'}</label>
                <select
                  id="sessionInput"
                  class="form-select"
                  size="2"
                  aria-label="attendance session"
                  bind:value={sessionInput}
                >
                  {#each ($langDataStore?.confirm_placeholder_session_options || '').split(',') as option, i}
                    <option value={$sessionIdsStore[i]} selected={g_sess - 1 === i}>{option}{g_sess - 1 === i ? ' - Recommended' : ''}</option>
                  {/each}
                </select>
              </div>
              <div class="mb-3">
                <label for="emailInput" class="form-label">{$langDataStore?.confirm_placeholder_email || 'confirm_placeholder_email'} (Optional)</label>
                <input
                  id="emailInput"
                  type="email"
                  class="form-control"
                  disabled={sendingCorfimation || sentAlready}
                  style="font-size: 14px;"
                  aria-describedby="emailHelp"
                  bind:value={emailInput}>
                  <div id="emailHelp" class="form-text">{$langDataStore?.confirm_placeholder_email_help || 'confirm_placeholder_email_help'}</div>
              </div>
              <div class="mb-3">
                <label for="personAmountInput" class="form-label">{$langDataStore?.confirmation_placeholder_person_amount || 'confirmation_placeholder_person_amount'}</label>
                <input
                  id="personAmountInput"
                  type="number"
                  min="1"
                  max="20"
                  class="form-control"
                  disabled={sendingCorfimation || sentAlready}
                  style="font-size: 14px;"
                  bind:value={personAmountInput}>
              </div>
            {/if}
          </form>
        {/if}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button
          type="submit"
          class="btn btn-urfa"
          disabled={sendingCorfimation || sentAlready}
          on:click|preventDefault={() => {
            if (nameInput.length < 3 || nameInput.length > 256) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationName
              })
              return
            }
            if (
                emailInput.length
                && !emailInput.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
              ) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationEmail
              })
              return
            }
            if (isAttendOrMaybe && (personAmountInput < 1 || personAmountInput > 20)) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationPersonAmount
              })
              return
            }
            if (originInput.length < 3 || originInput.length > 512) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationOrigin
              })
              return
            }
            Swal.fire({...swal, icon: 'question'})
              .then(async (res) => {
                if (res.value) {
                  await postConfirmation()
                }
              })
          }}
        >{sendingCorfimation ?
          'Confirming...' :
            sentAlready ?
              $langDataStore?.confirmation_label_placeholder_button_confirmed || 'confirmation_label_placeholder_button_confirmed' :
              $langDataStore?.confirmation_label_placeholder_button || 'confirmation_label_placeholder_button'}</button>
      </div>
    </div>
  </div>
</div>
