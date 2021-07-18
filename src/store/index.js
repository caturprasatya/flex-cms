import Swal from 'sweetalert2'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../configs/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popularWorks: [],
    heroSections: [],
    categories: [],
    detailPopularWork: {},
    detailHeroSection: {},
    isLoadingDetailPW: false,
    search: '',
    sideBarOpen: false,
    isEditPage: false,
    token: localStorage.getItem('access_token') || ''
  },
  mutations: {
    setPopularWorks (state, payload) {
      state.popularWorks = payload
    },
    setDetailPopularWork (state, payload) {
      state.detailPopularWork = payload
    },
    setHeroSections (state, payload) {
      state.heroSections = payload
    },
    setDetailHeroSection (state, payload) {
      state.detailHeroSection = payload
      console.log(payload)
    },
    setLoadingDetail (state, boolean) {
      state.isLoadingDetailPW = boolean
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    toggleSidebar (state) {
      state.sideBarOpen = !state.sideBarOpen
    },
    editPage (state) {
      state.isEditPage = !state.isEditPage
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
          errors += `- ${error} \r\n`
        })
      }
      Swal.fire({
        icon: 'error',
        text: `${errors}`
      })
    },
    async userLogin ({ dispatch }, payload) {
      console.log(payload)
      try {
        const { data } = await axios({
          method: 'POST',
          url: '/login',
          data: payload
        })
        localStorage.setItem('access_token', data.access_token)
        router.push('/')
      } catch ({ response }) {
        console.log(response)
        dispatch('errorsHandler', response)
      }
    },
    async fetchPopularWorks ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data)
        commit('setPopularWorks', data.items)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addPopularWork ({ dispatch }, payload) {
      console.log(payload)
      try {
        await axios({
          method: 'POST',
          url: '/',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchPopularWorks')
        // Swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editPopularWork ({ dispatch }, payload) {
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchPopularWorks')
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getPopularWorkById ({ commit, dispatch }, { id }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('editPage', data)
        commit('setDetailPopularWork', data)
        router.push(`/edit/${id}`)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deletePopularWorkById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchPopularWorks')
        router.push('/')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !================== HeroSection ================================
    async fetchHeroSections ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/banner',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data)
        commit('setHeroSections', data.videos)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addHeroSection ({ dispatch }, payload) {
      console.log(payload)
      try {
        await axios({
          method: 'POST',
          url: '/banner',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchHeroSections')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        router.push('/banner')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editHeroSection ({ dispatch }, payload) {
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/banner/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchHeroSections')
        router.push('/banner')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getHeroSectionById ({ commit, dispatch }, { id }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/banner/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('editPage', data)
        commit('set', data)
        router.push(`/HeroSectionEdit/${id}`)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteHeroSectionById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/banner/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchHeroSections')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !! ============================ CATEGORY =========================
    async fetchCategories ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/category',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // console.log(data)
        commit('setCategories', data.categories)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    }
    // async deleteClient ({ dispatch }, { id }) {
    //   try {
    //     await axios({
    //       method: 'DELETE',
    //       url: `/client/${id}`,
    //       headers: {
    //         access_token: localStorage.getItem('access_token')
    //       }
    //     })
    //     dispatch('fetchCategories')
    //     router.push('/')
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   } catch ({ response }) {
    //     dispatch('errorsHandler', response)
    //   }
    // }
  },
  modules: {
  },
  getters: {
    sideBarOpen: state => {
      return state.sideBarOpen
    },
    filteredProduct: state => {
      return state.popularWorks
        .filter(file =>
          file.title.toLowerCase().includes(state.search.toLowerCase())
        )
    },
    // detailPopularWorks:state => {
    //   return state.popularWorks
    //     .map(file =>
    //       file.title.toLowerCase().includes(state.search.toLowerCase())
    //     )
    // },
    isAuthenticated: state => !!state.token
  }
})
