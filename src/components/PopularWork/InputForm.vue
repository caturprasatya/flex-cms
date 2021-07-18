<template>
  <div class="relative min-h-screen flex justify-center py-3 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute opacity-60 inset-0 z-0"/>
    <!-- <div v-if="$route.name === 'Edit File' && !$store.isEditPage">
    </div> -->
    <div class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
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
            v-model="file.description"
            class="text-base p-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            placeholder="Write Desc..." />
        </div>

        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Category</label>
          <svg class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
          <select ty v-model="file.CategoryId" class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-grey-200 hover:border-gray-400 focus:outline-none appearance-none">
            <option v-for="(category, i) in categories" :key="i" :value="category.id" :selected="file.CategoryId === category.id"> {{ category.name }} </option>
          </select>
        </div>
        <!-- This is an example component -->
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Type Data</label>
          <div class="flex justify-evenly border-gray-300 bg-gray-200 rounded-full overflow-hidden select-none">
            <label class="flex radio p-2 cursor-pointer">
              <input class="my-auto transform scale-125" v-model="file.type" value="photo" type="radio" name="type" />
              <div class="title px-2">Photo</div>
            </label>
            <label class="flex radio p-2 cursor-pointer">
              <input class="my-auto transform scale-125" v-model="file.type" value="video" type="radio" name="type" />
              <div class="title px-2">Video</div>
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
                  :debug="1"
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
        <div
        v-if="file.type === 'video'"
        class="grid grid-cols-1 space-y-2 mt-3">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Files</label>
          <div class="flex items-center justify-center w-full">
            <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-70 p-10 group text-center">
              <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                <div class="flex flex-col justify-evenly w-full max-h-96 items-center bg-grey-lighter">
                  <video v-if="video" ref="video" :src="videoUrl" controls class="video" />
                  <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span class="mt-2 text-base leading-normal">Select a file</span>
                    <input type='file' @change="previewFilesVideo" class="hidden" accept="video/*" />
                  </label>
                </div>
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
import { mapState } from 'vuex'
import { storage } from '../../configs/firebase'
import ImageUplaoder from 'vue-image-upload-resize'

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        title: this.$route.params?.id ? this.data.title : '',
        description: this.$route.params?.id ? this.data.description : '',
        url: '',
        type: '',
        CategoryId: 0
      },
      progressBarImage: 0,
      progressBarVideo: 0,
      hasImage: false,
      image: null,
      video: null,
      videoUrl: null,
      video_url: '',
      isLoadVideo: false
    }
  },
  methods: {
    setImage: function (output) {
      this.hasImage = true
      this.image = output
    },
    previewFilesVideo (event) {
      this.video = event.target.files[0]
      this.videoUrl = URL.createObjectURL(event.target.files[0])
      console.log(event.target.files, '========', this.video)
    },
    onUploadImage () {
      console.log(this.image.dataUrl.split(',')[1])
      const uploadTask = storage.ref(`popularWork/${this.image.info?.name}`).putString(this.image.dataUrl.split(',')[1], 'base64', { contentType: 'image/png' })
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.progressBarImage = progress
        },
        error => {
          console.error(error)
        },
        () => {
          storage
            .ref('popularWork')
            .child(this.image.info?.name)
            .getDownloadURL()
            .then(downloadUrl => {
              this.file.url = downloadUrl
              console.log(downloadUrl)
              if (this.file.type === 'photo') {
                this.$store.dispatch('addPopularWork', { ...this.file })
              }
            })
        }
      )
    },
    onUploadVideo () {
      const uploadTask = storage.ref(`popularWork/${this.video.name}`).put(this.video)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          this.progressBarVideo = progress
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
              this.video_url = downloadUrl
              console.log(downloadUrl)
              this.$store.dispatch('addPopularWork', { ...this.file, video_url: this.video_url })
            })
        }
      )
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
    async uploadData () {
      if (this.file.type === 'photo') {
        this.onUploadImage()
      } else {
        this.onUploadImage(); this.onUploadVideo()
      }
    }
    // onChange () {
    //   this.file.CategoryId
    // }
  },
  computed: {
    ...mapState(['categories'])
  },
  components: {
    ImageUplaoder
  },
  created () {
    if (this.type === 'editPage') {
    }
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
