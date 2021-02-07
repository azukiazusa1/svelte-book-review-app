<script lang="ts">
  import Row from './Row.svelte'
  import type { BookItem } from "../repositories/book";
  export let book: BookItem

  const formatter = new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY'
  })
  $: price = book.saleInfo?.listPrice?.amount
    ? formatter.format(book.saleInfo.listPrice.amount)
    : ''
  
  $: src = book.volumeInfo.imageLinks 
    ? book.volumeInfo.imageLinks.thumbnail
    : 'http://placehold.jp/eeeeee/cccccc/160x120.png?text=No%20Image'

</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-3">

  <div class="cente">
    <img class="h-72 w-auto mx-auto" {src} alt="thumnail">
  </div>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg col-span-2">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-black font-bold text-xl mb-2">
        {book.volumeInfo.title}
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <Row dt="著者">
          {book.volumeInfo.authors?.join(',')}
        </Row>
        <Row dt="概要">
          {book.volumeInfo.description}
        </Row>
        <Row dt="価格">
          {price}
        </Row>
        <Row dt="ページ数">
          {book.volumeInfo.pageCount}
        </Row>  
        <Row dt="出版日">
          {book.volumeInfo.publishedDate}
        </Row>
        <Row dt="出版社">
          {book.volumeInfo.publisher}
        </Row>  
        <Row dt="プレビュー">
          {#if book.volumeInfo.previewLink}
            <a href={book.volumeInfo.previewLink} class="text-blue-400">
              {book.volumeInfo.previewLink}
            </a>
          {/if}
        </Row>
      </dl>
    </div>
  </div>
  
</div>