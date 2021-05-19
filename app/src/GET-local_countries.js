import axios from 'axios'

export const countries = async () => {
    const res = await axios.get(`http://localhost:8000/resrc/countries`, { withCredentials: true })
    return res.data
}