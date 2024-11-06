<template>
  <q-page>
    <div class="flex justify-end items-center" style="border: 2px solid red">
      <q-btn
        no-caps
        unelevated
        class="with-label"
        style="border-radius: 6px"
        label="Nuevo"
        icon="add"
        color="primary"
        text-color="white"
        @click="openDialog"
      />
    </div>
    <q-dialog v-model="dialog" persistent>
      <q-card class="q-py-sm" style="width: 500px; max-width: 90vw; border-radius: 6px">
        <q-card-section class="q-px-lg q-py-sm flex-center row justify-between">
          <div class="text-weight-bold text-h6 text-grey-9">
            Nuevo Rol
          </div>
          <q-btn
            no-caps
            unelevated
            class=""
            style="border-radius: 6px"
            round
            icon="close"
            color="white"
            size="md"
            text-color="black"
            @click="closeDialog"
          />
        </q-card-section>
        <q-card-section class="q-px-lg q-py-md">
          <q-form greedy ref="refForm">
            <div class="row q-col-gutter-y-md q-col-gutter-x-md">
              <div class="col-12">
                <div class="text-grey-7 q-mb-xs">Nombre</div>
                <q-input
                  outlined
                  v-model="rol.nombre"
                  dense
                  hide-bottom-space
                  no-error-icon
                  :rules="[
                    (v) => {
                      return !!v || 'El campo es obligatorio'
                    }
                  ]"
                />
              </div>
              <div class="col-12">
                <div class="text-grey-7 q-mb-xs">Detalle</div>
                <q-input
                  v-model="rol.detalle"
                  outlined
                  dense
                  type="textarea"
                />
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section class="q-px-lg q-py-sm flex justify-end">
          <div style="display: flex; gap: 20px;">
            <q-btn
              no-caps
              unelevated
              class="with-label"
              style="border-radius: 6px"
              label="Cancelar"
              color="white"
              text-color="black"
              @click="closeDialog"
            />
            <q-btn
              no-caps
              unelevated
              class="with-label"
              style="border-radius: 6px"
              label="Guardar"
              color="primary"
              text-color="white"
              @click="validateSave"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Rol } from '../interface/Rol';
import axios from 'axios'
import { useAlert } from '../../../composables/useAlert';

const { alert } = useAlert();

const rol = ref<Rol>({
  id: 0,
  nombre: '',
  detalle: ''
});

const refForm = ref(null);
const dialog = ref(false);

const save = async () => {
  try {
    const data = {
      id: rol.value.id,
      nombre: rol.value.nombre,
      detalle: rol.value.detalle
    }

    const token = localStorage.getItem('token');
    const response: any = await axios.post('http://localhost:8000/api/roles', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    console.log(response.data);
    if(response.data.ok) {
      alert({
        type: 'success',
        title: 'Listo!',
        msg: 'El registro se ha creado satisfactoriamente'
      });
    }

  } catch (e: any) {
    console.log(e);
  }
};

const validateSave = async () => {
  if(refForm.value) {
    await refForm.value.validate().then(async (success: any) => {
      if (success) {
        await save();
      }
    });
  }
};

const openDialog = () => {
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const cleanFieldsRol = () => {
  rol.value.id = 0;
  rol.value.nombre = '';
  rol.value.detalle = '';
};

</script>

<style scoped>
.with-label >>> .q-icon {
  font-size: 20px;
  padding: 0;
  margin: 0 8px 0 0;
}
</style>
