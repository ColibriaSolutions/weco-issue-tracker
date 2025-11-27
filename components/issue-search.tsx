'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IssueSearchProps {
  projectId: string
}

export function IssueSearch({ projectId }: IssueSearchProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // Get search value from URL (only read, don't use as dependency)
  const urlSearchValue = searchParams.get('search') || ''
  
  const [searchValue, setSearchValue] = useState(urlSearchValue)
  const [isSearching, setIsSearching] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isMountedRef = useRef(false)
  const lastPushedValueRef = useRef<string>(urlSearchValue)

  // Initialize and sync with URL changes (but only when URL changes externally, not from our own updates)
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      lastPushedValueRef.current = urlSearchValue
      return
    }

    // Only sync if URL changed externally (not from our own push)
    if (urlSearchValue !== lastPushedValueRef.current && urlSearchValue !== searchValue) {
      setSearchValue(urlSearchValue)
      lastPushedValueRef.current = urlSearchValue
    }
  }, [urlSearchValue, searchValue])

  // Debounce search input and update URL
  useEffect(() => {
    if (!isMountedRef.current) {
      return
    }

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    const trimmedValue = searchValue.trim()

    // Don't update if value matches URL
    if (trimmedValue === urlSearchValue) {
      return
    }

    debounceTimerRef.current = setTimeout(() => {
      // Only search if 2+ characters or empty (to clear)
      if (trimmedValue.length >= 2 || trimmedValue.length === 0) {
        setIsSearching(true)

        // Build new URL - only include search param (don't preserve others to avoid re-render issues)
        const params = new URLSearchParams()
        if (trimmedValue.length >= 2) {
          params.set('search', trimmedValue)
        }

        const newUrl = `${pathname}?${params.toString()}`
        lastPushedValueRef.current = trimmedValue
        router.push(newUrl, { scroll: false })

        setTimeout(() => setIsSearching(false), 100)
      }
    }, 300) // 300ms debounce

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, router, pathname])

  const handleClear = useCallback(() => {
    setSearchValue('')
    // Clear search - just go to pathname without search param
    router.push(pathname, { scroll: false })
  }, [router, pathname])

  const hasSearch = urlSearchValue && urlSearchValue.trim().length >= 2

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search issues by title or reporter name..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={cn(
            "pl-9 pr-9",
            hasSearch && "pr-20"
          )}
        />
        {hasSearch && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {hasSearch && isSearching && (
        <p className="text-sm text-muted-foreground">
          Searching...
        </p>
      )}
    </div>
  )
}
