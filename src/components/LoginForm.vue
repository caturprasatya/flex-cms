<template>
  <div class="w-full bg-gray-700 m-0 flex flex-col">
    <div class="active content lg:w-6/12 md:w-6/12">
      <h1>Sign in</h1>
      <div class="input-field">
        <input placeholder="Email" type="email" v-model="user.email" class="validate"></div>
      <div class="input-field">
        <input placeholder="Password" type="password" v-model="user.password" class="validate"></div>
        <button class="second-button" @click.prevent="submitUserLogin">Sign in</button>
        <!-- <p>Forgot password? <a href="/signup.html">Send Email</a></p> -->
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginForm',
  data () {
    return {
      isPopup: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    submitUserLogin () {
      this.$store.dispatch('userLogin', this.user)
      console.log(this.user)
    },
    togglePopup () {
      this.isPopup = !this.isPopup
    }
  },
  components: {
  }
}
</script>

<style>
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-150%) scale(0);
  width: 390px;
  height: 450px;
  text-align: center;
  padding: 20px;
  border-radius: 20px;
  background: #262626;
  box-shadow: 38px 38px 56px #1e1e1e,
              -25px -25px 38px #1e1e1e;
  z-index: 1;
}

.active.content {
  transition: all 300ms ease-in-out;
  transform: translate(-50%,-50%) scale(1);
}

h1 {
  text-align: center;
  font-size: 32px;
  font-weight: 600;
  padding-top: 20px;
  padding-bottom: 10px;
}

a {
  font-weight: 600;
  color: white;
}

.input-field .validate {
  padding: 20px;
  font-size: 16px;
  border-radius: 10px;
  border: none;
  margin-bottom: 15px;
  color: #bfc0c0;
  background: #262626;
  box-shadow: inset 5px 5px 5px #232323,
              inset -5px -5px 5px #292929;
  outline: none;
}

.first-button {
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 30px 50px;
  border-radius: 40px;
  border: none;
  position: absolute;
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
  background: #262626;
  box-shadow: 18px 18px 25px #1e1e1e,
              -15px -15px 25px #1e1e1e;
  transition: box-shadow .35s ease !important;
  outline: none;
}

.first-button:active {
  background: linear-gradient(145deg, #222222, #292929);
  box-shadow: 5px 5px 10px #262626,
              -5px -5px 10px #262626;
  border: none;
}

.second-button {
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  padding: 20px 30px;
  border-radius: 40px;
  border: none;
  background: #262626;
  box-shadow: 8px 8px 15px #202020,
              -8px -8px 15px #2c2c2c;
  transition: box-shadow .35s ease !important;
  outline: none;
}

.second-button:active{
  background: linear-gradient(145deg,#222222, #292929);
  box-shadow: 5px 5px 10px #262626, -5px -5px 10px #262626;
  border: none;
  outline: none;
  box-shadow: inset 10px 10px 5px #232323,
              inset -10px -10px 5px #292929;
}

.second-button:focus{
  background: linear-gradient(145deg,#222222, #292929);
  box-shadow: 5px 5px 10px #262626, -5px -5px 10px #262626;
  border: none;
  outline: none;
  box-shadow: inset 10px 10px 5px #232323,
              inset -10px -10px 5px #292929;
}

p{
  color: #bfc0c0;
  padding: 12px;
}
</style>
