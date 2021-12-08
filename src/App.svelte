<script lang="ts">
  import logo from './assets/svelte.png'
  import Counter from './lib/Counter.svelte'
</script>

<main style="background: url('/background.png'); background-size: cover;">
  <div class="container-mk">
    <div class="header-wrapper">
      <header>Wedding</header>
    </div>
    <img src={logo} alt="Svelte Logo" />
    <h1>Hello!</h1>
  
    <Counter />
  
    <p>
      Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte
      apps.
    </p>
  
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
    <p>
      Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for
      the officially supported framework, also powered by Vite!
    </p>
  
    <div class="nav-wrapper">
      <nav>
        <a href="/lol">Home</a>
        <a href="/lol">Home</a>
        <a href="/lol">Home</a>
        <a href="/lol">Home</a>
      </nav>
    </div>
  </div>
</main>

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
    background: #ff3e00;
  }
  .nav-wrapper {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 100;
  }
  nav {
    max-width: 400px;
    height: 55px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #ff3e00;
  }
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .container-mk {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  main {
    box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%);
    min-height: 100vh;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
    padding-bottom: 55px;
    padding-top: 55px;
  }

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
