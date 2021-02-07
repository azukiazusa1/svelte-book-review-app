<script lang="ts">
  import SearchBar from '../components/SearchBar.svelte'
  import Spinner from '../components/Spinner.svelte'
  import BookCard from '../components/BookCard.svelte'
  import type { BookItem } from '../repositories/book';
  import RepositoryFactory, { BOOK } from '../repositories/RepositoryFactory'
  const BookRepository = RepositoryFactory[BOOK]

  let q = ''
  let empty = false
  let books: BookItem[] = []
  let promise: Promise<void>

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getBooks()
  }

  const getBooks = async () => {
    books = []
    empty = false
    const result = await BookRepository.get({ q })
    empty = result.totalItems === 0
    books = result.items
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SearchBar bind:value={q} />
</form>

<div class="text-center mt-4">
  {#if empty}
    <div>検索結果が見つかりませんでした。</div>
  {:else}
  <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
    {#each books as book (book.id)}
      <BookCard {book} />
      {/each}
  </div>
  {/if}
  {#await promise}
    <div class="flex justify-center">
      <Spinner />
    </div>
    {:catch e}
      <span class="text-red-600 text-sm">
        {e.message}
      </span>
  {/await}
</div>