<script>
  import { onMount } from 'svelte'

  let mapContainer
  let map

  onMount(async () => {
    initMap()
  })

  function initMap() {
    const myLatLng = { lat: -6.865941, lng: 107.6297091 }
    // @ts-ignore
    map = new google.maps.Map(
      mapContainer,
      {
        zoom: 15,
        center: myLatLng,
      }
    );

    // @ts-ignore
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
</script>

<div style="height: 100%;" id="map" bind:this={mapContainer}></div>
