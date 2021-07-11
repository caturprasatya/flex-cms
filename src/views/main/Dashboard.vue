<template>
  <div class="m-10">
    <h1 class="mb-4 text-center text-5xl font-black text-gray-100"> Data </h1>
    <!-- <div class="flex"> -->
      <CardDashboard />
    <!-- </div> -->
    <TableClient />
  </div>
</template>

<script>
import CardDashboard from '@/components/ui/CardDashboard.vue'
import TableClient from '../../components/TableClient.vue'

export default {
  name: 'Dashboard',
  components: {
    CardDashboard,
    TableClient
  }
}
</script>

<style>

</style>
