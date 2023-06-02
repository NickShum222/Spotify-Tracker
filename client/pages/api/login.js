import querystring from 'querystring'
import { generateCodeVerifier } from '@/components/generateCode'

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const stateKey = 'spotify_auth_state'

export default function handler(req, res) {
  const state = generateCodeVerifier(16)
  res.setHeader('Set-Cookie', `${stateKey}=${state}`)

  const queryParams = `client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${state}&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-read-collaborative%20user-read-currently-playing%20user-read-recently-played%20user-top-read`
  const url = "https://accounts.spotify.com/authorize?" + queryParams;
  console.log(url)
  res.redirect(url);
}

