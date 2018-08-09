
<template>
  <nav class="navbar d-flex justify-content-between">
    <div class="navbar-brand">
      <router-link to="/"><strong>HP</strong></router-link>
    </div>
    <div class="navbar-brand title"><strong>HackPress</strong></div>
    <div class="dropdown float-right">
      <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
        aria-expanded="false">
        <i class="fas fa-user"></i>
      </button>
      <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
        <a v-if="!isLoggedIn" @click="$router.push('login')" class="dropdown-item" href="#">Login</a>
        <p v-if="isLoggedIn" class="dropdown-item">Welcome, {{username}}</p>
        <a v-if="isLoggedIn" @click="logout()" class="dropdown-item" href="#">Logout</a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'NavBar',
  computed: {
    ...mapState({
      isLoggedIn: 'isLoggedIn',
      username: 'username'
    })
  },
  methods: {
    ...mapActions([
      'logout',
      'statusLoggedIn'
    ])
  },
  created () {
    if (localStorage.getItem('token')) {
      this.statusLoggedIn()
    }
  }
}
</script>

<style lang="scss">
.navbar {
  padding: 10px;
  margin-bottom: 30px;
  background-color: darkkhaki;
  color: white;
  .title {
    font-size: 2em;
    font-family: 'Courier New', Courier, monospace;
  }
}
.navbar-brand {
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}
</style>
