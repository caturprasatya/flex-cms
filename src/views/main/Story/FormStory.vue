<template>
  <div id="home">
      <Form />
  </div>
</template>

<script>
import Form from '@/components/Story/InputForm.vue'

export default {
  components: {
    Form
  },
  methods: {
    reloadEditRouter () {
      if (this.$route.params?.id) {
        this.$store.dispatch('getStoryById', { id: this.$route.params?.id, isEdit: true })
      }
    }
  },
  mounted () {
    this.reloadEditRouter()
  }
}
</script>

<style>

</style>
