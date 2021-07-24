<template>
    <div class="relative flex justify-center py-3">
    <!-- <div class="absolute opacity-60 inset-0 z-0 p-0"/> -->
      <div class="sm:max-w-lg w-full p-3 bg-gray-300 shadow rounded-xl z-10">
      <label for="other" class="text-sm font-bold text-gray-500 tracking-wide">
        <span>Category</span>
        <textarea type="text" id="name" v-on:keyup="keyMonitor" v-model="category" class="w-full p-3 font-thin transition duration-200 focus:bg-gray-50 hover:bg-gray-50 focus:shadow-md focus:outline-none ring-offset-2 rounded-lg focus:ring-2 focus:ring-purple-300" />
        <label class="text-sm font-semibold text-gray-500">Create dinamic category.</label>
      </label>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: ''
    }
  },
  methods: {
    inputCategory () {
      this.$store.dispatch('addCategory', this.category)
    },
    keyMonitor (event) {
      if (event.key === 'enter') {
        this.inputCategory()
      }
    }
  }
}
</script>

<style>
</style>
