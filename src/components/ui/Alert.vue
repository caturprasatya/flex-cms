<template>
  <div class="alert flex flex-row items-center bg-red-300 p-5 rounded border-b-3 border-red-300">
    <div class="alert-icon flex items-center bg-red-100 border-2 border-red-500 justify-center h-5 w-5 flex-shrink-0 rounded-full">
      <span class="text-red-500">
        <svg fill="currentColor"
          viewBox="0 0 20 20"
          class="h-6 w-6">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </span>
    </div>
    <div class="alert-content ml-4">
      <div class="alert-title font-semibold text-lg text-red-100">Error</div>
      <div class="alert-description text-sm text-red-100">
        This is an alert message, alert message goes here..!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert'
}
</script>

<style>

</style>
