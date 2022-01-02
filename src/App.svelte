<script lang="ts">
  import { Styles } from 'sveltestrap'
  import { onMount } from 'svelte'

  import Header from './components/Header.svelte'
  import Navbar from './components/Navbar.svelte'
  import Content from './components/Content.svelte'
  import { fetchData } from './stores/lang'

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
    await fetchData()
  })
</script>

<Styles />

<main style="background: url('/background.png'); background-size: cover;">
  <div id="container-mk">
    <Header isDisplay={displayHeader} />
    
    <Content />
    
    <Navbar />
  </div>
</main>

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
