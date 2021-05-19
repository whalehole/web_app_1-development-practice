import axios from 'axios'

export const signedIn = async () => {
    // sends get request with cookies, and obtain response due to cookies
    const res = await axios.get(`http://localhost:8000/oauth/auth`, { withCredentials: true })
    return res.data
}