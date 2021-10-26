import axios from 'axios'

export const apiCall = async (url:string) => {
    try {
        const { data } = await axios(url)
        return data

    } catch (e) {
        console.log(e)
    }
}
