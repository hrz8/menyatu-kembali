<script>
  import { data as langDataStore } from '../../stores/lang'
  import WishListModal from '../WishListModal.svelte';
</script>

<div style="padding: 35px; text-align: left;">
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

  <form>
    <div class="mb-3">
      <input type="email" class="form-control" placeholder={$langDataStore?.section_gift_form_name} aria-describedby="emailHelp">
    </div>
    <div class="mb-3">
      <textarea class="form-control" placeholder={$langDataStore?.section_gift_form_message} maxlength="140" rows="5"></textarea>
    </div>
    <div class="d-grid">
      <button type="submit" class="btn btn-urfa">{$langDataStore?.section_gift_form_send}</button>
    </div>
  </form>
</div>

<WishListModal />
