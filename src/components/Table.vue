<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    flat
    dense
    class="table"
  >
    <template #top-left>
      <q-input
        outlined
        dense
        placeholder="Search"
        class="q-mb-sm"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template #top-right>
      <q-btn
        unelevated
        no-caps
        square
        icon="export"
        label="Export"
      >
      </q-btn>
    </template>
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

    height: 48px !important
    background-color: #ffffff !important // Cambia a tu color deseado
    color: #334155 !important // Asegúrate de que el color del texto se aplique
  th
    border-top: 1px solid rgba(0, 0, 0, 0.12) !important
    font-weight: 600 !important
    font-size: 14px
  tr
    color: #334155 !important
    font-weight: 500 !important
    font-size: 14px
    height: 48px !important

.q-field--dense
  .q-field__control,
  .q-field__marginal
    height: 34px

.q-field--outlined
  .q-field__control
    border-radius: 6px

</style>
