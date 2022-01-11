<script>
  import { get } from 'svelte/store';

  import { data as langDataStore } from '../stores/lang'
  import { sessionIds as sessionIdsStore } from '../stores/params'

  $: sentAlready = localStorage.getItem('c') !== null

  const g_sess = Number(localStorage.getItem('g_sess'))

  let nameInput = ''
  let emailInput = ''
  let originInput = ''
  let isAttendInput = null
  let sessionInput = null
  let personAmountInput = 0
  let sendingCorfimation = false

  langDataStore.subscribe(val => {
    isAttendInput = val?.confirm_placeholder_isattend_options.split(',')[0]
  });

  sessionIdsStore.subscribe(val => {
    sessionInput = val[g_sess - 1]
  })
</script>

<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="confirmModalLabel">{$langDataStore?.cover_button_confirm || 'place_only'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body text-start">
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
              bind:value={isAttendInput}
            >
              {#each ($langDataStore?.confirm_placeholder_isattend_options || '').split(',') as option}
                <option value={option}>{option}</option>
              {/each}
            </select>
          </div>
          {#if (
            $langDataStore?.confirm_placeholder_isattend_options || '').split(',')[0] === isAttendInput
            || ($langDataStore?.confirm_placeholder_isattend_options || '').split(',')[2] === isAttendInput
          }
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
                class="form-control"
                disabled={sendingCorfimation || sentAlready}
                style="font-size: 14px;"
                bind:value={personAmountInput}>
            </div>
          {/if}
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button
          type="submit"
          class="btn btn-urfa"
          disabled={sendingCorfimation || sentAlready}
        >{sendingCorfimation ?
          'Confirming...' :
            sentAlready ?
              $langDataStore?.confirmation_label_placeholder_button_confirmed || 'confirmation_label_placeholder_button_confirmed' :
              $langDataStore?.confirmation_label_placeholder_button || 'confirmation_label_placeholder_button'}</button>
      </div>
    </div>
  </div>
</div>
