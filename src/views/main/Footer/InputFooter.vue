<template>
  <div id="home">
      <Form />
  </div>
</template>

<script>
import Form from '@/components/Footer/InputForm.vue'

export default {
  components: {
    Form
  },
  created () {
    if (this.$route.params?.id) {
      this.$store.dispatch('getFooterById', { id: this.$route.params?.id })
    }
  }
}
</script>

<style>

</style>
