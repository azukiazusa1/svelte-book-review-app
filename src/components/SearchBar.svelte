<script lang="ts">
  export let value = ''
</script>

<div class="shadow flex">
  <input bind:value class="w-full rounded p-2" type="text" placeholder="Search...">
  <button class="bg-white w-auto flex justify-end items-center text-blue-500 p-2 hover:text-blue-400">
    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
    </svg>
  </button>
</div>