<template>

  <div id="login-page">
    <Nav></Nav>
    <!-- Login -->
    <div v-if="!isRegister" id=login>
      <h3>Login</h3>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter Password">
      </div>
      <button @click="login()" type="submit" class="btn btn-primary">Login</button>
      <br>
      <a href="#" @click="isRegister = !isRegister; clearInput()">Register</a>
      <br>
    </div>
    <!-- Register -->
    <div v-if="isRegister" id="register">
      <h3>Register</h3>
      <div class="form-group">
        <label>Username</label>
        <input v-model="username" type="text" class="form-control" placeholder="Enter username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Enter Password">
      </div>
      <button @click="register()" type="submit" class="btn btn-primary">Register</button>
      <br>
      <a href="#" @click="isRegister = !isRegister; clearInput()">Login</a>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'login',
  components: {
    Nav
  },
  data () {
    return {
      isRegister: false,
      username: '',
      password: '',
      name: ''
    }
  },
  computed: {
    ...mapState({
      isLoggedIn: 'isLoggedIn',
      username: 'username'
    })
  },
  methods: {
    ...mapActions([
      'getLogin',
      'getRegister'
    ]),
    login () {
      let payload = {
        username: this.username,
        password: this.password
      }
      this.getLogin(payload)
    },
    register () {
      let payload = {
        username: this.username,
        password: this.password
      }
      this.getRegister(payload)
    },
    clearInput () {
      this.password = ''
      this.username = ''
    }
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
#login, #register {
  background-color: white;
  text-align: center;
  margin: 70px auto;
  width: 400px;
  border: 2px solid darkcyan;
  padding: 20px;
  border-radius: 10px;
  .btn {
    margin-bottom: 10px;
  }
}
</style>
