<script>
  import { data as langDataStore } from '../stores/lang'
  import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.js'
  import { Subtract } from 'svelte-bootstrap-icons'

  const numbers = [
    {
      provider: 'BCA',
      no: '0920132383',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-bca.png'
    },
    {
      provider: 'mandiri',
      no: '1660003183688',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-mandiri.png'
    },
    {
      provider: 'BNI',
      no: '0906572673',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-bni.png'
    },
    {
      provider: 'Bank Muamalat',
      name: 'Urfa Aliya Hakim',
      no: '1110007208',
      img: '/payment-muamalat.png'
    },
    {
      provider: 'OVO',
      name: 'Urfa Aliya Hakim',
      no: '081902857128',
      img: '/payment-ovo.png'
    },
    {
      provider: 'gopay',
      name: 'Urfa Aliya Hakim',
      no: '081902857128',
      img: '/payment-gopay.png'
    }
  ]

  function onBCAClick(i) {
    const button = document.getElementById(`rek-${i}`)
    const number = numbers[i].no
    navigator.clipboard.writeText(number);
    const tooltip = new Tooltip(button, {
      title: `Copied: ${number}`,
      placement: 'top',
      delay: { hide: 2000 }
    })
    tooltip.show()
  }
</script>

<div class="modal fade" id="pennyModal" tabindex="-1" aria-labelledby="pennyModal" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="pennyModalLabel">{$langDataStore?.section_gift_send_money || 'section_gift_send_money'}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" style="max-height: 600px; overflow-y: auto;">
        {#each numbers as rek, i}
          <div class="card mb-3" style="width: 70%; margin: auto;">
            {#if rek.img}
              <img src={rek.img} class="card-img-top img-fluid p-3" alt="ovo qr">
            {/if}
            <div class="card-body">
              <h3 class="card-title">{rek.provider}</h3>
              <p class="card-text">a/n <strong>{rek.name}</strong></p>
              <p class="card-text">{rek.no}</p>
              <div class="d-grid gap-2">
                <button
                  id={`rek-${i}`}
                  on:click={() => onBCAClick(i)}
                  class="btn btn-hirzi btn-block"
                ><Subtract /> {$langDataStore?.copy_account_number || 'copy_account_number'}</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<style>
::-webkit-scrollbar {
  display: block !important;
  width: 10px !important;
}
  
::-webkit-scrollbar-thumb {
  background: #f9c6a1 !important; 
  border-radius: 10px !important;
}

::-webkit-scrollbar-thumb:hover {
  background: #c26522 !important; 
}
</style>
