import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: '',
    articles: '',
    isLoggedIn: ''
  },
  mutations: {
    username (state, payload) {
      state.username = payload
    },
    articles (state, payload) {
      state.articles = payload
    },
    isLoggedIn (state, payload) {
      state.isLoggedIn = payload
    }
  },
  actions: {
    getLogin ({ commit }, payload) {
      axios
        .post('http://hacktiv8press-blog.tushbedi.biz/login', payload)
        .then(({ data }) => {
          if (data.token) {
            commit('isLoggedIn', true)
            commit('username', data.username)
            localStorage.setItem('username', data.username)
            localStorage.setItem('token', data.token)
            router.push('/')
            swal({
              title: 'Login successful!',
              text: 'Please feel free to post an article',
              icon: 'success'
            })
          } else {
            swal({
              title: 'Error!',
              text: 'Wrong Username / Password',
              icon: 'error'})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    getRegister ({ commit }, payload) {
      axios
        .post('http://hacktiv8press-blog.tushbedi.biz/register', payload)
        .then(({ data }) => {
          if (data.token) {
            commit('isLoggedIn', true)
            commit('username', data.username)
            localStorage.setItem('username', data.username)
            localStorage.setItem('token', data.token)
            router.push('/')
            swal({
              title: 'Register successful!',
              text: 'Please feel free to post an article',
              icon: 'success'
            })
          } else {
            swal({
              title: 'Error!',
              text: 'Please fill all boxes',
              icon: 'error'})
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      commit('isLoggedIn', false)
      commit('username', '')
      router.push('/login')
      swal({
        text: 'You are logged out!',
        icon: 'success'
      })
    },
    statusLoggedIn ({ commit }) {
      commit('isLoggedIn', true)
      commit('username', localStorage.getItem('username'))
    },
    getArticles ({ commit }, payload) {
      let token = localStorage.getItem('token')
      let config = { headers: { token } }
      axios
        .get('http://hacktiv8press-blog.tushbedi.biz/article', config)
        .then(({ data }) => {
          commit('articles', data.articles)
        })
        .catch(err => {
          console.log(err)
          swal({
            title: 'Error!',
            text: 'Our Server is currently down. Please wait a moment'
          })
        })
    },
    getOneArticle ({ commit }, payload) {
      let token = localStorage.getItem('token')
      let config = { headers: { token } }
      axios
        .get(`http://hacktiv8press-blog.tushbedi.biz/article/${payload}`, config)
        .then(({ data }) => {
          commit('articles', data.article)
        })
        .catch(err => {
          console.log(err)
          swal({
            title: 'Error!',
            text: 'Our Server is currently down. Please wait a moment'
          })
        })
    },
    addArticle (context, payload) {
      let token = localStorage.getItem('token')
      let config = { headers: { token } }
      axios
        .post('http://hacktiv8press-blog.tushbedi.biz/article', payload, config)
        .then(({ data }) => {
          if (data.body) {
            swal({
              title: 'Warning!',
              text: 'Please fill all of the boxes',
              icon: 'error'
            })
          } else {
            router.push(`/article/${data.newArticle._id}`)
            swal({
              title: 'Successfully add new article',
              icon: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateArticle: function (context, payload) {
      let token = localStorage.getItem('token')
      let config = { headers: { token } }
      axios
        .put(`http://hacktiv8press-blog.tushbedi.biz/article/${payload.id}`, payload, config)
        .then(({ data }) => {
          context.dispatch('getArticles')
          swal({
            title: 'Successfully update your article',
            icon: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          swal({
            title: 'Warning!',
            text: JSON.stringify(err),
            icon: 'error'
          })
        })
    },
    deleteArticle: function (context, payload) {
      let token = localStorage.getItem('token')
      let config = { headers: { token } }
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this article!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            axios
              .delete(`http://hacktiv8press-blog.tushbedi.biz/article/${payload}`, config)
              .then(({ data }) => {
                if (data.body) {
                  swal({
                    title: 'Warning!',
                    text: JSON.stringify(data),
                    icon: 'error'
                  })
                } else {
                  swal({
                    text: 'Successfully delete article!',
                    icon: 'success'
                  })
                  context.dispatch('getArticles')
                }
              })
              .catch(err => {
                console.log(err)
              })
          }
        })
    }
  }
})
