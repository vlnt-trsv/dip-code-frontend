import { useSearchParams } from 'react-router-dom'
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, PAGE_SIZES, type PageSize } from '../config/constants'

export const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parseInt(searchParams.get('page') ?? String(DEFAULT_PAGE), 10)
  const perPage = (parseInt(
    searchParams.get('per_page') ?? String(DEFAULT_PAGE_SIZE),
    10
  )) as PageSize

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(newPage))
      return prev
    })
  }

  const setPerPage = (newPerPage: PageSize) => {
    setSearchParams((prev) => {
      prev.set('per_page', String(newPerPage))
      prev.set('page', '1')
      return prev
    })
  }

  return { page, perPage, setPage, setPerPage, pageSizes: PAGE_SIZES }
}
