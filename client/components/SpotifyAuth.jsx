import { useEffect, useState } from "react";
import axios from "axios";
import LRU from "lru-cache";

const LOCALSTORAGE_KEYS = {
  accessToken: "spotify_access_token",
  refreshToken: "spotify_refresh_token",
  expireTime: "spotify_token_expire_time",
  timestamp: "spotify_token_timestamp",
};

export const getAccessToken = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const LOCALSTORAGE_VALUES = {
      accessToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.accessToken),
      refreshToken: window.localStorage.getItem(LOCALSTORAGE_KEYS.refreshToken),
      expireTime: window.localStorage.getItem(LOCALSTORAGE_KEYS.expireTime),
      timestamp: window.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
    };

    const hasTokenExpired = () => {
      const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;
      if (!accessToken || !timestamp) {
        return false;
      }
      const millisecondsElapsed = Date.now() - Number(timestamp);
      return millisecondsElapsed / 1000 > Number(expireTime);
    };

    const refreshToken = async () => {
      try {
        if (
          !LOCALSTORAGE_VALUES.refreshToken ||
          LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
          Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
        ) {
          console.error("Refresh token is invalid");
          logout();
        }
        const refreshTokenLink =
          "/api/refresh_token?refresh_token=" +
          LOCALSTORAGE_VALUES.refreshToken;
        console.log(refreshTokenLink);
        const { data } = await axios.get(refreshTokenLink);

        window.localStorage.setItem(
          LOCALSTORAGE_KEYS.accessToken,
          data.access_token
        );
        window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
        window.location.reload();
      } catch (e) {
        console.error(e);
        logout();
      }
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const queryParams = {
      [LOCALSTORAGE_KEYS.accessToken]: urlParams.get("access_token"),
      [LOCALSTORAGE_KEYS.refreshToken]: urlParams.get("refresh_token"),
      [LOCALSTORAGE_KEYS.expireTime]: urlParams.get("expires_in"),
    };
    const hasError = urlParams.get("error");
    if (
      hasError ||
      hasTokenExpired() ||
      LOCALSTORAGE_VALUES.accessToken === "undefined"
    ) {
      refreshToken();
    }
    if (
      LOCALSTORAGE_VALUES.accessToken &&
      LOCALSTORAGE_VALUES.accessToken !== "undefined"
    ) {
      setToken(LOCALSTORAGE_VALUES.accessToken);
    }
    if (queryParams[LOCALSTORAGE_KEYS.accessToken]) {
      for (const property in queryParams) {
        window.localStorage.setItem(property, queryParams[property]);
      }
      window.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now());
      setToken(queryParams[LOCALSTORAGE_KEYS.accessToken]);
    }
  }, [token, LOCALSTORAGE_KEYS.timestamp]);
  return token;
};

export const logout = () => {
  for (const property in LOCALSTORAGE_KEYS) {
    window.localStorage.removeItem(LOCALSTORAGE_KEYS[property]);
  }
  window.location = window.location.origin;
};

axios.defaults.headers["Content-Type"] = "application/json";

const userProfileCache = new LRU({ maxAge: 1000 * 60 * 10, max: 100 });
const userPlaylistCache = new LRU({ maxAge: 1000 * 60 * 10, max: 100 });
const recentlyPlayedCache = new LRU({ maxAge: 1000 * 60 * 10, max: 100 });
const currentlyPlayingCache = new LRU({ maxAge: 1000 * 60 * 10, max: 100 });

export const getUserProfile = async (accessToken) => {
  const cachedResponse = userProfileCache.get(accessToken);
  if (cachedResponse) {
    return cachedResponse;
  }
  const token_type = "Bearer";
  const response = await axios.get("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `${token_type} ${accessToken}`,
    },
  });
  userProfileCache.set(accessToken, response);
  return response;
};

export const getUserPlaylist = async (accessToken) => {
  const cachedResponse = userPlaylistCache.get(accessToken);
  if (cachedResponse) {
    return cachedResponse;
  }
  const token_type = "Bearer";
  const response = await axios.get(
    "https://api.spotify.com/v1/me/playlists?limit=50",
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  userPlaylistCache.set(accessToken, response);
  return response;
};

export const getRecentlyPlayed = async (accessToken) => {
  const cachedResponse = recentlyPlayedCache.get(accessToken);
  if (cachedResponse) {
    return cachedResponse;
  }
  const token_type = "Bearer";
  const response = await axios.get(
    "https://api.spotify.com/v1/me/player/recently-played?limit=30",
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  recentlyPlayedCache.set(accessToken, response);
  return response;
};

export const getCurrentlyPlaying = async (accessToken) => {
  const cachedResponse = currentlyPlayingCache.get(accessToken);
  if (cachedResponse) {
    return cachedResponse;
  }
  const token_type = "Bearer";
  const response = await axios.get(
    `https://api.spotify.com/v1/me/player/currently-playing`,
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  currentlyPlayingCache.set(accessToken, response);
  return response;
};
export const getTopArtists = async (accessToken, range) => {
  const token_type = "Bearer";
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${range}`,
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  return response;
};

export const getTopTracks = async (accessToken, range) => {
  const token_type = "Bearer";
  const response = await axios.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=50`,
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  return response;
};

export const getPlaylistItems = async (accessToken, playlistId) => {
  const token_type = "Bearer";
  const response = await axios.get(
    `
    https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `${token_type} ${accessToken}`,
      },
    }
  );
  return response;
};
