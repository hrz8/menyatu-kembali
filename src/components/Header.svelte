<script>
  import { active as langActiveStore, toggleLanguage } from '../stores/lang'
  export let isDisplay = false;
</script>

<div style="display: {isDisplay ? 'block' : 'none'}" class="header-wrapper">
  <header>
    <img
      style="cursor: pointer;"
      src="./{$langActiveStore}.png"
      alt="flag_{$langActiveStore}"
      on:click={toggleLanguage}
    >
  </header>
</div>

<style>
  .header-wrapper {
    position: fixed;
    top: 0;
    width: 100%;
    left: 0;
    z-index: 100;
  }

  header {
    box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%);
    max-width: 400px;
    height: 55px;
    display: flex;
    justify-content: end;
    align-items: center;
    margin: 0 auto;
    padding-right: 25px;
    background: #fff;
  }
</style>
