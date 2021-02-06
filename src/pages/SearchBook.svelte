<script lang="ts">
  import SearchBar from '../components/SearchBar.svelte'

  let q = 'JavaScript'
</script>

<form>
  <SearchBar bind:value={q} />
</form>

<div class="text-center mt-4">
  { q }
</div>