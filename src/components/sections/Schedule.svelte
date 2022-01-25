<script>
  import { data as langDataStore } from '../../stores/lang'
  import { ArrowRight } from 'svelte-bootstrap-icons'
  import { isGroupValid } from '../../stores/params'
  import ModalAttendance from '../ModalAttendance.svelte'
</script>

<div class="schedule" style="text-align: left;">
  <p
    class="locale-text bold-text primary-text-outside"
    style="font-size: 20px;"
  >{$langDataStore?.section_schedule_note || 'section_schedule_note'}</p>

  <div class="card-mk mb-4" style="background-color: #d8e2e8; border: 1px solid #d8e2e8;">
    <!-- akad -->
    <p
      class="locale-text bold-text primary-text mb-2"
    >{$langDataStore?.section_schedule_engagement || 'section_schedule_engagement'}</p>
    <p
      class="locale-text primary-text"
    >{$langDataStore?.place_only || 'place_only'}</p>
    <button
      class="px-0 btn btn-confirm mb-0"
      disabled={true}
    ><i style="color: #3e3e3e;">{$langDataStore?.section_schedule_only_family || 'section_schedule_only_family'}</i></button>
  </div>
  <div class="card-mk mb-4" style="background-color: #f9c5a1; border: 1px solid rgb(255, 149, 39);">
    <!-- resepsi 1 -->
    {#if $isGroupValid[0] === 1}
    <div class="suggestion-snippet">
      <div class="suggestion-text">{$langDataStore?.session_suggestion || 'session_suggestion'}</div>
    </div>
    {/if}
    <p
      class="locale-text bold-text primary-text mb-2"
    >{$langDataStore?.section_schedule_party_1 || 'section_schedule_party_1'}</p>
    <p
      class="locale-text primary-text"
    >{$langDataStore?.place_only || 'place_only'}</p>
    <button
      class="px-0 btn btn-confirm mb-0"
      data-bs-toggle="modal"
      data-bs-target="#confirmModal"
      disabled={$isGroupValid[0] !== 1 || !(new Date() < new Date($langDataStore?.event_date_gmt || 999999999999999))}
    >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'} <ArrowRight /></button>
  </div>
  <div class="card-mk" style="background-color: #9fb5c2; border: 1px solid #9fb5c2;">
    <!-- resepsi 2 -->
    {#if $isGroupValid[0] === 2}
    <div class="suggestion-snippet">
      <div class="suggestion-text">{$langDataStore?.session_suggestion || 'session_suggestion'}</div>
    </div>
    {/if}
    <p
      class="locale-text bold-text primary-text mb-2"
    >{$langDataStore?.section_schedule_party_2 || 'section_schedule_party_2'}</p>
    <p
      class="locale-text primary-text"
    >{$langDataStore?.place_only || 'place_only'}</p>
    <button
      class="px-0 btn btn-confirm mb-0"
      data-bs-toggle="modal"
      data-bs-target="#confirmModal"
      disabled={$isGroupValid[0] !== 2 || !(new Date() < new Date($langDataStore?.event_date_gmt || 999999999999999))}
      >{$langDataStore?.cover_button_confirm || 'cover_button_confirm'} <ArrowRight /></button>
  </div>
</div>

<ModalAttendance />

<style>
  .schedule {
    max-width: 400px;
    height: 100%;
    padding: 55px 20px;
    padding-bottom: 10px;
  }

  .suggestion-snippet {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    position: absolute;
    top: 40%;
    width: 185.4px;
    height: 36px;
    right: -20.6%;
    background-color: #fff;
    transform:rotate(270deg);
    -ms-transform:rotate(270deg);
    -webkit-transform:rotate(270deg);
  }

  .suggestion-text {
    color: rgb(139, 70, 0);
    margin-top: 7px;
    text-align: center;
    font-size: 12px;
  }

  .card-mk {
    font-size: 14px;
    padding: 20px;
    border: transparent;
    border-radius: 3px;
    box-shadow: 0 0 5px 0 rgb(0 0 0 / 25%);
    position: relative;
  }

  .btn-confirm {
    color: rgb(181 92 0);
  }

  .btn-confirm:hover {
    color: rgb(139, 70, 0);
  }

  button[disabled] {
    cursor: not-allowed !important;
    color: #eee;
  }

  @media (max-width: 400px) {
    .suggestion-snippet {
      right: -74px;
      width: 185px;
      height: 36px;
      top: 40%;
    }
  }
</style>
