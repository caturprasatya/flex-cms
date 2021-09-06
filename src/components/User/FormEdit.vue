<template>
  <div class="relative flex justify-center py-3 px-4 sm:px-3 lg:px-6">
    <!-- <OrbitSpinner
      v-if="this.$route.params?.id && file.url.length"
      :animation-duration="1200"
      :size="55"
      color="#ff1d5e"
    /> -->
    <div class="absolute opacity-60 inset-0 z-0"></div>
      <PacmanLoader v-if="$store.state.isLoading" />
      <div v-else class="sm:max-w-lg w-full p-10 bg-gray-300 shadow rounded-xl z-10">
        <router-link to="/" class="nav-link" aria-current="page">
          <div class="flex justify-end">
              <button class="absolute top-0 z-12 bg-blue-500 text-white p-2 rounded hover:bg-blue-800">Close</button>
          </div>
        </router-link>
        <div class="text-center">
          <h2 class="mt-5 text-3xl font-bold text-gray-900">
            Form Update Account!
          </h2>
          <p class="mt-2 text-sm text-gray-400">This form will update admin access</p>
        </div>
        <form class="mt-8 space-y-3">
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Email</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="email"
              v-model="file.email"
              placeholder="Email">
          </div>
          <div class="grid grid-cols-1 space-y-2">
            <label class="text-sm font-bold text-gray-500 tracking-wide">Password</label>
              <input
              class="text-base p-2 border bg-gray-200 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
              type="text"
              v-model="file.password"
              placeholder="Name">
              <!-- <input id="password-input" type="password" name="password" required="required">
                <span>Password</span> -->
                <!-- <a href="#" class="password-control" @click="return show_hide_password(this);"></a>
                <img src="https://www.flaticon.com/svg/static/icons/svg/1828/1828471.svg" alt="lock">
                </div>
                <div> -->
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
import PacmanLoader from 'vue-spinner/src/PacmanLoader.vue'

export default {
  name: 'InputForm',
  data () {
    return {
      file: {
        password: '',
        email: ''
      }
    }
  },
  methods: {
    onUpload () {
      this.$store.dispatch('userUpdate', this.file)
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
    PacmanLoader
  },
  mounted () {
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
