<script>
  import { House, PinMapFill, Watch, Gift } from 'svelte-bootstrap-icons'
</script>

<div class="nav-wrapper">
  <nav>
    <a class="text-decoration-none" href="#home"><House width="24" height="24" /></a>
    <a class="text-decoration-none" href="#location"><PinMapFill width="24" height="24" /></a>
    <a class="text-decoration-none" href="#schedule"><Watch width="24" height="24" /></a>
    <a class="text-decoration-none" href="#gift"><Gift width="24" height="24" /></a>
  </nav>
</div>

<style>
.nav-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 100;
  }

  nav {
    box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%);
    max-width: 400px;
    height: 55px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #ffffff;
  }

  nav > a {
    color: #304653 !important;
  }

  nav > a:hover {
    color: rgb(36, 51, 59) !important;
  }
</style>
