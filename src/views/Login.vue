<template>
  <div class="w-full min-h-screen m-0">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>

<style>
.w-full.min-h-screen.m-0{
  background: #262626;
}
</style>
