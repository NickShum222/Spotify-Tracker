import axios from 'axios';
import querystring from 'querystring';

export default async function handler(req, res) {
  const code = req.query?.code || null;

  const { data } = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
    },
  });
//https%3A%2F%2Fspotify-tracker-two.vercel.app%2Fapi%2Fcallback%0A
  if (data && data.access_token) {
    const queryParams = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
    };
    const queryString = querystring.stringify(queryParams);
    const url = "/?" + queryString;
    res.redirect(url);

  } else {
    res.status(data.status).json({ error: 'invalid_token' });
  }
}
