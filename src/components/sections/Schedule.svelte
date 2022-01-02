<script>
  import { data as langDataStore } from '../../stores/lang'
  import { ArrowRight } from 'svelte-bootstrap-icons'
</script>

<div class="schedule" style="text-align: left; background: url('/background-cropped.jpeg'); background-size: cover;">
  <p
    class="locale-text bold-text"
    style="font-size: 20px; color: rgb(70 102 120);"
  >{$langDataStore?.section_schedule_note || 'section_schedule_note'}</p>

  <div class="p-3">
    <div class="card-mk mb-4" style="background-color: rgb(199, 216, 225); border: 1px solid rgb(165 208 231);">
      <!-- akad -->
      <p
        class="locale-text bold-text primary-text mb-2"
      >{$langDataStore?.section_schedule_engagement || 'section_schedule_engagement'}</p>
      <p
        class="locale-text primary-text"
      >{$langDataStore?.place_only || 'place_only'}</p>
      <button
        class="px-0 btn btn-confirm mb-0"
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'} <ArrowRight /></button>
    </div>
    <div class="card-mk mb-4" style="background-color: rgb(255 197 156); border: 1px solid rgb(255, 149, 39);">
      <!-- resepsi 1 -->
      <p
        class="locale-text bold-text primary-text mb-2"
      >{$langDataStore?.section_schedule_party_1 || 'section_schedule_party_1'}</p>
      <p
        class="locale-text primary-text"
      >{$langDataStore?.place_only || 'place_only'}</p>
      <button
        class="px-0 btn btn-confirm mb-0"
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'} <ArrowRight /></button>
    </div>
    <div class="card-mk" style="background-color: rgb(158 190 207); border: 1px solid rgb(86 166 209);">
      <!-- resepsi 2 -->
      <p
        class="locale-text bold-text primary-text mb-2"
      >{$langDataStore?.section_schedule_party_2 || 'section_schedule_party_2'}</p>
      <p
        class="locale-text primary-text"
      >{$langDataStore?.place_only || 'place_only'}</p>
      <button
        class="px-0 btn btn-confirm mb-0"
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'} <ArrowRight /></button>
    </div>
  </div>
</div>

<style>
  .schedule {
    box-shadow: 0 0 48px 0 rgb(0 0 0 / 30%);
    max-width: 400px;
    height: 100%;
    padding: 35px;
    background: #fff;
  }

  .card-mk {
    font-size: 14px;
    padding: 20px;
    border: transparent;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 25%)
  }

  .btn-confirm {
    color: rgb(181 92 0);
  }

  .btn-confirm:hover {
    color: rgb(139, 70, 0);
  }
</style>