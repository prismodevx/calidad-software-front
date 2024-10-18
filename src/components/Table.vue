<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    flat
    dense
    class="table"
  >
  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
  }
});


</script>

<style lang="sass">
.table
  border-radius: 0
  thead
    height: 2.2rem
    background-color: #fafafa !important // Cambia a tu color deseado
    color: #575759 !important // Asegúrate de que el color del texto se aplique
  th
    font-weight: 500 !important
    font-size: 12px
  tbody
    height: 6rem
</style>
