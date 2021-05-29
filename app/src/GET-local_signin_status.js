import axios from 'axios'

export const signedIn = async () => {
    // sends get request with cookies, and obtain response due to cookies
    const res = await axios.get(`https://5b1a1842abe9.ngrok.io/oauth/auth`, { withCredentials: true })
    return res.data
}