<template>
  <q-page>
<!--    <div class="text-h4">Areas</div>-->
<!--    <div class="text-subtitle1 text-weight-medium q-mb-lg">Esta es la zona en donde van las descripciones del proyecto, aqui se van a poder gestionar etc etc</div>-->
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
    <div class="row">
      <div class="col-2">
        <SelectSingle
          :label="'Select single label'"
          :options="optionsAll"
          v-model="select"
        />
      </div>
      <div class="col-3">
        <SelectMultiple
          :label="'Select Multiple label'"
          :options="optionsAll"
          v-model="selectMultiple"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Table from '../../../components/Table.vue'
import SelectSingle from 'components/SelectSingle.vue';
import SelectMultiple from 'components/SelectMultiple.vue';
import { onMounted, ref } from 'vue';

const optionsAll = ref<Array<any>>([
  // {
  //   value: 1,
  //   label: 'opc'
  // },
  // {
  //   value: 2,
  //   label: 'Opcion 2'
  // },
  // {
  //   value: 3,
  //   label: 'Opcion 1'
  // },
  // {
  //   value: 4,
  //   label: 'opc'
  // },
  // {
  //   value: 5,
  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'
  // },
  // {
  //   value: 6,
  //   label: 'Opcion 1'
  // },
  // {
  //   value: 7,
  //   label: 'opc'
  // },
  // {
  //   value: 8,
  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'
  // },
  // {
  //   value: 9,
  //   label: 'Opcion 1'
  // },
  // {
  //   value: 10,
  //   label: 'opc'
  // },
  // {
  //   value: 11,
  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'
  // },
  // {
  //   value: 12,
  //   label: 'Opcion 1'
  // }
]);

const select = ref<any>(null);
const selectMultiple = ref<Array<any>>([]);

onMounted(() => {
  setTimeout(() => {
    optionsAll.value = [
      {
        value: 1,
        label: 'opc'
      },
      {
        value: 2,
        label: 'Opcion 2'
      },
      {
        value: 3,
        label: 'Opcion 1'
      },
    ];

    selectMultiple.value = [
      {
        value: 1,
        label: 'opc'
      },
      {
        value: 2,
        label: 'Opcion 2'
      },
      {
        value: 3,
        label: 'Opcion 1'
      },
    ];
  }, 1000);
});
</script>

<style scoped lang="sass">
</style>
