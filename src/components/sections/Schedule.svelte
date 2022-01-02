<script>
  import { data as langDataStore } from '../../stores/lang'
</script>

<div class="schedule" style="text-align: left; background: url('/background-cropped.jpeg'); background-size: cover;">
  <p
    style="white-space: pre-line; font-size: 20px; color: rgb(70 102 120);"
  >{$langDataStore?.section_schedule_note || 'section_schedule_note'}</p>

  <div class="card" style="background-color: #c7d8e1;">
    <p style="white-space: pre-line;">{$langDataStore?.section_schedule_engagement || 'section_schedule_engagement'}</p>
    <p style="white-space: pre-line;">{$langDataStore?.place_only || 'place_only'}</p>
    <p style="white-space: pre-line; margin-bottom: 0 !important">{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</p>
  </div>
  <div class="card" style="background-color: #f0b77e;">
    <p style="white-space: pre-line;">{$langDataStore?.section_schedule_party_1 || 'section_schedule_party_1'}</p>
    <p style="white-space: pre-line;">{$langDataStore?.place_only || 'place_only'}</p>
    <p style="white-space: pre-line; margin-bottom: 0 !important">{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</p>
  </div>
  <div class="card" style="background-color: rgb(158 190 207);;">
    <p style="white-space: pre-line;">{$langDataStore?.section_schedule_party_2 || 'section_schedule_party_2'}</p>
    <p style="white-space: pre-line;">{$langDataStore?.place_only || 'place_only'}</p>
    <p style="white-space: pre-line; margin-bottom: 0 !important">{$langDataStore?.cover_button_confirm || 'cover_button_confirm'}</p>
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

  .card {
    font-size: 14px;
    padding: 12px;
    margin-bottom: 20px;
    border: transparent;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 25%)
  }
</style>