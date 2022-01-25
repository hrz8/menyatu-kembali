<script>
  import { data as langDataStore } from '../../stores/lang'
</script>

<div class="d-flex justify-content-center bold-text">
  <div style="margin: 25px 0" class="align-items-center">
    <span class="primary-text-outside primary-box box inner-box" style="padding: 1px 14px;">
      {$langDataStore?.section_date_date[0] || 'section_date_date'}
    </span>
    <span class="primary-text-outside primary-box box inner-box">
      {$langDataStore?.section_date_date[1] || 'section_date_date'}
    </span>
    <span class="inner-box primary-text-outside" style="padding: 0 3px;">
      /
    </span>
    <span class="primary-text-outside primary-box box inner-box">
      {$langDataStore?.section_date_month[0] || 'section_date_month'}
    </span>
    <span class="primary-text-outside primary-box box inner-box">
      {$langDataStore?.section_date_month[1] || 'section_date_month'}
    </span>
    <span class="inner-box primary-text-outside" style="padding: 0 3px;">
      /
    </span>
    <span class="primary-text-outside primary-box box inner-box">
      {$langDataStore?.section_date_year[0] || 'section_date_year'}
    </span>
    <span class="primary-text-outside primary-box box inner-box">
      {$langDataStore?.section_date_year[1] || 'section_date_year'}
    </span>
  </div>
</div>

<style>
  .box {
    border-radius: 7px;
    padding: 1px 10px;
  }

  .inner-box {
    color: #304653;
    font-size: 30px;
  }

  @media (max-width: 380px) {
    .box {
      padding: 5px !important;
    }

    .inner-box {
      font-size: 18px;
    }
  }
</style>