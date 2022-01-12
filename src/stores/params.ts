import {
  SPREADSHEET_TOKEN_ID,
  SPREADSHEET_TOKEN_SHEET_NAME
} from '../config'
import { writable, get } from 'svelte/store'

export const isGroupValid = writable([-1, false])
export const isDebugValid = writable(false)
export const sessionIds = writable([null, null])

export const fetchData = async () => {
  const debug = (new URLSearchParams(window.location.search)).get('debug') === 'true'
  if (debug) {
    isDebugValid.set(true)
  }

  if (localStorage.getItem('g_code') && localStorage.getItem('g_sess')) {
    isGroupValid.set([Number(localStorage.getItem('g_sess')), true])
  }

  if (localStorage.getItem('e_sess')) {
    const eventIds = JSON.parse(localStorage.getItem('e_sess'))
    sessionIds.set([eventIds[0], eventIds[1]])
  }

  if ((localStorage.getItem('g_code') && localStorage.getItem('g_sess')) || localStorage.getItem('e_sess')) {
    return
  }

  const url = `https://opensheet.herokuapp.com/${SPREADSHEET_TOKEN_ID}/${SPREADSHEET_TOKEN_SHEET_NAME}`
  const response = await fetch(url)
  const result = (await response.json())[0]

  let allowedGroup = []
  if (result?.sesi1 && result?.sesi2) {
    allowedGroup = [result.sesi1, result.sesi2]
  }

  if (result?.sesi1_event_id && result?.sesi2_event_id) {
    const eventIds = [result.sesi1_event_id, result.sesi2_event_id]
    sessionIds.set(eventIds)
    localStorage.setItem('e_sess', JSON.stringify(eventIds))
  }

  const group = (new URLSearchParams(window.location.search)).get('g') || null
  if (group && allowedGroup.includes(group)) {
    const groupSession = allowedGroup.findIndex((o) => o === group) + 1;
    isGroupValid.set([groupSession, true])
    localStorage.setItem('g_code', String(group))
    localStorage.setItem('g_sess', String(groupSession))
  }
}
