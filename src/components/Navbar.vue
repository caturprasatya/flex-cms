<template>
  <div class="sticky top-0 z-40">
    <div class="w-full h-20 px-6 bg-black border-b shadow-lg flex items-center justify-between">
      <!-- left navbar -->
      <div class="flex">
        <!-- mobile hamburger -->
        <div class="lg:hidden flex items-center mr-4">
          <button class="hover:text-blue-500 hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
            <svg class="h-5 w-5" v-bind:style="{ fill: 'white' }" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>
        <!-- search bar -->
        <div class="bg-gray-200 rounded flex items-center w-full max-w-xl mr-4 p-2 shadow-sm border border-gray-200">
          <button class="outline-none focus:outline-none">
            <svg class="w-5 text-gray-600 h-5 cursor-pointer" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <input :disabled="this.$route.name === 'Popular Work' ? false : true " v-model="$store.state.search" type="search" name="search" id="search" placeholder="Search" class="w-full pl-3 text-sm text-black outline-none focus:outline-none bg-transparent" />
        </div>
      </div>
      <!-- right navbar -->
      <div class="flex items-center relative">
        <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" class="w-12 h-12 rounded-full shadow-lg" @click="dropDownOpen = !dropDownOpen">
      </div>
    </div>

    <!-- dropdown menu -->
    <div class="absolute bg-gray-300 border border-t-0 shadow-xl text-gray-700 rounded-b-lg w-48 bottom-10 right-0 mr-6" :class="dropDownOpen ? '' : 'hidden'">
      <a href="#" class="block px-4 py-2 hover:bg-gray-200">Logout</a>
    </div>
    <!-- dropdown menu end -->
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  data () {
    return {
      dropDownOpen: false
    }
  },
  methods: {
    toggleSidebar () {
      this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>
