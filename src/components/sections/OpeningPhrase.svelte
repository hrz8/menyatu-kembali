<script>
  import { data as langDataStore } from '../../stores/lang'
  import Carousel from './Carousel.svelte';
  import DateCard from './DateCard.svelte';
</script>

<div style="text-align: left; padding: 50px 30px">
  <p
    style="white-space: pre-line; font-size: 20px; color: rgb(70 102 120);"
  >{$langDataStore?.section_date_note || 'section_date_note'}</p>
  <DateCard />
  <p
    style="white-space: pre-line; font-size: 14px; color: rgb(70 102 120);"
    class="mb-4"
  >{$langDataStore?.section_date_additional_note || 'section_date_additional_note'}</p>
  <p
    style="white-space: pre-line; font-size: 20px; color: rgb(70 102 120);"
  >{$langDataStore?.section_date_place || 'section_date_place'}</p>
  <div class="py-2 px-4">
    <Carousel />
  </div>
</div>
