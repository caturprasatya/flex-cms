<template>
  <div class="relative min-h-screen flex justify-center py-3 px-4 sm:px-3 lg:px-6 items-center">
    <!-- <OrbitSpinner
      v-if="this.$route.params?.id && file.url.length"
      :animation-duration="1200"
      :size="55"
      color="#ff1d5e"
    /> -->
    <div class="absolute opacity-60 inset-0 z-0"/>
      <div class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
        <div class="text-center">
          <h2 class="mt-5 text-3xl font-bold text-gray-900">
            File Upload!
          </h2>
          <p class="mt-2 text-sm text-gray-400">This field will upload on popular work</p>
        </div>
        <form class="mt-8 space-y-3">
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Name</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              v-model="file.title"
              placeholder="Name">
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Role</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              v-model="file.title"
              placeholder="Role">
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Phone Number</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="number"
              v-model="file.title"
              placeholder="Phone Number">
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Email</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              v-model="file.title"
              placeholder="Email">
          </div>
          <div>
            <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              @click.prevent="uploadData"
              >
              Upload
          </button>
          <!-- <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              @click.prevent="editData"
              >
              Edit Work
          </button> -->
          </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        name: '',
        role: '',
        phone_number: '',
        email: ''
      }
    }
  },
  methods: {
    onUpload () {
      if (this.type === 'editPage' && !this.video) {
        this.$store.dispatch('editContact', { ...this.file, id: this.$route.params?.id })
        return
      }
      this.$store.dispatch('addContact', this.file)
    },
    detailData () {
      // ...mapState([])
      this.file = this.$store.state.detailContact
    },
    uploadData () {
      this.onUpload()
    },
    editData () {
      this.onUpload()
    }
  },
  created () {
  },
  computed: {
  },
  components: {
    // OrbitSpinner
  },
  mounted () {
    this.detailData()
  }
}
</script>

<style>
  .has-mask {
    position: absolute;
    clip: rect(10px, 150px, 130px, 10px);
  }
  #fileInput {
    display: none;
  }
</style>
