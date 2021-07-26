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
    stories: [],
    contacts: [],
    detailStory: {},
    detailContact: {},
    detailCategory: {},
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
    },
    setContacts (state, payload) {
      state.contacts = payload
    },
    setContact (state, payload) {
      state.detailContact = payload
    },
    setDetailContact (state, payload) {
      state.detailContact = payload
    },
    setStories (state, payload) {
      state.stories = payload
    },
    setStory (state, payload) {
      state.detailStory = payload
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
    editPage (state, _) {
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
      try {
        const { data } = await axios({
          method: 'POST',
          url: '/login',
          data: payload
        })
        localStorage.setItem('access_token', data.access_token)
        router.push('/')
      } catch ({ response }) {
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
    async getPopularWorkById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        // commit('editPage', data)
        commit('setDetailPopularWork', data)
        if (!isEdit) {
          router.push(`/PopuaraWorkEdit/${id}`)
        }
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
        commit('setHeroSections', data.videos)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addHeroSection ({ dispatch }, payload) {
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
    async getHeroSectionById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/banner/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('setDetailHeroSection', data)
        if (!isEdit) {
          router.push(`/HeroSectionEdit/${id}`)
        }
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
        console.log(data.categories)
        commit('setCategories', data.categories)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteCategory ({ dispatch }, { id }) {
      try {
        await axios({
          method: 'DELETE',
          url: `/category/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchCategories')
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
    async addCategory ({ dispatch }, payload) {
      try {
        await axios({
          method: 'POST',
          url: '/category',
          data: payload,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchCategories')
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !================== Contact ================================
    async fetchContacts ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/contact',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('setContacts', data.users)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addContact ({ dispatch }, payload) {
      try {
        await axios({
          method: 'POST',
          url: '/contact',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchContacts')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        router.push('/contact')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editContact ({ dispatch }, payload) {
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/contact/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchContacts')
        router.push('/contact')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getContactById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/contact/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('setDetailContact', data)
        if (!isEdit) {
          router.push(`/ContactEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteContactById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/contact/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchContacts')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !===================== Story ================================
    async fetchStories ({ commit, dispatch }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/story',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(data.teks)
        commit('setStories', data.teks)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addStory ({ dispatch }, payload) {
      try {
        await axios({
          method: 'POST',
          url: '/story',
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchStories')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        router.push('/story')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editStory ({ dispatch }, payload) {
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/story/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchStories')
        router.push('/story')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getStoryById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/story/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        commit('setDetailStory', data)
        if (!isEdit) {
          router.push(`/StoryEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteStoryById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/story/${id}`,
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        dispatch('fetchStories')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
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
