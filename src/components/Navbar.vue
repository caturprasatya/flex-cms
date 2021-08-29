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
        <button class="button button--pandora" @click.prevent="logout"><span>Logout</span></button>
        <!-- <img src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png" class="w-12 h-12 rounded-full shadow-lg" @click="dropDownOpen = !dropDownOpen"> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import router from '../router/'

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
    },
    logout () {
      localStorage.removeItem('access_token')
      router.push('/login')
    }
  }
}
</script>
<style scoped>
  .button {
    pointer-events: auto;
    cursor: pointer;
    background: #e7e7e7;
    border: none;
    padding: 1.5rem 1rem;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    position: relative;
    display: inline-block;
  }

  .button::before,
  .button::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .button--pandora {
    background: #082032;
    font-weight: 700;
    padding: 0;
    border-radius: 5px;
  }

  .button--pandora span {
    display: block;
    background: #a7a7a7;
    padding: 0.8rem 0.5rem;
    border: 1px solid #334756;
    border-radius: 5px;
    transform: translate3d(-4px, -4px, 0);
    transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1);
  }

  .button--pandora:hover span {
    transform: translate3d(-8px, -8px, 0);
  }
</style>
