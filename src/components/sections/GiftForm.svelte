<script>
  import { Quote } from 'svelte-bootstrap-icons'
  import { data as langDataStore } from '../../stores/lang'
  import WishListModal from '../WishListModal.svelte'

  const spreadsheetId = '11R5Y-Ue-q9dSC881umzk3zzEydtBT7Ve8cMZwlzZ_WE'
  const sheetId = 'messages'
  const spreadsheetUrl = `https://opensheet.herokuapp.com/${spreadsheetId}/${sheetId}`
  const resetCacheUrl = `https://opensheet.herokuapp.com/cache/${spreadsheetId}-${sheetId}`

  let messagesState = []

  const fetchMessages = async () => {
    const response = await fetch(spreadsheetUrl)
    const result = await response.json() || []
    messagesState = result
    return result
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

  <p
    class="locale-text bold-text primary-text"
    style="font-size: 20px;"
  >{$langDataStore?.section_gift_form_title || 'section_gift_form_title'}</p>

  <form class="my-4">
    <div class="mb-3">
      <input type="email" class="form-control" placeholder={$langDataStore?.section_gift_form_name || 'section_gift_form_name'} aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <textarea class="form-control" placeholder={$langDataStore?.section_gift_form_message || 'section_gift_form_message'} maxlength="140" rows="5"></textarea>
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-urfa">{$langDataStore?.section_gift_form_send || 'section_gift_form_send'}</button>
    </div>
  </form>

  <div class="card shadow p-2 my-3 bg-body rounded" style="max-height: 300px; overflow-y: auto;">
    <div class="card-body">
      {#await fetchMessages()}
        <div class="d-flex justify-content-center align-items-center">
          <div class="spinner-grow text-secondary" role="status" style="width: 3rem; height: 3rem;" ></div>
        </div>
      {:then messages}
        {#if !messagesState.length}
          <h6 style="font-weight: 600;">{$langDataStore?.section_gift_messages_empty || 'section_gift_messages_empty'}</h6>
        {:else}
          {#each messages as message}
            <figure style="border-bottom: 1px dashed #f0b77e;">
              <blockquote class="blockquote" style="font-size: 16px;">
                <Quote width=24 height=24 />
                <p style="padding-left: 12px;">{message.message}</p>
              </blockquote>
              <figcaption class="blockquote-footer" style="font-size: 12px; font-weight: 600;">
                {message.name}
              </figcaption>
            </figure>
          {/each}
        {/if}
      {/await}
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
  background: #ffc387 !important; 
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #f0b77e !important; 
}
</style>
