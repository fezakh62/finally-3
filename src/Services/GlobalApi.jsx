import axios from 'axios'

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || '2ed0492b'
const OMDB_BASE_URL = 'https://www.omdbapi.com/'

export const searchMovies = ({ query, page = 1, type = '', year = '' }) => {
  const params = {
    apikey: OMDB_API_KEY,
    s: query,
    page,
  }

  if (type) params.type = type
  if (year) params.y = year

  return axios.get(OMDB_BASE_URL, { params })
}

export const getMovieById = imdbId =>
  axios.get(OMDB_BASE_URL, {
    params: {
      apikey: OMDB_API_KEY,
      i: imdbId,
      plot: 'short',
    },
  })

