<script>
  export let isDisplay = false;
</script>

<div style="display: {isDisplay ? 'block' : 'none'}" class="header-wrapper">
  <header>❤️</header>
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
    max-width: 400px;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background: #fff;
  }
</style>
