<template>
  <q-page>
    <div class="text-h4">Areas</div>
    <div class="text-subtitle1 text-weight-medium q-mb-lg">Esta es la zona en donde van las descripciones del proyecto, aqui se van a poder gestionar etc etc</div>
    <Table
      :rows="[
        { id: '123', descripcion: 'ESTA ES UNA DESCRIPCIONN BIEN LARGA' },
        { id: '456', descripcion: 'No loremp ipsum ad populum' },
      ]"
      :columns="[
        { field: 'id', name: 'id', label: '#', align: 'left' },
        { field: 'descripcion', name: 'descripcion', label: 'Descripcion', align: 'left' },
      ]"
    >

    </Table>
  </q-page>
</template>

<script setup lang="ts">
import Table from '../../../components/Table.vue'
</script>

<style scoped lang="sass">

</style>
