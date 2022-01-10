<script>
  import { data as langDataStore } from '../stores/lang'
  import Map from './Map.svelte';
</script>

<div class="modal fade" id="mapModal" tabindex="-1" aria-labelledby="mapModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="mapModalLabel">{$langDataStore?.place_only || 'place_only'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- <div style="height: 300px; width:100%">
          <Map />
        </div> -->
        <iframe
          title={$langDataStore?.place_only || 'place_only'}
          src={$langDataStore?.map_iframe_src || 'map_iframe_src'}
          height="400"
          width="100%"
          style="border:0;"
          loading="lazy"
        ></iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
