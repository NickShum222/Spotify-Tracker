
import axios from 'axios'
import querystring from 'querystring'

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

export default function handler(req, res) {
  const code = req.query.code || null

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data

        const queryParams = querystring.stringify({
          access_token,
          refresh_token,
          expires_in,
        })

        
        res.redirect(`http://localhost:3000/?${queryParams}`)
      } else {
        res.status(response.status).json({ error: 'invalid_token' })
      }
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
}
``
