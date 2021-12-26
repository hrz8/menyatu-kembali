import { writable, get } from 'svelte/store'

const sheetId = '1KcByBhOAg4SdYnsdOH6fPT-1MKJHp1PNW4_0TbZeS_4'

export const loading = writable(true)
export const data = writable((function () {
  try {
    return JSON.parse(localStorage.getItem('lc'))
  } catch (error) {
    return null
  }
}()) || null)
export const active = writable(localStorage.getItem('l') || 'id')

export const fetchData = async () => {
  if (get(data)) return
  try {
    console.log('fetch locale...')
    const url = `https://opensheet.vercel.app/${sheetId}/${get(active)}`
    const response = await fetch(url)
    const result = (await response.json())[0]
    data.set(result || null)
    localStorage.setItem('lc', JSON.stringify(result))
  } catch (error) {
    console.error()
    data.set(null)
  } finally {
    loading.set(false)
  }
}
