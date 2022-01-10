<script>
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { data as langDataStore } from '../stores/lang'

  let mapContainer
  let map

  onMount(async () => {
    initMap()
  })

  const buildInfoWindowContent = () => {
    const content = document.createElement("div")
    content.style.padding = '10px'

    const nameElement = document.createElement("h6")
    nameElement.textContent = get(langDataStore)?.place_only || 'place_only'
    content.appendChild(nameElement)

    const placeAddressElement = document.createElement("p")
    placeAddressElement.textContent = get(langDataStore)?.place_address || 'place_address'
    content.appendChild(placeAddressElement)

    const linkElement = document.createElement("a")
    linkElement.href = get(langDataStore)?.place_link || 'place_link'
    linkElement.target = '_blank'
    linkElement.append('View on Google Maps')
    content.appendChild(linkElement)

    return content
  }

  function initMap() {
    // @ts-ignore
    const mapLatLang = new google.maps.LatLng(-6.865941, 107.6297091)

    // @ts-ignore
    map = new google.maps.Map(
      mapContainer,
      {
        zoom: 15,
        center: mapLatLang,
        mapTypeControl: false
      }
    )

    // @ts-ignore
    const marker = new google.maps.Marker({
      position: mapLatLang,
      map,
      title: get(langDataStore)?.place_only || 'place_only',
    })

    // @ts-ignore
    const infowindow = new google.maps.InfoWindow({
      content: buildInfoWindowContent(),
      position: mapLatLang
    })
    infowindow.open(map)

    // @ts-ignore
    google.maps.event.addListener(marker, "click", () => {
      infowindow.open(map, marker)
    })
  }
</script>

<div style='height: 100%' id='map' bind:this={mapContainer}></div>
