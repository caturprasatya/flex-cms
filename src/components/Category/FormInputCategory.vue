<template>
  <div class="container">
    <label for="other" class="block w-full space-y-1 text-gray-700 text-md font-semibold px-4 py-3 rounded-xl border border-gray-700 transition bg-gray-200  hover:border-purple-800 mt-6">
      <span>Category</span>
      <input type="text" id="name" v-on:keyup="keyMonitor" v-model="category" class="w-full p-3 font-thin transition duration-200 focus:bg-gray-50 hover:bg-gray-50 focus:shadow-md focus:outline-none ring-offset-2 rounded-lg focus:ring-2 focus:ring-purple-300">
      <label class="text-sm font-semibold text-gray-500">Create dinamic category.</label>
      <div>
        <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
          font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
          @click.prevent="uploadData"
          >
          Upload
        </button>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data () {
    return {
      category: '',
      type: this.$route.params?.id ? 'editPage' : 'addPage'
    }
  },
  methods: {
    keyMonitor (event) {
      if (event.key === 'enter') {
        this.uploadData()
      }
    },
    uploadData () {
      if (this.type === 'editPage' && !this.video) {
        this.$store.dispatch('editCategory', { ...this.file, id: this.$route.params?.id })
        return
      }
      this.$store.dispatch('addCategory', this.category)
    }
  }
}
</script>

<style>
</style>
