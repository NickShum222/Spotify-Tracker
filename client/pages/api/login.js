import querystring from 'querystring'
import { generateCodeVerifier } from '@/components/generateCode'

const CLIENT_ID = process.env.CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI
const stateKey = 'spotify_auth_state'

export default function handler(req, res) {
  const state = generateCodeVerifier(16)
  res.setHeader('Set-Cookie', `${stateKey}=${state}`)

  const queryParams = querystring.stringify({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    state: state,
    scope: 'user-read-private user-read-email playlist-read-private playlist-read-collaborative user-read-currently-playing user-read-recently-played user-top-read',
  })

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
}
