<script>
  import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js'
  import Swal from 'sweetalert2'

  import { data as langDataStore } from '../stores/lang'
  import { sessionIds as sessionIdsStore } from '../stores/params'
  import {
    SPREADSHEET_RESPONSE_ATTENDANCE_SHEET_NAME,
    SPREADSHEET_RESPONSE_ID
  } from '../config';
  import { onDestroy, onMount } from 'svelte';

  let isPersonAMountMore = false
  let justConfirmed = false

  let sentAlready = false
  let isAttendOrMaybe = true

  const spreadsheetUrl = `https://opensheet.herokuapp.com/${SPREADSHEET_RESPONSE_ID}/${SPREADSHEET_RESPONSE_ATTENDANCE_SHEET_NAME}`

  $: {
    sentAlready = localStorage.getItem('cfmd') !== null
    isAttendOrMaybe = isAttendInput === 0 || isAttendInput === 2
  }

  const g_sess = Number(localStorage.getItem('g_sess'))
  const e_sess = JSON.parse(localStorage.getItem('e_sess') || '[]')

  let nameInput = ''
  let emailInput = ''
  let originInput = ''
  let isAttendInput = 0
  let sessionInput = null
  let personAmountInput;
  let sendingCorfimation = false

  onMount(() => {
    justConfirmed = false
  })

  onDestroy(() => {
    justConfirmed = false
  })

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

  const swalValidationPersonAmountEmpty = {
    title: 'alert_send_message_oops',
    text: 'alert_send_confirmation_validation_personAmount_b'
  }

  langDataStore.subscribe(val => {
    swal.title = val?.alert_send_message_title || 'alert_send_message_oops'
    swal.text = val?.alert_send_confirmation_text || 'alert_send_confirmation_text'
    swal.confirmButtonText = val?.alert_send_message_yes || 'alert_send_message_yes'
    swal.cancelButtonText = val?.alert_send_message_no || 'alert_send_message_no'
    swalValidationEmail.title = val?.alert_send_message_oops || 'alert_send_message_oops'
    swalValidationName.title = val?.alert_send_message_oops || 'alert_send_message_oops'
    swalValidationOrigin.title = val?.alert_send_message_oops || 'alert_send_message_oops'
    swalValidationPersonAmount.title = val?.alert_send_message_oops || 'alert_send_message_oops'
    swalValidationPersonAmountEmpty.title = val?.alert_send_message_oops || 'alert_send_message_oops'
    swalValidationEmail.text = val?.alert_send_confirmation_validation_email || 'alert_send_confirmation_validation_email'
    swalValidationName.text = val?.alert_send_message_validation_name || 'alert_send_message_validation_name'
    swalValidationOrigin.text = val?.alert_send_confirmation_validation_origin || 'alert_send_confirmation_validation_origin'
    swalValidationPersonAmount.text = val?.alert_send_confirmation_validation_personAmount || 'alert_send_confirmation_validation_personAmount'
    swalValidationPersonAmountEmpty.text = val?.alert_send_confirmation_validation_personAmount_b || 'alert_send_confirmation_validation_personAmount_b'
  })

  const mappingIsAttend = (isAttendInput) => {
    switch (isAttendInput) {
      case 0:
        return 1 // YES
      case 1:
        return 0 // NO
      case 2:
        return 'TENTATIVE'
      default:
        return ''
    }
  }

  const mappingIsAttendGoogleCalendar = (value) => {
    switch (value) {
      case 0:
        return 'declined'
      case 1:
        return 'accepted'
      case 'TENTATIVE':
        return 'tentative'
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
        mappingIsAttend(isAttendInput) === 0
          ? 'N/A'
          : e_sess.findIndex((o) => o === sessionInput) + 1,
        g_sess,
        mappingIsAttend(isAttendInput) === 0
          ? 'N/A'
          : personAmountInput,
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
      if (emailInput.length) {
        await fetch(
          `https://gopencalendar.herokuapp.com/send/${sessionInput}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipient: emailInput,
            response: mappingIsAttendGoogleCalendar(mappingIsAttend(isAttendInput))
          })
        })
      }
      localStorage.setItem('cfmd', payload)
      sentAlready = true
      return result
    } catch (error) {
      return null
    } finally {
      sendingCorfimation = false
      justConfirmed = true
    }
  }

  const parseLang = (lang, key, replace, name) => {
    const str = lang?.[key] || key
    const res = str.replace(replace, name)
    return res
  }

  const parseMaybe = (value, replace) => {
    if (JSON.parse(localStorage.getItem('cfmd'))?.[3] !== 'TENTATIVE') {
      return value.replace('{{maybe}}', ' ')
    }
    const res = value.replace('{{maybe}}', replace)
    return res
  }
</script>

<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">{$langDataStore?.cover_button_confirm || 'place_only'}</h5>
        <button
          type="button"
          on:click={() => justConfirmed = false}
          class="btn-close"
          data-bs-dismiss="modal"
          disabled={sendingCorfimation}
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body text-start" style="max-height: 500px; overflow-y: auto;">
        {#if sentAlready}
          <h5
            class="bold-text mb-3"
          >{parseLang(
              $langDataStore,
              'confirmation_label_placeholder_heading_already',
              '{{name}}',
              JSON.parse(localStorage.getItem('cfmd'))?.[0]
            )}</h5>
          {#if JSON.parse(localStorage.getItem('cfmd'))?.[3]}
            <p>{parseMaybe(parseLang(
              $langDataStore,
              justConfirmed ? (
                mappingIsAttend(isAttendInput) === 'TENTATIVE' ?
                  'thank_you_confirmed_just_maybe' : 'thank_you_confirmed_just'
                ) : 'thank_you_confirmed',
              '{{session}}',
              localStorage.getItem('l') === 'en'
                ? (
                    JSON.parse(localStorage.getItem('cfmd'))?.[4] === 1
                      ? `${JSON.parse(localStorage.getItem('cfmd'))?.[4]}st`
                      : `${JSON.parse(localStorage.getItem('cfmd'))?.[4]}nd`
                  )
                : JSON.parse(localStorage.getItem('cfmd'))?.[4]
              ), localStorage.getItem('l') === 'en' ? ' maybe ' : ' mungkin ')}</p>
          {:else}
            <p>{$langDataStore?.thank_you_confirmed_no || 'thank_you_confirmed_no'}</p>
          {/if}
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
                aria-describedby="originHelp"
                style="font-size: 14px;"
                bind:value={originInput}>
              <div id="originHelp" class="form-text">{$langDataStore?.confirm_placeholder_origin_help || 'confirm_placeholder_origin_help'}</div>
            </div>
            <div class="mb-3">
              <label
                for="isAttendInput"
                class="form-label"
              >{$langDataStore?.confirm_placeholder_isattend || 'confirm_placeholder_isattend'}</label>
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
                <label
                  for="sessionInput"
                  class="form-label"
                >{$langDataStore?.confirm_placeholder_session || 'confirm_placeholder_session'}</label>
                <select
                  id="sessionInput"
                  class="form-select"
                  size="2"
                  aria-label="attendance session"
                  disabled={sendingCorfimation || sentAlready}
                  bind:value={sessionInput}
                >
                  {#each ($langDataStore?.confirm_placeholder_session_options || '').split(',') as option, i}
                    <option value={e_sess[i]}>{option}{g_sess - 1 === i ? ' - Recommended' : ''}</option>
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
                  on:input={(e) => {
                    // @ts-ignore
                    const n = Number(e.target.value)
                    if (n > 20) {
                      isPersonAMountMore = true
                    } else {
                      isPersonAMountMore = false
                    }
                  }}
                  bind:value={personAmountInput}>
                {#if isPersonAMountMore}
                  <div id="personAmountHelp" class="form-text">max: 20</div>
                {/if}
              </div>
            {/if}
          </form>
        {/if}
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          disabled={sendingCorfimation}
          on:click={() => justConfirmed = false}
        >{sentAlready ? 'OK' : 'Close'}</button>
        {#if !sentAlready}
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
            if (originInput.length < 3 || originInput.length > 512) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationOrigin
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
            if (mappingIsAttend(isAttendInput) !== 0 && (personAmountInput === null || personAmountInput === undefined)) {
              Swal.fire({
                icon: 'error',
                confirmButtonColor: '#c26522',
                ...swalValidationPersonAmountEmpty
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
            Swal.fire({...swal, icon: 'question'})
              .then(async (res) => {
                if (res.value) {
                  await postConfirmation()
                }
              })
          }}
        >{sendingCorfimation ?
          $langDataStore?.confirming_status || 'confirming_status' :
            sentAlready ?
              $langDataStore?.confirmation_label_placeholder_button_confirmed || 'confirmation_label_placeholder_button_confirmed' :
              $langDataStore?.confirmation_label_placeholder_button || 'confirmation_label_placeholder_button'}</button>
        {/if}
      </div>
    </div>
  </div>
</div>

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
