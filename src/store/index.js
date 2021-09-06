import Swal from 'sweetalert2'
import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../configs/axios'
import router from '../router'

Vue.use(Vuex)
// const 'https:/dev.service.flx.asia/api/v1'

export default new Vuex.Store({
  state: {
    popularWorks: [],
    heroSections: [],
    categories: [],
    stories: [],
    contacts: [],
    footers: [],
    navbars: [],
    services: [],
    detailService: {},
    detailStory: {},
    detailFooter: {},
    detailNavbar: {},
    detailContact: {},
    detailCategory: {},
    detailPopularWork: {},
    detailHeroSection: {},
    isLoading: false,
    search: '',
    sideBarOpen: false,
    isEditPage: false,
    progress: 0,
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
    setDetailContact (state, payload) {
      state.detailContact = payload
    },
    setServices (state, payload) {
      state.services = payload
    },
    setDetailService (state, payload) {
      state.detailService = payload
    },
    setStories (state, payload) {
      state.stories = payload
    },
    setStory (state, payload) {
      state.detailStory = payload
    },
    setDetailCategory (state, payload) {
      state.detailCategory = payload
    },
    setCategories (state, payload) {
      state.categories = payload
    },
    setNavbars (state, payload) {
      state.navbars = payload
    },
    setNavbar (state, payload) {
      state.detailNavbar = payload
    },
    setFooters (state, payload) {
      state.footers = payload
    },
    setFooter (state, payload) {
      state.detailFooter = payload
    },
    setProgressBar (state, payload) {
      state.progress = payload
    },
    setLoading (state, boolean) {
      state.isLoading = boolean
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
    errorsHandler ({ commit }, payload) {
      commit('setLoading', false)
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
        localStorage.setItem('access_token', data.token)
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async userUpdate ({ dispatch }, payload) {
      try {
        await axios({
          method: 'PUT',
          url: '/update',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async fetchPopularWorks ({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setPopularWorks', data.items)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addPopularWork ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
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
        commit('setLoading', false)
        router.push('/')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editPopularWork ({ commit, dispatch }, payload) {
      const { id } = payload
      commit('setLoading', true)
      try {
        await axios({
          method: 'PUT',
          url: `/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchPopularWorks')
        commit('setLoading', false)
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
            'X-Access-Token': localStorage.getItem('access_token')
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
            'X-Access-Token': localStorage.getItem('access_token')
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
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/banner',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setHeroSections', data.videos)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addHeroSection ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/banner',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchHeroSections')
        commit('setLoading', false)
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
    async editHeroSection ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/banner/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchHeroSections')
        commit('setLoading', false)
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
            'X-Access-Token': localStorage.getItem('access_token')
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
            'X-Access-Token': localStorage.getItem('access_token')
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
    // !! ======================== CATEGORY =========================
    async fetchCategories ({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/category',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setCategories', data.categories)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteCategoryById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/category/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        dispatch('fetchCategories')
        // router.push('/category')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addCategory ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/category',
          data: payload,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        dispatch('fetchCategories')
        commit('setLoading', false)
        router.push('/category')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getCategoryById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/category/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setDetailCategory', data)
        if (!isEdit) {
          router.push(`/CategoryEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editCategory ({ commit, dispatch }, payload) {
      const { id } = payload
      commit('setLoading', true)
      try {
        await axios({
          method: 'PUT',
          url: `/category/${id}`,
          data: { name: payload.name },
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        await dispatch('fetchCategories')
        commit('setLoading', true)
        router.push('/category')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !================== Contact ================================
    async fetchContacts ({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/contact',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setContacts', data.users)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addContact ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/contact',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchContacts')
        commit('setLoading', true)
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
    async editContact ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      const { id } = payload
      try {
        await axios({
          method: 'PUT',
          url: `/contact/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchContacts')
        commit('setLoading', false)
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
            'X-Access-Token': localStorage.getItem('access_token')
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
            'X-Access-Token': localStorage.getItem('access_token')
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
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/story',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setStories', data.teks)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addStory ({ commit, dispatch }, payload) {
      try {
        commit('setLoading', true)
        await axios({
          method: 'POST',
          url: '/story',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchStories')
        commit('setLoading', false)
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
    async editStory ({ commit, dispatch }, payload) {
      const { id } = payload
      try {
        commit('setLoading', true)
        await axios({
          method: 'PUT',
          url: `/story/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchStories')
        commit('setLoading', true)
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
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setStory', data)
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
            'X-Access-Token': localStorage.getItem('access_token')
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
    },
    // !===================== Story ================================
    async fetchServices ({ commit, dispatch }) {
      try {
        commit('setLoading', true)
        const { data } = await axios({
          method: 'GET',
          url: '/services',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setServices', data.texts)
        commit('setLoading', true)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addService ({ commit, dispatch }, payload) {
      try {
        commit('setLoading', true)
        await axios({
          method: 'POST',
          url: '/services',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchServices')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        commit('setLoading', false)
        router.push('/service')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editService ({ commit, dispatch }, payload) {
      const { id } = payload
      commit('setLoading', true)
      try {
        await axios({
          method: 'PUT',
          url: `/services/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchServices')
        commit('setLoading', false)
        router.push('/service')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getServiceById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/services/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setDetailService', data)
        if (!isEdit) {
          router.push(`/serviceEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteServiceById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/service/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        dispatch('fetchServices')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !===================== Navbar ================================
    async fetchNavbars ({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/navbar',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setNavbars', data.navbars)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addNavbar ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/navbar',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchNavbars')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        commit('setLoading', false)
        router.push('/Navbar')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editNavbar ({ commit, dispatch }, payload) {
      const { id } = payload
      commit('setLoading', true)
      try {
        await axios({
          method: 'PUT',
          url: `/Navbar/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchNavbars')
        commit('setLoading', false)
        router.push('/Navbar')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getNavbarById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/navbar/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setNavbar', data)
        if (!isEdit) {
          router.push(`/NavbarEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteNavbarById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/navbar/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        dispatch('fetchNavbars')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    // !===================== Footer ================================
    async fetchFooters ({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data } = await axios({
          method: 'GET',
          url: '/footer',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setLoading', false)
        commit('setFooters', data.socialMedia)
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async addFooter ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      try {
        await axios({
          method: 'POST',
          url: '/footer',
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchFooters')
        // Vue.swal({
        //   title: 'Product Added',
        //   showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        //   },
        //   hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        //   }
        // })
        commit('setLoading', false)
        router.push('/Footer')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async editFooter ({ commit, dispatch }, payload) {
      const { id } = payload
      commit('setLoading', true)
      try {
        await axios({
          method: 'PUT',
          url: `/footer/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          },
          data: payload
        })
        dispatch('fetchFooters')
        commit('setLoading', false)
        router.push('/footer')
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async getFooterById ({ commit, dispatch }, { id, isEdit }) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `/footer/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        commit('setFooter', data)
        if (!isEdit) {
          router.push(`/FooterEdit/${id}`)
        }
      } catch ({ response }) {
        dispatch('errorsHandler', response)
      }
    },
    async deleteFooterById ({ dispatch }, id) {
      try {
        await axios({
          method: 'DELETE',
          url: `/footer/${id}`,
          headers: {
            'X-Access-Token': localStorage.getItem('access_token')
          }
        })
        dispatch('fetchFooters')
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
