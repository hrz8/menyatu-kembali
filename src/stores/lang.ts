import { writable, get } from 'svelte/store'

const sheetId = '1KcByBhOAg4SdYnsdOH6fPT-1MKJHp1PNW4_0TbZeS_4'

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
  await fetchData()
}

export const fetchData = async () => {
  const activeLanguage = get(active)
  const result = localStorage.getItem(`l_${activeLanguage}`)
  if (result) {
    data.set(JSON.parse(result))
    return
  }
  try {
    console.info('fetching locale for the first time...')
    const url = `https://opensheet.vercel.app/${sheetId}/${activeLanguage}`
    const response = await fetch(url)
    const result = (await response.json())[0]
    data.set(result || null)
    localStorage.setItem(`l_${activeLanguage}`, JSON.stringify(result))
  } catch (error) {
    console.error(error)
    data.set(null)
  } finally {
    loading.set(false)
  }
}
