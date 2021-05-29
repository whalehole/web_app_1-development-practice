import axios from 'axios'

export const countries = async () => {
    const res = await axios.get(`https://gugu.to/resrc/countries`, { withCredentials: true })
    return res.data
}