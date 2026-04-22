import { useEffect, useMemo, useState } from 'react'
import { getMovieById, searchMovies } from '../Services/GlobalApi'

function useOmdbSearch({ query, type = '', year = '', enabled = true }) {
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canLoadMore = useMemo(() => items.length > 0 && items.length < total, [items.length, total])

  const loadPage = async (targetPage, append) => {
    if (!enabled) return

    try {
      setLoading(true)
      setError('')
      const resp = await searchMovies({ query, page: targetPage, type, year })

      if (resp.data.Response === 'False') {
        setItems([])
        setTotal(0)
        setError(resp.data.Error || 'Nothing found')
        return
      }

      const list = resp.data.Search || []
      const enrichedList = await Promise.all(
        list.map(async movie => {
          try {
            const detailsResp = await getMovieById(movie.imdbID)
            const details = detailsResp.data || {}
            return {
              ...movie,
              imdbRating: details.imdbRating,
              Country: details.Country,
            }
          } catch {
            return movie
          }
        }),
      )

      setTotal(Number(resp.data.totalResults || 0))
      setItems(prev => (append ? [...prev, ...enrichedList] : enrichedList))
    } catch {
      setError('OMDb request failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    loadPage(1, false)
  }, [query, type, year, enabled])

  const showMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    loadPage(nextPage, true)
  }

  return { items, loading, error, canLoadMore, showMore, setItems }
}

export default useOmdbSearch
