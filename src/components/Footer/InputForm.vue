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
        <router-link to="/footer" class="nav-link" aria-current="page">
          <div class="flex justify-end">
              <button class="absolute top-0 z-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-800">Close</button>
          </div>
        </router-link>
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
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Account</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="url"
              v-model="file.url"
              placeholder="Role">
          </div>
          <div
          class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Files</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-70 p-10 group text-center">
              <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                <ImageUplaoder
                  :preview="true"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  capture="environment"
                  :quality="0.7"
                  :debug="1"
                  :maxWidth="60"
                  :maxHeight="60"
                  doNotResize="gif"
                  :autoRotate="true"
                  outputFormat="verbose"
                  @input="setImage"
                  accept="image/*"
                >
                  <label
                  ref="input"
                  class="flex flex-col justify-center items-center max-h-48 w-full mx-auto mt-10"
                  for="fileInput"
                  slot="upload-label"
                  >
                    <figure>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                    >
                      <path
                        class="path1"
                        d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM120 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                      ></path>
                    </svg>
                  </figure>
                  <span class="upload-caption">{{
                    hasImage ? "Replace" : "Click to upload"
                  }}</span>
                  </label>
                </ImageUplaoder>
              </div>
            </label>
          </div>
        </div>
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
import ImageUplaoder from 'vue-image-upload-resize'

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        name: '',
        url: '',
        imageData: ''
      },
      hasImage: false,
      image: null,
      sampleImage: null
    }
  },
  methods: {
    setImage: function (output) {
      this.hasImage = true
      this.image = output
      this.sampleImage = output.dataUrl
    },
    onUpload () {
      const isMailTo = this.file.url.search(':')
      const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (this.image) {
        this.file.imageData = this.sampleImage
      }
      if (this.file.url.match(mailformat) && !isMailTo) {
        this.file.url = 'mailto:' + this.file.url
      }
      if (this.type === 'editPage') {
        this.$store.dispatch('editFooter', { ...this.file, id: this.$route.params?.id })
        this.detailData()
        return
      }
      this.$store.dispatch('addFooter', this.file)
      this.detailData()
    },
    detailData () {
      if (this.type === 'editPage') {
        this.file = this.$store.state.detailFooter
      } else {
        this.file = {
          name: '',
          url: ''
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
  },
  components: {
    ImageUplaoder
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
