<!--<template>-->
<!--  <q-page>-->
<!--&lt;!&ndash;    <div class="text-h4">Areas</div>&ndash;&gt;-->
<!--&lt;!&ndash;    <div class="text-subtitle1 text-weight-medium q-mb-lg">Esta es la zona en donde van las descripciones del proyecto, aqui se van a poder gestionar etc etc</div>&ndash;&gt;-->
<!--    <Table-->
<!--      :rows="[-->
<!--        { id: '123', descripcion: 'ESTA ES UNA DESCRIPCIONN BIEN LARGA' },-->
<!--        { id: '456', descripcion: 'No loremp ipsum ad populum' },-->
<!--      ]"-->
<!--      :columns="[-->
<!--        { field: 'id', name: 'id', label: '#', align: 'left' },-->
<!--        { field: 'descripcion', name: 'descripcion', label: 'Descripcion', align: 'left' },-->
<!--      ]"-->
<!--    >-->

<!--    </Table>-->
<!--    <div class="row">-->
<!--      <div class="col-2">-->
<!--        <SelectSingle-->
<!--          :label="'Select single label'"-->
<!--          :options="optionsAll"-->
<!--          v-model="select"-->
<!--        />-->
<!--      </div>-->
<!--      <div class="col-3">-->
<!--        <SelectMultiple-->
<!--          :label="'Select Multiple label'"-->
<!--          :options="optionsAll"-->
<!--          v-model="selectMultiple"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->
<!--  </q-page>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import Table from '../../../components/Table.vue'-->
<!--import SelectSingle from 'components/SelectSingle.vue';-->
<!--import SelectMultiple from 'components/SelectMultiple.vue';-->
<!--import { onMounted, ref } from 'vue';-->

<!--const optionsAll = ref<Array<any>>([-->
<!--  // {-->
<!--  //   value: 1,-->
<!--  //   label: 'opc'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 2,-->
<!--  //   label: 'Opcion 2'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 3,-->
<!--  //   label: 'Opcion 1'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 4,-->
<!--  //   label: 'opc'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 5,-->
<!--  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 6,-->
<!--  //   label: 'Opcion 1'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 7,-->
<!--  //   label: 'opc'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 8,-->
<!--  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 9,-->
<!--  //   label: 'Opcion 1'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 10,-->
<!--  //   label: 'opc'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 11,-->
<!--  //   label: 'Opcion 2 Opcion 2 Opcion 2 Opcion 2 Opcion 2'-->
<!--  // },-->
<!--  // {-->
<!--  //   value: 12,-->
<!--  //   label: 'Opcion 1'-->
<!--  // }-->
<!--]);-->

<!--const select = ref<any>(null);-->
<!--const selectMultiple = ref<Array<any>>([]);-->

<!--onMounted(() => {-->
<!--  setTimeout(() => {-->
<!--    optionsAll.value = [-->
<!--      {-->
<!--        value: 1,-->
<!--        label: 'opc'-->
<!--      },-->
<!--      {-->
<!--        value: 2,-->
<!--        label: 'Opcion 2'-->
<!--      },-->
<!--      {-->
<!--        value: 3,-->
<!--        label: 'Opcion 1'-->
<!--      },-->
<!--    ];-->

<!--    selectMultiple.value = [-->
<!--      {-->
<!--        value: 1,-->
<!--        label: 'opc'-->
<!--      },-->
<!--      {-->
<!--        value: 2,-->
<!--        label: 'Opcion 2'-->
<!--      },-->
<!--      {-->
<!--        value: 3,-->
<!--        label: 'Opcion 1'-->
<!--      },-->
<!--    ];-->
<!--  }, 1000);-->
<!--});-->
<!--</script>-->

<!--<style scoped lang="sass">-->
<!--</style>-->

<template>
  <q-page>
    <q-btn
      label="Nuevo"
      @click="openDialog(area)"
      color="primary"
    >

    </q-btn>
    <q-table
      :columns="columns"
      :rows="rows"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            flat
            size="sm"
            round
            icon="edit"
            color="primary"
            @click="tableBtnEdit(props.row)"
          >

          </q-btn>
          <q-btn
            flat
            size="sm"
            round
            icon="delete"
            color="negative"
            @click="tableBtnDelete(props.row)"
          >

          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="dialog">
      <q-card style="width: 500px; max-width: 90vw; border-radius: 6px">
        <q-card-section>
          Nueva Area
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="area.nombre"
            label="Nombre"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
              (v) => /^[a-zA-Z0-9 _-]+$/.test(v) || 'Solo se permiten letras, números, espacios, guiones y guiones bajos'
            ]"
            maxlength="50"
            counter
          />
          <q-input
            v-model="area.descripcion"
            label="Descripcion"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            label="cancelar"
            color="negative"
            @click="closeDialog"
          >

          </q-btn>
          <q-btn
            label="guardar"
            color="primary"
            @click="save"
          >

          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import axios, { get } from 'axios';
import { Area } from '../interface/Area';
import { Dialog, Loading, useQuasar } from 'quasar';
const $q = useQuasar();

const optionsAllRol = ref<Array<any>>([]);
const dialog = ref<boolean>(false);
const columns = ref<Array<any>>([
  {
    label: '#',
    name: 'id',
    field: 'id',
    align: 'center',
  },
  {
    label: 'NOMBRE',
    name: 'nombre',
    field: 'nombre',
    align: 'center',
  },
  {
    label: 'DESCRIPCION',
    name: 'descripcion',
    field: 'descripcion',
    align: 'center',
  },
  {
    label: '...',
    name: 'actions',
    field: 'actions',
    align: 'center',
  }
]);

const rows = ref<Array<any>>([]);

const area = ref<Area>({
  id: 0,
  nombre: '',
  descripcion: '',
});

const listArea = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/areas', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    rows.value = response.data.data;
  } catch (e: any) {
    console.log(e);
  }
};

const save = async () => {
  try {
    Loading.show();
    const token = localStorage.getItem('token');

    const data = {
      id: area.value.id,
      nombre: area.value.nombre,
      descripcion: area.value.descripcion,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let response: any;

    //creacion
    if (area.value.id === 0) {
      response = await axios.post('http://localhost:8000/api/areas', data, config);
    }
    else {
      response = await axios.put(`http://localhost:8000/api/areas/${area.value.id}`, data, config);
    }
    // edicion


    closeDialog();
    Loading.hide();

    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listArea();
  } catch (e: any) {
    console.log(e);
    $q.dialog({
      title: 'Algo salio mal',
      message: e.response.data.error,
    });
  } finally {
    Loading.hide();
  }
};

const del = async (id: number) => {
  try {
    Loading.show();
    const token = localStorage.getItem('token');

    const response = await axios.delete(`http://localhost:8000/api/areas/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    Loading.hide();
    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listArea();
  } catch (e: any) {
    console.log(e);
    $q.dialog({
      title: 'Algo salio mal',
      message: e.response.data.error,
    })
  } finally {
    Loading.hide();
  }
};

const tableBtnEdit = (item: any) => {
  openDialog(item);
};

const tableBtnDelete = (item: any) => {
  $q.dialog({
    title: 'Aviso',
    message: 'Estas seguro de eliminar este registro? Recuerda que pueden existir trabajadores asignados a esta area',
    cancel: true,
  }).onOk(() => {
    del(item.id);
  }).onCancel(() => {
    console.log('cancelandoooo')
  });
};

const openDialog = async (item: any) => {
  if (item.id === 0) {
    dialog.value = true;
    return;
  }

  area.value = {
    id: item.id,
    nombre: item.nombre,
    descripcion: item.descripcion,
  };

  // await getRol();

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  area.value = {
    id: 0,
    nombre: '',
    descripcion: '',
  }
};

onMounted(() => {
  listArea();
});
</script>

<style scoped lang="sass">

</style>
