<template>
  <!-- component -->
  <div class="min-w-screen min-h-screen flex justify-center bg-gray-600 font-sans border-dark rounded overflow-hidden my-0">
      <div class="w-full p-10">
          <div class="bg-transparent shadow-xl rounded my-6">
              <table class="min-w-max w-full table-auto">
                  <thead>
                    <tr class="bg-gray-900 text-gray-100 uppercase text-sm leading-normal">
                      <th class="py-3 px-6 text-left">No</th>
                      <th class="py-3 px-6 text-left">Name</th>
                      <th class="py-3 px-6 text-left">Role</th>
                      <th class="py-3 px-6 text-left">Phone Number</th>
                      <th class="py-3 px-6 text-left">Email</th>
                      <th class="py-3 px-6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody v-for="(item, index) in contacts" :key="index" class="text-gray-100 text-sm font-light">
                      <tr class="border-b border-gray-200 hover:bg-gray-400">
                        <td class="py-3 px-6 text-left w-2 whitespace-wrap">
                          <div class="flex items-center w-2">
                            <span class="font-medium truncate">{{ index+1 }}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left w-40 whitespace-wrap">
                          <div class="flex items-center w-40">
                            <span class="font-medium truncate">{{ item.name }}</span>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left">
                          <div class="flex items-center">
                            <div class="flex items-center">
                              <span class="font-medium truncate">{{ item.role }}</span>
                            </div>
                          </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-wrap">
                            <div class="flex items-center ">
                                <span class="font-medium truncate">{{ item.phone_number }}</span>
                            </div>
                        </td>
                        <td class="py-3 px-6 text-left whitespace-wrap">
                            <div class="flex items-center">
                                <span class="font-medium truncate">{{ item.email }}</span>
                            </div>
                        </td>
                        <td class="py-3 px-6 text-center">
                            <div class="flex item-center justify-center">
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click.prevent="populateProduct(item.id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <div class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" @click.prevent='deleteProduct(item.id)'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

import { mapState } from 'vuex'

export default {
  name: 'Table',
  data () {
    return {
      useModalToBanner: false
    }
  },
  computed: {
    ...mapState(['contacts'])
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
          this.$store.dispatch('deleteContactById', id)
        }
      })
    },
    populateProduct (id) {
      this.$store.dispatch('getContactById', { id, isEdit: false })
    }
  },
  components: {
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
