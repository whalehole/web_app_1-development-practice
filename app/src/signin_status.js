import axios from 'axios'

export const signedIn = async () => {
    const res = await axios.get(`http://localhost:8000/oauth/auth`, { withCredentials: true })
    return res
}