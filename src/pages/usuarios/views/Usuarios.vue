<template>
  <q-page>
    <q-btn
      label="Nuevo"
      @click="openDialog(usuario)"
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
          Nuevo Usuario
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="usuario.usuario"
            label="Usuario"
            :rules="[
              (v) => {
                return !!v || 'El campo es obligatorio'
              },
              (v) => /^[a-zA-Z0-9_]+$/.test(v) || 'Solo se permiten letras, números y guiones bajos, sin espacios'
            ]"
          />
          <q-input
            v-model="usuario.password"
            label="Password"
            type="password"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
              (v) => (v && v.length >= 8) || 'La contraseña debe tener al menos 8 caracteres'
            ]"
          />
          <q-input
            v-model="usuario.email"
            label="Email"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
              (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'El formato del correo no es válido'
            ]"
          />
          <q-select
            v-model="usuario.objRol"
            label="Rol"
            :options="optionsAllRol"
            :rules="[
              (v) => !!v || 'El campo es obligatorio',
            ]"
          >

          </q-select>
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
import { Usuario } from '../interface/Usuario';
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
    label: 'USUARIO',
    name: 'usuario',
    field: 'usuario',
    align: 'center',
  },
  {
    label: 'EMAIL',
    name: 'email',
    field: 'email',
    align: 'center',
  },
  {
    label: 'ROL',
    name: 'rol',
    field: 'rol',
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

const usuario = ref<Usuario>({
  id: 0,
  usuario: '',
  email: '',
  password: '',
  objRol: null
});

const listUsuario = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/usuarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    rows.value = response.data.data;
  } catch (e: any) {
    console.log(e);
  }
};

const listComboRol = async () => {
  try {
    const token = localStorage.getItem('token');

    const response: any = await axios.get('http://localhost:8000/api/roles', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    optionsAllRol.value = response.data.data.map((e: any) => ({
      value: e.id,
      label: e.nombre + ' - ' + e.detalle
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
      id: usuario.value.id,
      usuario: usuario.value.usuario,
      password: usuario.value.password,
      email: usuario.value.email,
      idRol: usuario.value.objRol?.value,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    let response: any;

    //creacion
    if (usuario.value.id === 0) {
      response = await axios.post('http://localhost:8000/api/usuarios', data, config);
    }
    else {
      response = await axios.put(`http://localhost:8000/api/usuarios/${usuario.value.id}`, data, config);
    }
    // edicion


    closeDialog();
    Loading.hide();

    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listUsuario();
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

    const response = await axios.delete(`http://localhost:8000/api/usuarios/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    Loading.hide();
    $q.dialog({
      title: 'Listo!',
      message: response.data.message,
    });
    await listUsuario();
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
    message: 'Estas seguro de eliminar este registro?',
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

  usuario.value = {
    id: item.id,
    usuario: item.usuario,
    email: item.email,
    password: '',
    objRol: optionsAllRol.value.find((e: any) => e.value == item.idRol)
  };

  // await getRol();

  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  usuario.value = {
    id: 0,
    usuario: '',
    email: '',
    password: '',
    objRol: null
  }
};

onMounted(() => {
  listUsuario();
  listComboRol();
});
</script>

<style scoped lang="sass">

</style>
