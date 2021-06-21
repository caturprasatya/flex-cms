import Vue from 'vue'
import Vuex from 'vuex'

import axios from '../configs/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    galery: [],
    data: {
      title: '',
      description: '',
      image_url: ''
    },
    search: '',
    sideBarOpen: false
  },
  mutations: {
    setImages (state, payload) {
      state.galery = payload
    },
    setImage (state, payload) {
      state.data = payload
    },
    setSearch (state, payload) {
      state.search = payload
    },
    toggleSidebar (state) {
      state.sideBarOpen = !state.sideBarOpen
    }
  },
  actions: {
    toggleSidebar (context) {
      context.commit('toggleSidebar')
    },
    errorsHandler (_, payload) {
      let errors = payload.data.message
      if (payload.status === 400) {
        errors = ''
        payload.data.message.forEach(error => {
          console.log(error)
          errors += `- ${error} \r\n`
        })
      }
      Vue.swal.fire({
        icon: 'error',
        text: `${errors}`
      })
    },
    async userLogin ({ dispatch }, payload) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: '/login',
          data: {
            email: payload.email,
            password: payload.password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        router.push('/images')
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    },
    async fetchImages ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/products',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        commit('setImages', data)
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    },
    async addImage ({ dispatch }, payload) {
      try {
        await axios({
          method: 'GET',
          url: '/images',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchImages')
        Vue.swal({
          title: 'Product Added',
          showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        })
        router.push('/galery')
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    },
    async editImage ({ dispatch }, payload) {
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/images/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchImages')
        router.push('/galery')
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    },
    async getImageById ({ commit, dispatch }, { id }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/products/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        commit('setImage', data)
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    },
    async deleteImages ({ dispatch }, { id }) {
      try {
        await axios({
          method: 'DELETE',
          url: `/images/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchImages')
        router.push('/images')
        Vue.swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch (error) {
        dispatch('errorsHandler', error)
      }
    }
  },
  modules: {
  },
  getters: {
    sideBarOpen: state => {
      return state.sideBarOpen
    },
    filteredProduct: state => {
      console.log(state.galery)
      return state.galery
        .filter(file =>
          file.name.toLowerCase().includes(state.search.toLowerCase())
        )
    }
  }
})
