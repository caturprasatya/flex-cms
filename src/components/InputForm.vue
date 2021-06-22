<template>
  <div class="relative min-h-screen flex justify-center py-3 px-4 sm:px-6 lg:px-8 items-center">
    <div class="absolute opacity-60 inset-0 z-0"/>
    <div v-if="$route.name === 'Edit File' && !$store.isEditPage">
      <blockquote>
        <p class="text-lg font-semibold">
          “Tailwind CSS is the only framework that I've seen scale
          on large teams. It’s easy to customize, adapts to any design,
          and the build size is tiny.”
        </p>
     </blockquote>
    </div>
    <div v-else class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
    <div class="text-center">
      <h2 class="mt-5 text-3xl font-bold text-gray-900">
        File Upload!
      </h2>
      <p class="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
    </div>
      <form class="mt-8 space-y-3" action="#" method="POST">
        <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                <input class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="mail@gmail.com">
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Description</label>
              <textarea class="text-base p-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="mail@gmail.com" />
        </div>
        <div class="grid grid-cols-1 space-y-2">
          <label class="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
          <div class="flex items-center justify-center w-full">
              <div v-if="type === 'editPage'" class="absolute top-0 right-0 -mt-3 mr-3">
                  <div class="rounded-full bg-indigo-500 text-white text-xs py-1 pl-2 pr-3 leading-none"><i class="mdi mdi-fire text-base align-middle"></i> <span class="align-middle">Delete</span></div>
              </div>
              <label class="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                  <div class="h-full w-full text-center flex flex-col justify-center items-center  ">
                      <div class="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                      <img class="has-mask h-36 object-center"
                      :src="file.image_url" alt="freepik image">
                      </div>
                      <p class="pointer-none text-gray-500 "><span class="text-sm">Drag and drop</span> files here <br /> or <a @click="onPickFile" id="" class="text-blue-600 hover:underline">select a file</a> from your computer</p>
                  </div>
                  <input type="file"
                   @change="previewImage"
                   class="hidden"
                   ref="input" />
              </label>
          </div>
        </div>
          <p class="text-sm text-gray-300">
              <span>File type: types of videos and types of images {{}} </span>
          </p>
        <div>
          <button type="submit" class="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
            font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
            Upload
        </button>
        </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { storage } from '../configs/firebase'

export default {
  name: 'InputForm',
  data () {
    return {
      type: this.$route.params?.id ? 'editPage' : 'addPage',
      file: {
        title: this.$route.params?.id ? this.data.title : '',
        description: this.$route.params?.id ? this.data.description : '',
        image_url: this.$route.params?.id
          ? this.data.image_url
          : 'https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg'
      },
      file_data: null,
      progressBar: 0
    }
  },
  methods: {
    onUpload () {
      const uploadTask = storage.ref(`media/${this.file_data?.name}`).put(this.file_data)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
          this.progresBar = progress
        },
        error => {
          console.log(error)
        },
        () => {
          storage
            .ref('media')
            .child(this.file_data?.name)
            .getDownloadURL()
            .then(downloadUrl => {
              this.file.data_url = downloadUrl
            })
        }
      )
    },
    previewImage (event) {
      this.file_data = event.target.files[0]
      this.onUpload()
    },
    onPickFile () {
      this.$refs.input.click()
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
    }
  },
  computed: {
    ...mapState(['data'])
  }
}
</script>

<style>
  .has-mask {
    position: absolute;
    clip: rect(10px, 150px, 130px, 10px);
  }
</style>
