<!--<template>-->
<!--  <q-page>-->
<!--    <div class="flex justify-end items-center" style="border: 2px solid red">-->
<!--      <q-btn-->
<!--        no-caps-->
<!--        unelevated-->
<!--        class="with-label"-->
<!--        style="border-radius: 6px"-->
<!--        label="Nuevo"-->
<!--        icon="add"-->
<!--        color="primary"-->
<!--        text-color="white"-->
<!--        @click="openDialog"-->
<!--      />-->
<!--    </div>-->
<!--    <q-dialog v-model="dialog" persistent>-->
<!--      <q-card class="q-py-sm" style="width: 500px; max-width: 90vw; border-radius: 6px">-->
<!--        <q-card-section class="q-px-lg q-py-sm flex-center row justify-between">-->
<!--          <div class="text-weight-bold text-h6 text-grey-9">-->
<!--            Nuevo Rol-->
<!--          </div>-->
<!--          <q-btn-->
<!--            no-caps-->
<!--            unelevated-->
<!--            class=""-->
<!--            style="border-radius: 6px"-->
<!--            round-->
<!--            icon="close"-->
<!--            color="white"-->
<!--            size="md"-->
<!--            text-color="black"-->
<!--            @click="closeDialog"-->
<!--          />-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-px-lg q-py-md">-->
<!--          <q-form greedy ref="refForm">-->
<!--            <div class="row q-col-gutter-y-md q-col-gutter-x-md">-->
<!--              <div class="col-12">-->
<!--                <div class="text-grey-7 q-mb-xs">Nombre</div>-->
<!--                <q-input-->
<!--                  outlined-->
<!--                  v-model="rol.nombre"-->
<!--                  dense-->
<!--                  hide-bottom-space-->
<!--                  no-error-icon-->
<!--                  :rules="[-->
<!--                    (v) => {-->
<!--                      return !!v || 'El campo es obligatorio'-->
<!--                    }-->
<!--                  ]"-->
<!--                />-->
<!--              </div>-->
<!--              <div class="col-12">-->
<!--                <div class="text-grey-7 q-mb-xs">Detalle</div>-->
<!--                <q-input-->
<!--                  v-model="rol.detalle"-->
<!--                  outlined-->
<!--                  dense-->
<!--                  type="textarea"-->
<!--                />-->
<!--              </div>-->
<!--            </div>-->
<!--          </q-form>-->
<!--        </q-card-section>-->
<!--        <q-card-section class="q-px-lg q-py-sm flex justify-end">-->
<!--          <div style="display: flex; gap: 20px;">-->
<!--            <q-btn-->
<!--              no-caps-->
<!--              unelevated-->
<!--              class="with-label"-->
<!--              style="border-radius: 6px"-->
<!--              label="Cancelar"-->
<!--              color="white"-->
<!--              text-color="black"-->
<!--              @click="closeDialog"-->
<!--            />-->
<!--            <q-btn-->
<!--              no-caps-->
<!--              unelevated-->
<!--              class="with-label"-->
<!--              style="border-radius: 6px"-->
<!--              label="Guardar"-->
<!--              color="primary"-->
<!--              text-color="white"-->
<!--              @click="validateSave"-->
<!--            />-->
<!--          </div>-->
<!--        </q-card-section>-->
<!--      </q-card>-->
<!--    </q-dialog>-->
<!--  </q-page>-->
<!--</template>-->
<!--<script setup lang="ts">-->
<!--import { ref } from 'vue'-->
<!--import { Rol } from '../interface/Rol';-->
<!--import axios from 'axios'-->
<!--import { useAlert } from '../../../composables/useAlert';-->

<!--const { alert } = useAlert();-->

<!--const rol = ref<Rol>({-->
<!--  id: 0,-->
<!--  nombre: '',-->
<!--  detalle: ''-->
<!--});-->

<!--const refForm = ref(null);-->
<!--const dialog = ref(false);-->

<!--const save = async () => {-->
<!--  try {-->
<!--    const data = {-->
<!--      id: rol.value.id,-->
<!--      nombre: rol.value.nombre,-->
<!--      detalle: rol.value.detalle-->
<!--    }-->

<!--    const token = localStorage.getItem('token');-->
<!--    const response: any = await axios.post('http://localhost:8000/api/roles', data, {-->
<!--      headers: {-->
<!--        Authorization: `Bearer ${token}`,-->
<!--      },-->
<!--    })-->

<!--    console.log(response.data);-->
<!--    if(response.data.ok) {-->
<!--      alert({-->
<!--        type: 'success',-->
<!--        title: 'Listo!',-->
<!--        msg: 'El registro se ha creado satisfactoriamente'-->
<!--      });-->
<!--    }-->

<!--  } catch (e: any) {-->
<!--    console.log(e);-->
<!--  }-->
<!--};-->

<!--const validateSave = async () => {-->
<!--  if(refForm.value) {-->
<!--    await refForm.value.validate().then(async (success: any) => {-->
<!--      if (success) {-->
<!--        await save();-->
<!--      }-->
<!--    });-->
<!--  }-->
<!--};-->

<!--const openDialog = () => {-->
<!--  dialog.value = true;-->
<!--};-->

<!--const closeDialog = () => {-->
<!--  dialog.value = false;-->
<!--};-->

<!--const cleanFieldsRol = () => {-->
<!--  rol.value.id = 0;-->
<!--  rol.value.nombre = '';-->
<!--  rol.value.detalle = '';-->
<!--};-->

<!--</script>-->

<!--<style scoped>-->
<!--.with-label >>> .q-icon {-->
<!--  font-size: 20px;-->
<!--  padding: 0;-->
<!--  margin: 0 8px 0 0;-->
<!--}-->
<!--</style>-->


<template>
  <q-page>
    <q-btn
      label="Nuevo"
      @click="openDialog(rol)"
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
          Nuevo rol
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="rol.nombre"
            label="Nombre"
          />
          <q-input
            v-model="rol.detalle"
            label="Detalle"
            type="textarea"
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
import axios from 'axios';
import { Rol } from '../interface/Rol';
import { Dialog, Loading, useQuasar } from 'quasar';
const $q = useQuasar();


const dialog = ref<boolean>(false);
const rol = ref<Rol>({
  id: 0,
  nombre: '',
  detalle: ''
});
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
    label: 'DETALLE',
    name: 'detalle',
    field: 'detalle',
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

const listRol = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    rows.value = response.data.data;
  } catch (e: any) {
    console.log(e);
  }
};

const cleanRol = (): Rol => {
  return {
    id: 0,
    nombre: '',
    detalle: ''
  }
};

const tableBtnEdit = (item: any) => {
  openDialog(item);
};

const tableBtnDelete = (item: any) => {
  $q.dialog({
    title: 'Aviso',
    message: 'Estas seguro de eliminar este registro?',
    cancel: true,
  }).onOk(() => {
    del(item.id);
  }).onCancel(() => {
    console.log('cancelandoooo')
  });
};

const openDialog = (item: any) => {
  if (item.id === 0) {
    dialog.value = true;
    return;
  }

  rol.value = {
    id: item.id,
    nombre: item.nombre,
    detalle: item.detalle
  };

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  rol.value = cleanRol();
};

const save = async () => {
  try {
    Loading.show();
    const token = localStorage.getItem('token');

    const data = {
      id: rol.value.id,
      nombre: rol.value.nombre,
      detalle: rol.value.detalle
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let response: any;

    //creacion
    if (rol.value.id === 0) {
      response = await axios.post('http://localhost:8000/api/roles', data, config);
    }
    // edicion
    response = await axios.put(`http://localhost:8000/api/roles/${rol.value.id}`, data, config);

    closeDialog();
    Loading.hide();

    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listRol();
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

    const response = await axios.delete(`http://localhost:8000/api/roles/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    Loading.hide();
    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listRol();
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

onBeforeMount(() => {
  rol.value = cleanRol();
});

onMounted(() => {
  listRol();
});
</script>
