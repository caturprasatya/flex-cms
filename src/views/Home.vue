<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">

      <Sidebar />

      <div class="w-full bg-gray-700 pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

        <Navbar />

        <div class="p-6 bg-gray-700 mb-20">
          <!-- breadcrumb -->
          <nav class="text-sm font-semibold mb-0" aria-label="Breadcrumb">
            <ol class="list-none p-0 inline-flex">
              <li class="flex items-center text-blue-500">
                <router-link to="/" aria-current="page">
                  <a href="#" class="text-gray-100">Home</a>
                </router-link>
                <svg class="fill-current w-3 h-3 mx-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
              </li>
              <li v-if="this.$route.name != 'Home'" class="flex items-center">
                <a href="#" class="text-gray-100">{{ this.$route.name }}</a>
              </li>
            </ol>
          </nav>
          <!-- breadcrumb end -->
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Sidebar
  },
  computed: {
    ...mapState(['sideBarOpen'])
  },
  mounted () {
    this.$store.dispatch('fetchPopularWorks')
    this.$store.dispatch('fetchHeroSections')
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchNavbars')
    this.$store.dispatch('fetchFooters')
    this.$store.dispatch('fetchContacts')
    this.$store.dispatch('fetchStories')
  }
}
</script>
