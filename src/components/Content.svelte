<script>
  import GiftForm from "./sections/GiftForm.svelte"
  import MainCover from "./sections/MainCover.svelte"
  import OpeningPhrase from "./sections/OpeningPhrase.svelte"
  import Schedule from "./sections/Schedule.svelte"

  export let ready
</script>

{#if ready}
  <div id="home">
    <MainCover />
  </div>

  <div id="location">
    <OpeningPhrase />
  </div>

  <div id="schedule">
    <Schedule />
  </div>

  <div id="gift">
    <GiftForm />
  </div>
{/if}
