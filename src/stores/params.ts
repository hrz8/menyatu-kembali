import { writable, get } from 'svelte/store'

const sheetId = '1Q4xbGVXImImBabQG-XFBG2cmaa3PQVPZIKtswmJ_ieQ'

export const isGroupValid = writable([-1, false])
export const isDebugValid = writable(false)

export const fetchData = async () => {
  const debug = (new URLSearchParams(window.location.search)).get('debug') === 'true'
  if (debug) {
    isDebugValid.set(true)
  }

  if (localStorage.getItem('g_code') && localStorage.getItem('g_sess')) {
    isGroupValid.set([Number(localStorage.getItem('g_sess')), true])
    return
  }

  const url = `https://opensheet.vercel.app/${sheetId}/master`
  const response = await fetch(url)
  const result = (await response.json())[0]

  let allowedGroup = []
  if (result?.sesi1 && result?.sesi2) {
    allowedGroup = [result.sesi1, result.sesi2]
  }

  const group = (new URLSearchParams(window.location.search)).get('g') || null
  if (group && allowedGroup.includes(group)) {
    const groupSession = allowedGroup.findIndex((o) => o === group) + 1;
    isGroupValid.set([groupSession, true])
    localStorage.setItem('g_code', String(group))
    localStorage.setItem('g_sess', String(groupSession))
  }
}
