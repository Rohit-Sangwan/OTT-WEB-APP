'use client'

import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisiblePages = 5
  const halfVisible = Math.floor(maxVisiblePages / 2)

  let visiblePages = pages
  if (totalPages > maxVisiblePages) {
    const start = Math.max(1, currentPage - halfVisible)
    const end = Math.min(totalPages, start + maxVisiblePages - 1)
    visiblePages = pages.slice(start - 1, end)
  }

  return (
    <div className="flex justify-center space-x-2">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-4 py-2 bg-netflix-dark text-white rounded-md hover:bg-netflix-red transition-colors"
        >
          Previous
        </Link>
      )}

      {/* First page */}
      {currentPage > halfVisible + 1 && (
        <>
          <Link
            href={`${baseUrl}?page=1`}
            className="px-4 py-2 bg-netflix-dark text-white rounded-md hover:bg-netflix-red transition-colors"
          >
            1
          </Link>
          {currentPage > halfVisible + 2 && (
            <span className="px-4 py-2 text-white">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {visiblePages.map((page) => (
        <Link
          key={page}
          href={`${baseUrl}?page=${page}`}
          className={`px-4 py-2 rounded-md transition-colors ${
            page === currentPage
              ? 'bg-netflix-red text-white'
              : 'bg-netflix-dark text-white hover:bg-netflix-red'
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Last page */}
      {currentPage < totalPages - halfVisible && (
        <>
          {currentPage < totalPages - halfVisible - 1 && (
            <span className="px-4 py-2 text-white">...</span>
          )}
          <Link
            href={`${baseUrl}?page=${totalPages}`}
            className="px-4 py-2 bg-netflix-dark text-white rounded-md hover:bg-netflix-red transition-colors"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next button */}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-4 py-2 bg-netflix-dark text-white rounded-md hover:bg-netflix-red transition-colors"
        >
          Next
        </Link>
      )}
    </div>
  )
} 