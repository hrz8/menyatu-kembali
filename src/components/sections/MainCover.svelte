<script>
  import {
    data as langDataStore,
    active as langActiveStore,
    toggleLanguage
  } from '../../stores/lang'
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
      style="white-space: pre-line; font-size: 20px; color: rgb(70 102 120);"
    >{$langDataStore?.cover_text_1 || 'cover_text_1'}</p>
    <h1
      style="white-space: pre-line; line-height: 1.5; font-size: 46px; color: #fff"
    >{$langDataStore?.cover_text_2 || 'cover_text_2'}</h1>
    <div style="margin-top: 30px;">
      <button class="btn btn-hirzi">{$langDataStore?.cover_button_congrats || 'cover_button_congrats'}</button>
      <button class="btn btn-urfa">{$langDataStore?.cover_button_gift || 'cover_button_gift'}</button>
      <button class="btn btn-urfa mt-3">{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</button>
    </div>
  </div>
</div>

<style>
  .img-cover {
    width: 100%;
    height: 650px;
    background-position: center center;
    border-bottom-right-radius: 110% 140px;
  }

  .btn-hirzi {
    color: #fff;
    background-color: #ffc387;
    border-color: #ffc387;
  }

  .btn-hirzi:hover {
    color: #fff;
    background-color: #f0b77e;
    border-color: #f0b77e;
  }

  .btn-urfa {
    color: #fff;
    background-color: #96b8c8;
    border-color: #96b8c8;
  }

  .btn-urfa:hover {
    color: #fff;
    background-color: #80a6b8;
    border-color: #80a6b8;
  }
</style>
