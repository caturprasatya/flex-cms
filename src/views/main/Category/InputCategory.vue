<template>
  <div id="home">
      <Form />
  </div>
</template>

<script>
import Form from '@/components/Category/FormInputCategory.vue'

export default {
  components: {
    Form
  },
  created () {
    if (this.$route.params?.id) {
      this.$store.dispatch('getCategoryById', { id: this.$route.params?.id })
    }
  }
}
</script>

<style>

</style>
