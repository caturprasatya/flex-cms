<template>
  <!-- component -->
  <div
  v-if="toggleModal"
  class="fixed overflow-x-auto overflow-y-auto inset-0 flex justify-center items-center z-50 bg-gray-500">
    <!-- <div class="relative mx-auto w-auto max-w-2lx"> -->
      <div class="rounded overflow-hidden border w-full lg:w-6/12 md:w-6/12 bg-white mx-3 md:mx-0 lg:mx-0">
        <div class="w-full flex justify-between p-3">
          <div class="flex">
            <div class="rounded-full h-8 w-8 bg-gray-500 flex items-center justify-center overflow-hidden">
              <img src="https://avatars0.githubusercontent.com/u/38799309?v=4" alt="profilepic">
            </div>
            <span class="pt-1 ml-2 font-bold text-sm">F l e x</span>
          </div>
          <span class="px-2 hover:bg-gray-300 cursor-pointer rounded"><i class="fas fa-ellipsis-h pt-2 text-lg"></i></span>
        </div>
        <div class="flex justify-center">
          <iframe v-if="detailPopularWork.type === 'video'"
              width="100%"
              height="400"
              :src="detailPopularWork.video_url"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              seamless
              scrolling = "no"
            >
            </iframe>
          <img
            v-else
            width="100%"
            height="400"
            class="lg:w-3/4 md:w-1/3 sm:w-1/2 bg-cover"
            :src="detailPopularWork.url"
            >
        </div>
        <div class="px-3 pb-2">
          <span class="mr-2 font-extrabold font-mono text-xl pt-2"> {{detailPopularWork.title}} </span>
          <div class="pt-2">
            <i class="far fa-heart cursor-pointer"></i>
            <span class="text-sm text-gray-400 font-medium font-mono">Description</span>
          </div>
          <div class="pt-1">
            <div class="mb-2 text-sm font-mono font-extralight">
              {{ detailPopularWork.description }}
            </div>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-2 border-t border-solid h-10 border-blueGray-200 rounded-b">
            <button
            @click.prevent="hideModal"
            class="text-red-500 bg-transparent h-7 border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
              Close
            </button>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardModal',
  props: [
    'toggleModal'
  ],
  methods: {
    hideModal () {
      this.$emit('hideModal')
    }
  },
  computed: {
    ...mapState(['detailPopularWork'])
  }
}
</script>

<style>

</style>
