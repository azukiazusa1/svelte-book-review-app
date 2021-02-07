import SearchBook from '../pages/SearchBook.svelte'
import DetailsBook from '../pages/DetailsBook.svelte'

export const routes = {
  '/': SearchBook,
  '/books/:id': DetailsBook,
}