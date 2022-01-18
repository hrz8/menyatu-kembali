<script>
  import {
    data as langDataStore,
    active as langActiveStore,
    toggleLanguage
  } from '../../stores/lang'
  import ModalAttendance from '../ModalAttendance.svelte';
  import WishListModal from '../WishListModal.svelte';

  const showGift = new URLSearchParams(window.location.search).get('o') === null
</script>

<div class="img-cover" style="background: url('/jumbotron-header.jpeg'); background-size: cover;">
  <div class="img-cover" style="text-align: left; padding: 130px 30px; background-color: rgba(255,255,255,.35)">
    <img
      style="cursor: pointer; position: absolute; top: 30px; right: 30px"
      src="./{$langActiveStore}.png"
      alt="flag_{$langActiveStore}"
      on:click={toggleLanguage}
    >
    <p
      class="locale-text primary-text bold-text"
      style="font-size: 20px;"
    >{$langDataStore?.cover_text_1 || 'cover_text_1'}</p>
    <h1
      class="locale-text bold-text"
      style="line-height: 1.5; font-size: 46px; color: #fff"
    >{$langDataStore?.cover_text_2 || 'cover_text_2'}</h1>
    <small
      class="locale-text bold-text fst-italic"
      style="line-height: 1.5; color: #fff"
    >{$langDataStore?.cover_text_3a || 'cover_text_3a'}</small>
    <br />
    <small
      class="locale-text bold-text fst-italic"
      style="line-height: 1.5; color: #fff"
    >{$langDataStore?.cover_text_3b || 'cover_text_3b'}</small>
    <div style="margin-top: 30px;">
      <a
        href="#congrats"
        type="button"
        class="btn btn-hirzi"
      >{$langDataStore?.cover_button_congrats || 'cover_button_congrats'}</a>
      {#if showGift}
      <a
        type="button"
        class="btn btn-urfa"
        href="#gift"
      >{$langDataStore?.cover_button_gift || 'cover_button_gift'}</a>
      {/if}
      <br />
      <button
        type="button"
        class="btn btn-urfa mt-3"
        data-bs-toggle="modal"
        data-bs-target="#confirmModal"
        disabled={!(new Date() < new Date($langDataStore?.event_date_gmt || 999999999999999))}
        style="background-color: #68879a !important; border-color: #68879a !important"
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</button>
    </div>
  </div>
</div>

<WishListModal />
<ModalAttendance />

<style>
  .img-cover {
    width: 100%;
    height: 650px;
    background-position: center center;
    border-bottom-right-radius: 110% 140px;
  }

  @media (max-width: 300px) {
    .img-cover {
      height: 800px;
    }
  }
</style>
