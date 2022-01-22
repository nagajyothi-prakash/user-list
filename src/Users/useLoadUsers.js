import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useLoadUsers(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: 'GET',
      url: `https://reqres.in/api/users?page=${pageNumber}`,
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setUsers(prevUsers => {
        return [...prevUsers, ...res.data.data]
      })
      setHasMore(res.data.total_pages > pageNumber)
      setLoading(false)
    }).catch(e => {
      if (axios.isCancel(e)) return
      setError(true)
    })
    return () => cancel()
  }, [pageNumber])

  return { loading, error, users, hasMore }
}