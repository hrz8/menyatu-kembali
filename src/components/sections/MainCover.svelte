<script>
  import {
    data as langDataStore,
    active as langActiveStore,
    toggleLanguage
  } from '../../stores/lang'
import WishListModal from '../WishListModal.svelte';
</script>

<div class="img-cover" style="background: url('/jumbotron-header.jpeg'); background-size: cover;">
  <div class="img-cover" style="text-align: left; padding: 160px 30px; background-color: rgba(255,255,255,.35)">
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
    <div style="margin-top: 30px;">
      <a
        href="#congrats"
        type="button"
        class="btn btn-hirzi"
      >{$langDataStore?.cover_button_congrats || 'cover_button_congrats'}</a>
      <button
        type="button"
        class="btn btn-urfa"
        data-bs-toggle="modal"
        data-bs-target="#giftModal"
      >{$langDataStore?.cover_button_gift || 'cover_button_gift'}</button>
      <button
        type="button"
        class="btn btn-urfa mt-3"
        style="background-color: #68879a !important; border-color: #68879a !important"
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</button>
    </div>
  </div>
</div>

<WishListModal />

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
