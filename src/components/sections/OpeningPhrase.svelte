<script>
  import { Map, ArrowRight } from 'svelte-bootstrap-icons'
  import { data as langDataStore } from '../../stores/lang'
  import Carousel from './Carousel.svelte'
  import DateCard from './DateCard.svelte'
  import MapGoogle from '../Map.svelte'
import MapModal from '../MapModal.svelte'
</script>

<div style="text-align: left; padding: 55px 30px">
  <p
    class="locale-text primary-text bold-text mb-0"
    style="font-size: 20px;"
  >{$langDataStore?.section_date_note || 'section_date_note'}</p>
  <DateCard />
  <p
    class="mb-4 locale-text primary-text"
    style="font-size: 16px;"
  >{$langDataStore?.section_date_additional_note || 'section_date_additional_note'}</p>
  <p
    class="locale-text primary-text bold-text"
    style="font-size: 20px;"
  >{$langDataStore?.section_date_place || 'section_date_place'}</p>
  <div class="py-2 px-4">
    <Carousel />
  </div>
  <div class="mt-4 d-flex justify-content-center">
    <!-- <a
      href="https://goo.gl/maps/Z4XUmgvTzHLhZVx37"
      target="__blank"
      class="btn btn-hirzi bold-text"
      style="box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%)"
    > -->
    <button
      class="btn btn-hirzi bold-text"
      style="box-shadow: 0 0 48px 0 rgb(0 0 0 / 20%)"
      data-bs-toggle="modal"
      data-bs-target="#mapModal">
      <Map width="24" height="24" />
      <span class="px-1">{$langDataStore?.open_map_button || 'open_map_button'}</span>
      <ArrowRight width="24" height="24" />
    </button>
  </div>
</div>

<MapModal />
