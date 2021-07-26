<template>
    <div class="relative flex justify-center py-3">
    <!-- <div class="absolute opacity-60 inset-0 z-0 p-0"/> -->
      <div class="sm:max-w-lg w-full p-3 bg-gray-300 shadow rounded-xl z-10">
      <label for="other" class="text-sm font-bold text-gray-500 tracking-wide">
        <span>Story</span>
        <textarea type="text" id="name" v-on:keyup="keyMonitor" v-model="text"
          class="w-full p-3 font-thin transition duration-200 focus:bg-gray-50 h-60 hover:bg-gray-50 focus:shadow-md focus:outline-none ring-offset-2 rounded-lg focus:ring-2 focus:ring-purple-300" />
        <label class="text-sm font-semibold text-gray-500">Create dinamic Story.</label>
        <div class="flex justify-center">
          <button type="submit" class="my-2 w-1/2 flex justify-center bg-blue-500 text-gray-100 p-2 rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              @click.prevent="uploadData"
              >
              Upload
            </button>
        </div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      type: this.$route.params?.id ? 'editPage' : 'addPage'
    }
  },
  methods: {
    inputStory () {
      this.$store.dispatch('addStory', this.Story)
    },
    keyMonitor (event) {
      if (event.key === 'enter') {
        this.inputStory()
      }
    },
    uploadData () {
      if (this.type === 'editPage') {
        this.$store.dispatch('editStory', { teks: this.text, id: this.$route.params?.id })
        return
      }
      this.$store.dispatch('addStory', this.text)
    },
    editPage () {
      if (this.type === 'editPage') {
        this.text = this.$store.state.detailStory?.teks
      }
    }
  },
  mounted () {
    this.editPage()
  }
}
</script>

<style>
</style>
