<script lang="ts">
  import SearchBar from '../components/SearchBar.svelte'
  import Spinner from '../components/Spinner.svelte'
  import BookCard from '../components/BookCard.svelte'
  import RepositoryFactory, { BOOK } from '../repositories/RepositoryFactory'
  import InfiniteScroll from "svelte-infinite-scroll"
  import { books } from '../store/book'
  const BookRepository = RepositoryFactory[BOOK]

  let q = ''
  let empty = false
  let promise: Promise<void>
  let totalItems = 0
  let startIndex = 0

  $: hasMore = totalItems > $books.length

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getbooks()
  }

  const getbooks = async () => {
    books.reset()
    empty = false
    startIndex = 0
    const result = await BookRepository.get({ q, startIndex })
    empty = result.totalItems === 0
    totalItems = result.totalItems
    books.add(result.items)
  }

  const handleLoadMore = () => {
    startIndex += 10
    promise = getNextPage()
  }

  const getNextPage = async () => {
    const result = await BookRepository.get({ q, startIndex })

    // 取得データが既に存在するものを含む可能性があるので、フィルタリングしてます。
    const bookIds = $books.map(book => book.id)
    const filteredItems = result.items.filter(item => {
      return !bookIds.includes(item.id)
    })
    books.add(filteredItems)
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
    {#each $books as book (book.id)}
      <BookCard {book} />
    {/each}
  </div>
  <InfiniteScroll window threshold={100} on:loadMore={handleLoadMore} {hasMore} />
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