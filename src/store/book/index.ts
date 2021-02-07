import { writable } from 'svelte/store'
import type { BookItem } from '../../repositories/book'

const useBookStore = () => {
  const { subscribe, set, update } = writable<BookItem[]>([])
  const reset = () => set([])
  const add = (newBooks: BookItem[]) => update((books: BookItem[]) => {
    return [...books, ...newBooks]
  })
  return { 
    subscribe,
    reset,
    add
  }
}

export const books = useBookStore()