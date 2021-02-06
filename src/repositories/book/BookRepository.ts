import type { BookItem, BookRepositoryInterface, Params, Result } from './types'
import { httpClient } from '../httpClient'

export class BookRepository implements BookRepositoryInterface {
  async get(params: Params) {
    const { data } = await httpClient.get<Result>('/', { params })
    return data
  }

  async find(id: string) {
    const { data } = await httpClient.get<BookItem>(`/${id}`)
    return data
  }
}