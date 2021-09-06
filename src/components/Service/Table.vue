<template>
  <!-- component -->
  <div class="min-w-screen min-h-screen flex justify-center bg-gray-600 font-sans border-dark rounded overflow-hidden my-0">
      <div class="w-full p-10">
          <div class="bg-transparent shadow-xl rounded my-6">
              <table class="min-w-max w-full table-auto">
                  <thead>
                    <tr class="bg-gray-900 text-gray-100 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-center">Service</th>
                      <th class="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody v-for="(item, index) in services" :key="index" class="text-gray-100 text-sm font-light">
                      <tr class="border-b border-gray-200 hover:bg-gray-400">
                          <td class="py-3 px-6 justify-self-center max-w-xs h-12">
                              <div class="flex justify-center items-center whitespace-wrap">
                                  <span class=" font-semibold text-base ">{{ item.textHtml }}</span>
                              </div>
                          </td>
                          <td class="py-3 px-6 text-center">
                              <div class="flex item-center justify-center">
                                  <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click.prevent="populateProduct(item.id)">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                      </svg>
                                  </div>
                                  <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click.prevent='deleteProduct(item.id)'>
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                      </svg>
                                  </div>
                              </div>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
// import { AtomSpinner } from 'epic-spinners'

import { mapState } from 'vuex'
// import CardModal from '@/components/Service/ui/CardModalBanner.vue'

export default {
  name: 'Table',
  data () {
    return {
      useModalToBanner: false
    }
  },
  computed: {
    ...mapState(['services'])
  },
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteServiceById', id)
        }
      })
    },
    populateProduct (id) {
      this.$store.dispatch('getServiceById', { id, isEdit: false })
    }
  },
  components: {
    // CardModal
    // AtomSpinner
  },
  mounted () {
  }
}
</script>

<style>
.animated {
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.animated.faster {
  -webkit-animation-duration: 500ms;
  animation-duration: 500ms;
}
.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
.fadeOut {
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
