<template>
  <div class="home">
    <Nav></Nav>
    <h3>List of Articles</h3>
    <br>
    <text-box-modal></text-box-modal>
    <br>
    <hr>
    <br>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div v-for="(article, index) in articles" :key="index" class="post-preview">
            <router-link :to="{ path: `/article/${article._id}` }">
              <h2 class="post-title">
                {{ article.title }}
              </h2>
            </router-link>
            <p class="post-meta">Posted by
              <router-link :to="{ path: `/author/${article.author._id}` }">
              {{ article.author.username }}
              </router-link>
              on {{ getDate(article.createdAt) }}</p>
            <p>Category:
              <router-link :to="{ path: `/category/${article.category}` }">
                {{ article.category }}
              </router-link>
            </p>
            <hr>
            <vue-editor v-html="article.content"></vue-editor>
            <hr>
            <text-box-modal v-if="article.author.username === username"
            :id="article._id" :item="article"></text-box-modal>
            <hr class="hr-border">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue'
import TextBoxModal from '@/components/TextBoxModal.vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'home',
  components: {
    Nav,
    TextBoxModal,
    VueEditor
  },
  methods: {
    ...mapActions([
      'getArticles',
      'statusLoggedIn'
    ]),
    getDate (date) {
      return moment(date).format('DD MMMM [at] HH:mm')
    }
  },
  computed: {
    ...mapState({
      articles: 'articles',
      isLoggedIn: 'isLoggedIn',
      username: 'username'
    })
  },
  created () {
    this.getArticles()
    if (localStorage.getItem('token')) {
      this.statusLoggedIn()
    }
  }
}
</script>

<style lang="scss">
.post-preview {
  a {
    color: darkcyan;
    font-weight: bold;
    text-decoration: none;
  }
  a:hover {
    color: lightgreen;
    text-decoration: none;
  }
  .btn {
    margin: 10px;
  }
}
.hr-border {
    display: block;
    height: 1px;
    border: 0;
    border-top: 2px solid black;
    margin: 1em 0;
    padding: 0;
}
</style>
