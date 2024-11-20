<template>
  <q-page>

    <q-input
      v-model="searchTerm"
      label="Buscar Trabajador"
      outlined
      dense
      debounce="0"
      class="q-mb-md"
    />
    <q-btn
      label="Nuevo"
      @click="openDialog(trabajador)"
      color="primary"
    >

    </q-btn>
    <q-table
      :columns="columns"
      :rows="filteredRows"
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
          Nuevo Trabajador
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="trabajador.nombres"
            label="Nombres"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-input
            v-model="trabajador.apellidos"
            label="Apellidos"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-input
            v-model="trabajador.email"
            label="Email"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
              (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'El formato del correo no es válido'
            ]"
          />
          <q-input
            v-model="trabajador.documentoIdentificacion"
            label="Documento de Identidad"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-select
            v-model="trabajador.objCargo"
            label="Cargo"
            :options="optionsAllCargo"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-input
            v-model="trabajador.telefono"
            label="Telefono"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-input
            v-model="trabajador.direccion"
            label="Direccion"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          />
          <q-input
            v-model="trabajador.sueldo"
            label="Sueldo"
            type="number"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
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
import { onBeforeMount, onMounted, ref, computed } from 'vue';
import axios, { get } from 'axios';
import { Trabajador } from '../interface/Trabajador';
import { Dialog, Loading, useQuasar } from 'quasar';
const $q = useQuasar();

const searchTerm = ref<string>('');
const optionsAllCargo = ref<Array<any>>([]);
const dialog = ref<boolean>(false);
const columns = ref<Array<any>>([
  {
    label: '#',
    name: 'id',
    field: 'id',
    align: 'center',
    sortable: true
  },
  {
    label: 'NOMBRE COMPLETO',
    name: 'nombresAll',
    field: 'nombresAll',
    align: 'center',
    sortable: true
  },
  {
    label: 'EMAIL',
    name: 'email',
    field: 'email',
    align: 'center',
    sortable: true
  },
  {
    label: 'DOCUMENTO',
    name: 'documento',
    field: 'documento',
    align: 'center',
    sortable: true
  },
  {
    label: 'CARGO',
    name: 'cargo',
    field: 'cargo',
    align: 'center',
    sortable: true
  },
  {
    label: 'TELEFONO',
    name: 'telefono',
    field: 'telefono',
    align: 'center',
    sortable: true
  },
  {
    label: 'DIRECCION',
    name: 'direccion',
    field: 'direccion',
    align: 'center',
    sortable: true
  },
  {
    label: 'SUELDO',
    name: 'sueldo',
    field: 'sueldo',
    align: 'center',
    sortable: true
  },
  {
    label: '...',
    name: 'actions',
    field: 'actions',
    align: 'center',
  }
]);

const rows = ref<Array<any>>([]);

const filteredRows = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return rows.value.filter((row) => {
    return (
      row.nombresAll.toLowerCase().includes(term) ||
      row.email.toLowerCase().includes(term) ||
      row.documento.toLowerCase().includes(term) ||
      row.cargo.toLowerCase().includes(term) ||
      row.telefono.toLowerCase().includes(term) ||
      row.direccion.toLowerCase().includes(term) ||
      row.sueldo.toString().includes(term)
    );
  });
});

const trabajador = ref<Trabajador>({
  id: 0,
  nombres: '',
  apellidos: '',
  email: '',
  documentoIdentificacion: '',
  telefono: '',
  direccion: '',
  sueldo: 0.00,
  objCargo: null,
});

const listTrabajador = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/trabajadores', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    rows.value = response.data.data;
  } catch (e: any) {
    console.log(e);
  }
};

const listComboCargo = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/cargos', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    optionsAllCargo.value = response.data.data.map((e: any) => ({
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
      id: trabajador.value.id,
      nombres: trabajador.value.nombres,
      apellidos: trabajador.value.apellidos,
      email: trabajador.value.email,
      documentoIdentificacion: trabajador.value.documentoIdentificacion,
      telefono: trabajador.value.telefono,
      direccion: trabajador.value.direccion,
      sueldo: trabajador.value.sueldo,
      idCargo: trabajador.value.objCargo.value,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let response: any;

    //creacion
    if (trabajador.value.id === 0) {
      response = await axios.post('http://localhost:8000/api/trabajadores', data, config);
    }
    else {
      response = await axios.put(`http://localhost:8000/api/trabajadores/${trabajador.value.id}`, data, config);
    }
    // edicion


    closeDialog();
    Loading.hide();

    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listTrabajador();
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

    const response = await axios.delete(`http://localhost:8000/api/trabajadores/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    Loading.hide();
    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listTrabajador();
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
    message: 'Estas seguro de eliminar este registro? esta accion no se puede deshacer',
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

  trabajador.value = {
    id: item.id,
    nombres: item.nombres,
    apellidos: item.apellidos,
    email: item.email,
    documentoIdentificacion: item.documento,
    telefono: item.telefono,
    direccion: item.direccion,
    sueldo: item.sueldo,
    objCargo: optionsAllCargo.value.find((e: any) => e.value === item.idCargo),
  };

  // await getRol();

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  trabajador.value = {
    id: 0,
    nombres: '',
    apellidos: '',
    email: '',
    documentoIdentificacion: '',
    telefono: '',
    direccion: '',
    sueldo: 0.00,
    objCargo: null,
  }
};

onMounted(() => {
  listTrabajador();
  listComboCargo();
});
</script>

<style scoped lang="sass">

</style>
