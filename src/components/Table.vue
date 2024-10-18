<template>
  <q-table
    :data="data"
    :columns="columns"
    row-key="id"
  >

  </q-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  rows: {
    type: Array,
    default: () => []
  }
})

const 
</script>