<template>
  <q-page>
    <q-btn
      label="Nuevo"
      @click="openDialog(cargo)"
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
          Nuevo Cargo
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="cargo.nombre"
            label="Nombre"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
              (v) => /^[a-zA-Z0-9 _-]+$/.test(v) || 'Solo se permiten letras, números, espacios, guiones y guiones bajos'
            ]"
            counter
            maxlength="50"
          />
          <q-input
            v-model="cargo.descripcion"
            label="Descripcion"
          />
          <q-input
            v-model="cargo.sueldoBase"
            label="Sueldo Base"
            type="number"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-select
            v-model="cargo.objArea"
            label="Area"
            :options="optionsAllArea"
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
import { Cargo } from '../interface/Cargo';
import { Dialog, Loading, useQuasar } from 'quasar';
const $q = useQuasar();

const optionsAllArea = ref<Array<any>>([]);
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
    label: 'SUELDO BASE',
    name: 'sueldoBase',
    field: 'sueldoBase',
    align: 'center',
  },
  {
    label: 'AREA',
    name: 'area',
    field: 'area',
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

const cargo = ref<Cargo>({
  id: 0,
  nombre: '',
  descripcion: '',
  sueldoBase: '',
  objArea: null,
});

const listCargo = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/cargos', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    rows.value = response.data.data;
  } catch (e: any) {
    console.log(e);
  }
};

const listComboArea = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/areas', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    optionsAllArea.value = response.data.data.map((e: any) => ({
      value: e.id,
      label: e.nombre + ' - ' + e.descripcion
    }));
  } catch (e: any) {
    console.log(e);
  }
};

const save = async () => {
  try {
    Loading.show();
    const token = localStorage.getItem('token');

    const data = {
      id: cargo.value.id,
      nombre: cargo.value.nombre,
      descripcion: cargo.value.descripcion,
      sueldoBase: cargo.value.sueldoBase,
      idArea: cargo.value.objArea.value,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let response: any;

    //creacion
    if (cargo.value.id === 0) {
      response = await axios.post('http://localhost:8000/api/cargos', data, config);
    }
    else {
      response = await axios.put(`http://localhost:8000/api/cargos/${cargo.value.id}`, data, config);
    }
    // edicion


    closeDialog();
    Loading.hide();

    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listCargo();
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

    const response = await axios.delete(`http://localhost:8000/api/cargos/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    Loading.hide();
    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listCargo();
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
    message: 'Estas seguro de eliminar este registro? Recuerda que pueden existir trabajadores asignados a esta cargo',
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

  cargo.value = {
    id: item.id,
    nombre: item.nombre,
    descripcion: item.descripcion,
    sueldoBase: item.sueldoBase,
    objArea: optionsAllArea.value.find((e: any) => e.value === item.idArea)
  };

  // await getRol();

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  cargo.value = {
    id: 0,
    nombre: '',
    descripcion: '',
    sueldoBase: '',
    objArea: null,
  }
};

onMounted(() => {
  listCargo();
  listComboArea();
});
</script>

<style scoped lang="sass">

</style>
