import { Pagination } from '@consta/uikit/Pagination'
import { Select } from '@consta/uikit/Select'
import { type PageSize, PAGE_SIZES } from '../../shared/config/constants'

interface PaginationWidgetProps {
  total: number
  page: number
  perPage: PageSize
  onPageChange: (page: number) => void
  onPerPageChange: (perPage: PageSize) => void
}

const pageSizeItems = PAGE_SIZES.map((size) => ({
  label: `${size} на странице`,
  value: size as PageSize,
}))

export const PaginationWidget = ({
  total,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
}: PaginationWidgetProps) => {
  const totalPages = Math.ceil(total / perPage)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={onPageChange}
        visibleCount={7}
      />

      <Select
        items={pageSizeItems}
        value={pageSizeItems.find((i) => i.value === perPage) ?? pageSizeItems[0]}
        getItemLabel={(item) => item.label}
        onChange={(item) => onPerPageChange(item?.value ?? 10)}
        style={{ width: 180 }}
        getItemValue={(item) => item.value}
      />
    </div>
  )
}
