<script>
  import { data as langDataStore } from '../../stores/lang'
import Carousel from './Carousel.svelte';
import DateCard from './DateCard.svelte';
</script>

<div style="text-align: left; padding: 60px 30px">
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

<style>
  .img-cover {
    width: 100%;
    height: 650px;
    background-position: center center;
    border-bottom-right-radius: 110% 140px;
  }

  .btn-hirzi {
    color: #fff;
    background-color: #ffc387;
    border-color: #ffc387;
  }

  .btn-hirzi:hover {
    color: #fff;
    background-color: #f0b77e;
    border-color: #f0b77e;
  }

  .btn-urfa {
    color: #fff;
    background-color: #96b8c8;
    border-color: #96b8c8;
  }

  .btn-urfa:hover {
    color: #fff;
    background-color: #80a6b8;
    border-color: #80a6b8;
  }
</style>
