<script>
  import { ArrowRepeat } from 'svelte-bootstrap-icons'
  import {
    active as langActiveStore,
    data as langDataStore,
    toggleLanguage,
    fetchData as fetchDataLang
  } from '../stores/lang'
  import { isDebugValid } from '../stores/params';

  export let isDisplay = false;
</script>

<div style="display: {isDisplay ? 'block' : 'none'}" class="header-wrapper">
  <header>
    {#if $isDebugValid}
      <button class="btn" on:click={async () => {
        try {
          await fetchDataLang()
          localStorage.removeItem('g_code')
          localStorage.removeItem('g_sess')
          localStorage.removeItem('m')
          localStorage.removeItem('cfmd')
          localStorage.removeItem('e_sess')
        } catch (error) {
          // do nothing
        }
      }}><ArrowRepeat width="18" height="18" /></button>
    {/if}
    <div
      class="mx-3 primary-text bold-text"
      style="color: rgb(104, 135, 154) !important;"
    >{$langDataStore?.cover_text_2 || 'cover_text_2'}</div>
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
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding-right: 25px;
    background: #fff;
  }
</style>
