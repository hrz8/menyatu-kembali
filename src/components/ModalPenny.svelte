<script>
  import { data as langDataStore } from '../stores/lang'
  import { Tooltip } from 'bootstrap/dist/js/bootstrap.bundle.js'
  import { Subtract } from 'svelte-bootstrap-icons'

  const numbers = [
    {
      provider: 'BCA',
      no: '088292901010',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-bca.png'
    },
    {
      provider: 'OVO',
      no: '083116823235',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-bca.png'
    },
    {
      provider: 'GoPay',
      no: '083116823235',
      name: 'Hirzi Nurfakhrian',
      img: '/payment-bca.png'
    },
    {
      provider: 'Jenius',
      name: 'Hirzi Nurfakhrian',
      no: '083116823235',
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
      <div class="modal-body">
        {#each numbers as rek, i}
          <div class="card mb-3" style="width: 70%; margin: auto;">
            {#if rek.img}
              <img src={rek.img} class="card-img-top img-fluid" alt="ovo qr">
            {/if}
            <div class="card-body">
              <h5 class="card-title">{rek.provider}</h5>
              <p class="card-text">a/n {rek.name}</p>
              <p class="card-text">{rek.no}</p>
              <div class="d-grid gap-2">
                <button
                  id={`rek-${i}`}
                  on:click={() => onBCAClick(i)}
                  class="btn btn-hirzi btn-block"
                ><Subtract /> Copy</button>
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
