<script>
  import { data as langDataStore } from '../../stores/lang'
  import Carousel from './Carousel.svelte';
  import DateCard from './DateCard.svelte';
</script>

<div style="text-align: left; padding: 50px 30px">
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
</div>
