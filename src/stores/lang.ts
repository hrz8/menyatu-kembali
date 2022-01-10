import { SPREADSHEET_LOCALE_ID } from '../config'
import { writable, get } from 'svelte/store'

export const loading = writable(true)
export const active = writable(localStorage.getItem('l') || 'id')
export const data = writable((function () {
  try {
    return JSON.parse(localStorage.getItem(`l_${get(active)}`))
  } catch (error) {
    return null
  }
}()) || null)

export const toggleLanguage = async () => {
  active.update((prev) => {
    if (prev === 'id') {
      localStorage.setItem('l', 'en')
      return 'en'
    }
    localStorage.setItem('l', 'id')
    return 'id'
  })
  await initialFetchData()
}

export const fetchData = async () => {
  const activeLanguage = get(active)
  const url = `https://opensheet.herokuapp.com/${SPREADSHEET_LOCALE_ID}/${activeLanguage}`
  const response = await fetch(url)
  const result = (await response.json())[0]
  data.set(result || null)
  localStorage.setItem(`l_${activeLanguage}`, JSON.stringify(result))
}

export const initialFetchData = async () => {
  const activeLanguage = get(active)
  const result = localStorage.getItem(`l_${activeLanguage}`)
  if (result) {
    data.set(JSON.parse(result))
    return
  }
  try {
    console.info('fetching locale for the first time...')
    await fetchData();
  } catch (error) {
    console.error(error)
    data.set(null)
  } finally {
    loading.set(false)
  }
}
