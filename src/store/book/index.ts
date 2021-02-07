import { writable } from 'svelte/store'
import type { BookItem } from '../../repositories/book'

export const books = writable<BookItem[]>([])