import { writable, get } from 'svelte/store'

const sheetId = '1Q4xbGVXImImBabQG-XFBG2cmaa3PQVPZIKtswmJ_ieQ'

export const isGroupValid = writable(['', false])
export const isDebugValid = writable(false)

export const fetchData = async () => {
  const url = `https://opensheet.vercel.app/${sheetId}/master`
  const response = await fetch(url)
  const result = (await response.json())[0]

  let allowedGroup = []
  if (result?.sesi1 && result?.sesi2) {
    allowedGroup = [result.sesi1, result.sesi2];
  }

  const group = (new URLSearchParams(window.location.search)).get('g') || null
  if (group && allowedGroup.includes(group)){
    isGroupValid.set([group, true])
  }

  const debug = (new URLSearchParams(window.location.search)).get('debug') || null
  if (debug && debug === result.debug) {
    isDebugValid.set(true)
  }
}
