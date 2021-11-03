import axios from 'axios'

export const apiCall = async (url: string) => {
  try {
    const {data} = await axios.get<{ value: string }>(url)
    return data
  } catch (e) {
    console.log(e)
  }
}
