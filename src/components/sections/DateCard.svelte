<script>
  import { data as langDataStore } from '../../stores/lang'
</script>

<div style="margin: 25px 0">
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 12px;">
    {$langDataStore?.section_date_date[0] || 'section_date_date'}
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 10px;">
    {$langDataStore?.section_date_date[1] || 'section_date_date'}
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; padding: 1px 10px;">
    /
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 10px;">
    {$langDataStore?.section_date_month[0] || 'section_date_month'}
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 10px;">
    {$langDataStore?.section_date_month[1] || 'section_date_month'}
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; padding: 1px 10px;">
    /
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 10px;">
    {$langDataStore?.section_date_year[0] || 'section_date_year'}
  </span>
  <span style="color: rgb(70 102 120); font-size: 30px; border: 1px solid rgb(70 102 120); border-radius: 7px; padding: 1px 10px;">
    {$langDataStore?.section_date_year[1] || 'section_date_year'}
  </span>
</div>
