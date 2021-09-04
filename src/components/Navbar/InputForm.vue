<template>
  <div class="relative flex justify-center py-3 px-4 sm:px-3 lg:px-6">
    <!-- <OrbitSpinner
      v-if="this.$route.params?.id && file.url.length"
      :animation-duration="1200"
      :size="55"
      color="#ff1d5e"
    /> -->
    <div class="absolute opacity-60 inset-0 z-0"></div>
      <div class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
        <router-link to="/service" class="nav-link" aria-current="page">
          <div class="flex justify-end">
            <button class="absolute top-0 z-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-800">Close</button>
          </div>
        </router-link>
      <div class="flex justify-end lg:hidden">
        <button class="absolute top-0 z-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-800">Close</button>
      </div>
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
              v-model="file.name"
              placeholder="Name">
          </div>
          <!-- This is an example component -->
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Type Data</label>
            <div class="flex justify-evenly border-gray-300 bg-gray-200 rounded-full overflow-hidden select-none">
              <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" v-model="file.isActive" value="true" type="radio" name="type" />
                <div class="title px-2">Active</div>
              </label>
              <label class="flex radio p-2 cursor-pointer">
                <input class="my-auto transform scale-125" v-model="file.isActive" value="false" type="radio" name="type" />
                <div class="title px-2">InActive</div>
              </label>
            </div>
          </div>
          <textarea type="text" id="name" v-on:keyup="keyMonitor" v-model="file.textHtml"
            class="w-full p-3 font-thin transition duration-200 focus:bg-gray-50 h-60 hover:bg-gray-50 focus:shadow-md focus:outline-none ring-offset-2 rounded-lg focus:ring-2 focus:ring-purple-300"/>
          <label class="text-sm font-semibold text-gray-500">Create dinamic Story.</label>
          <!-- <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Category</label>
              <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232">
                <path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"></path>
              </svg>
            <select v-model="file.CategoryId" class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-grey-200 hover:border-gray-400 focus:outline-none appearance-none">
              <option v-for="(category, i) in categories" :key="i" :value="category.id" :selected="file.CategoryId === category.id"> {{ category.name }} </option>
            </select>
          </div> -->
          <div>
            <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
              font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              @click.prevent="uploadData"
              >
              Upload
          </button>
          </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        name: '',
        isActive: null,
        textHtml: ''
      }
    }
  },
  methods: {
    onUpload () {
      if (this.type === 'editPage') {
        this.$store.dispatch('editNavbar', { ...this.file, id: this.$route.params?.id })
        return
      }
      this.$store.dispatch('addNavbar', this.file)
    },
    detailData () {
      if (this.type === 'editPage') {
        this.file = this.$store.state.detailNavbar
        this.file.isActive = `${this.$store.state.detailNavbar.isActive}`
        this.file.textHtml = this.$store.state.detailNavbar.textHtml
      } else {
        this.file = {
          name: '',
          isActive: null
        }
      }
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
    ...mapState(['categories'])
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
