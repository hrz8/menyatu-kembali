<script lang="ts">
  import { Styles } from 'sveltestrap'
  import { onMount } from 'svelte'

  import Header from './components/Header.svelte'
  import Navbar from './components/Navbar.svelte'
  import Content from './components/Content.svelte'
  import { initialFetchData as initialFetchDataLang } from './stores/lang'
  import { isGroupValid, fetchData as fetchDataGroup, isDebugValid } from './stores/params'

  let displayHeader = false;

  window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (currentScrollPos > 70) {
      displayHeader = true;
    } else {
      displayHeader = false;
    }
  }

  onMount(async () => {
    await fetchDataGroup()
    await initialFetchDataLang()
  })
</script>

<Styles />

{#if $isDebugValid || $isGroupValid[1]}
  <main style="background: url('/background.png'); background-size: cover;">
    <div id="container-mk">
      <Header isDisplay={displayHeader} />
      
      <Content />
      
      <Navbar />
    </div>
  </main>
{:else}
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="spinner-grow text-secondary" role="status" style="width: 3rem; height: 3rem;" ></div>
  </div>
{/if}

<style>
  #container-mk {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    font-family: 'Poppins', sans-serif;
  }

  main {
    box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%);
    min-height: 100vh;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 55px;
  }
</style>
