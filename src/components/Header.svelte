<script>
  import { ArrowRepeat } from 'svelte-bootstrap-icons'
  import {
    active as langActiveStore,
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
        } catch (error) {
          // do nothing
        }
      }}><ArrowRepeat width="18" height="18" /></button>
    {/if}
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
