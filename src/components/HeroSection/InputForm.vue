<template>
  <div class="relative min-h-screen flex justify-center py-3 px-4 sm:px-3 lg:px-6 items-center">
    <!-- <OrbitSpinner
      v-if="this.$route.params?.id && file.url.length"
      :animation-duration="1200"
      :size="55"
      color="#ff1d5e"
    /> -->
    <div class="absolute opacity-60 inset-0 z-0"></div>
      <ProgressBar v-if="isUpload" :progress="progress"/>
      <div v-if="!isUpload" class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
        <router-link to="/banner" class="nav-link" aria-current="page">
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
            <label class="text-sm font-bold text-gray-500 tracking-wide">Title</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              v-model="file.title"
              placeholder="Title">
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Description</label>
              <textarea
              v-model="file.desc"
              class="text-base p-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Write Desc..." />
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Files</label>
            <div class="flex items-center justify-center w-full">
              <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-70 p-10 group text-center">
                <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                  <div class="flex flex-col w-full max-h-96 items-center justify-evenly bg-grey-lighter">
                    <video v-if="video" ref="video" :src="videoUrl" width="300" height="300" controls class="video"></video>
                    <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                      <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"></path>
                      </svg>
                      <span class="mt-2 text-base leading-normal">Select a file</span>
                      <input type='file' @change="previewFilesVideo" class="hidden" accept="video/*" />
                    </label>
                </div>
                </div>
              </label>
            </div>
          </div>
           <div
          class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">{{ file.type !== 'video' ? 'Attach Files' : 'Select Image For Cover'}}</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-70 p-10 group text-center">
              <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                <ImageUplaoder
                  :preview="true"
                  :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                  capture="environment"
                  :quality="0.7"
                  :debug="1"
                  :maxWidth="1280"
                  :maxHeight="720"
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
                        d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
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
import { storage } from '../../configs/firebase'
import ProgressBar from './ui/ProgressBar.vue'
import ImageUplaoder from 'vue-image-upload-resize'

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        title: '',
        desc: '',
        video_url: '',
        imageData: 'https://images.unsplash.com/photo-1610008130029-5feca0b79a7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
      },
      progress: 0,
      video: null,
      videoUrl: null,
      isUpload: false,
      hasImage: false,
      image: null
    }
  },
  methods: {
    previewFilesVideo (event) {
      this.video = event.target.files[0]
      this.videoUrl = URL.createObjectURL(event.target.files[0])
    },
    setImage: function (output) {
      this.hasImage = true
      this.image = output
    },
    onUpload () {
      if (this.image) {
        this.file.imageData = this.image.dataUrl
      }
      if (this.type === 'editPage' && !this.video) {
        this.$store.dispatch('editHeroSection', { ...this.file, id: this.$route.params?.id })
        return
      }
      const uploadTask = storage.ref(`banner/${this.video.name}`).put(this.video)
      uploadTask.on(
        'state_changed',
        snapshot => {
          this.isUpload = true
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          this.$store.commit('setProgressBar', progress)
          if (this.progress === 100) {
            this.isUpload = false
          }
        },
        error => {
          console.error(error)
        },
        () => {
          storage
            .ref('popularWork')
            .child(this.video.name)
            .getDownloadURL()
            .then(downloadUrl => {
              this.file.video_url = downloadUrl
              if (this.$route.params?.id) {
                this.$store.dispatch('editHeroSection', { ...this.file, id: this.$route.params?.id })
                return
              }
              this.$store.dispatch('addHeroSection', this.file)
            })
        }
      )
    },
    detailData () {
      if (this.type === 'editPage') {
        this.file = this.$store.state.detailHeroSection
        this.video = true
        this.videoUrl = this.$store.state.detailHeroSection.video_url
      } else {
        this.clearData()
      }
    },
    deleteFileUpload () {
      if (this.file_data) {
        // Create a reference to the file to delete
        const desertRef = storage.ref(`media/${this.file_data?.name}`)
        // Delete the file
        desertRef.delete().then(function () {
          // File deleted successfully
        }).catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error)
        })
      } else {
        console.log('not handle')
      }
    },
    uploadData () {
      this.onUpload()
    },
    editData () {
      this.onUpload()
    },
    clearData () {
      this.file = {
        title: '',
        desc: '',
        video_url: '',
        imageData: 'https://images.unsplash.com/photo-1610008130029-5feca0b79a7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80'
      }
      this.progress = 0
      this.video = null
      this.videoUrl = null
    }
  },
  created () {
  },
  computed: {
  },
  components: {
    ProgressBar,
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
  @import url("https://fonts.googleapis.com/css2?family=Lemonada&display=swap");
</style>
