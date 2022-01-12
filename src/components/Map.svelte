<script>
  import { onMount } from 'svelte'
  import { data as langDataStore } from '../stores/lang'

  let mapContainer
  let map

  onMount(async () => {
    langDataStore.subscribe((val) => {
      initMap(val)
    })
  })

  const buildInfoWindowContent = (lang) => {
    const content = document.createElement("div")
    content.style.padding = '10px'

    const nameElement = document.createElement("h6")
    nameElement.textContent = lang?.place_only || 'place_only'
    content.appendChild(nameElement)

    const placeAddressElement = document.createElement("p")
    placeAddressElement.textContent = lang?.place_address || 'place_address'
    content.appendChild(placeAddressElement)

    const linkElement = document.createElement("a")
    linkElement.href = lang?.place_link || 'place_link'
    linkElement.target = '_blank'
    linkElement.append('View on Google Maps')
    content.appendChild(linkElement)

    return content
  }

  function initMap(lang) {
    // @ts-ignore
    const mapLatLang = new google.maps.LatLng(Number(lang?.event_latitude) || 0, Number(lang?.event_longitude) || 0)

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
      title: lang?.place_only || 'place_only',
    })

    // @ts-ignore
    const infowindow = new google.maps.InfoWindow({
      content: buildInfoWindowContent(lang),
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
