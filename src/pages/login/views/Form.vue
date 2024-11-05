<template>
  <div class="row">
    <div class="col-6 row flex flex-center">
      <q-card class="col-5" flat>
        <q-card-section class="q-mb-lg">
          <div class="text-weight-bold text-h4 text-grey-9">Login</div>
          <div class="text-weight-medium text-grey-6 q-mt-lg">Ingresa al sistema de RRHH con tus credenciales!</div>
        </q-card-section>
        <q-card-section>
          <q-form greedy ref="refForm">
            <div class="row q-col-gutter-y-lg q-col-gutter-x-md">
              <div class="col-12">
                <div class="text-weight-bold text-grey-8 q-mb-sm">Username</div>
                <q-input
                  v-model="username"
                  placeholder="ejemplo_usuario123"
                  outlined
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
                <div class="text-weight-bold text-grey-8 q-mb-sm">Password</div>
                <q-input
                  v-model="password"
                  placeholder="Min. 8 caracteres"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  outlined
                  dense
                  hide-bottom-space
                  no-error-icon
                  :rules="[
                    (v) => {
                      return !!v || 'El campo es obligatorio'
                    },
                  ]"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPasswordVisible = !isPasswordVisible"
                    />
                  </template>
                </q-input>
              </div>
              <div class="col-12 row justify-between flex-center">
                <div class="col-6">
                  <q-checkbox :model-value="true">
                    <div class="text-weight-medium text-grey-8">Recordarme</div>
                  </q-checkbox>
                </div>
                <div class="col-6">
                  <div class="text-weight-medium text-deep-purple-5">Olvidaste tu contrasena?</div>
                </div>
              </div>
              <div class="col-12">
                <MyButton
                  :label="'Login'"
                  :color="'primary'"
                  :text-color="'white'"
                  @click="validateLogin"
                >

                </MyButton>
              </div>
              <div class="col-12 flex">
                <div class="text-weight-medium text-grey-9 q-mr-xs">No tienes una cuenta?</div>
                <div class="text-weight-medium text-deep-purple-5">Crea una ahora</div>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-6 bg-deep-purple-9" style="height: 100vh">
<!--      <q-img-->
<!--        :src="laptopImg"-->
<!--        style="width: 120px"-->
<!--      >-->
<!--      </q-img>-->

    </div>
  </div>
<!--  <div class="row flex-center align-items-center bg-grey-5" style="height: 100vh;">-->
<!--    <q-card flat square class="col-xs-12 col-sm-6 col-md-3 col-lg-2">-->
<!--      <q-card-section class="bg-primary">-->
<!--        <div class="text-h6 text-white">GEST RRHH</div>-->
<!--      </q-card-section>-->
<!--      <q-card-section class="q-px-none q-py-sm">-->
<!--        <q-form autofocus greedy ref="refForm">-->
<!--          <div class="row q-px-lg q-py-xl q-col-gutter-lg">-->
<!--            <div class="col-12">-->
<!--              <q-input-->
<!--                v-model="username"-->
<!--                dense-->
<!--                outlined-->
<!--                placeholder="Escribe tu nombre de usuario"-->
<!--                type="text"-->
<!--                :rules="[-->
<!--                  (v: any) => !!v || 'Nombre de usuario requerido',-->
<!--                ]"-->
<!--                no-error-icon-->
<!--                hide-bottom-space-->
<!--              >-->
<!--                <template v-slot:prepend>-->
<!--                  <q-icon name="person" />-->
<!--                </template>-->
<!--              </q-input>-->
<!--            </div>-->

<!--            <div class="col-12">-->
<!--              <q-input-->
<!--                v-model="password"-->
<!--                dense-->
<!--                outlined-->
<!--                placeholder="Escribe tu contrasena"-->
<!--                :type="isPasswordVisible ? 'text' : 'password'"-->
<!--                class="q-pa-none"-->
<!--                :rules="[-->
<!--                  (v: any) => !!v || 'Password requerida',-->
<!--                ]"-->
<!--                no-error-icon-->
<!--                hide-bottom-space-->
<!--              >-->
<!--                <template v-slot:prepend>-->
<!--                  <q-icon name="lock" />-->
<!--                </template>-->
<!--                <template v-slot:append>-->
<!--                  <q-btn-->
<!--                    unelevated-->
<!--                    :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"-->
<!--                    size="md"-->
<!--                    flat-->
<!--                    class="q-px-sm"-->
<!--                    @click="isPasswordVisible = !isPasswordVisible"-->
<!--                  >-->

<!--                  </q-btn>-->
<!--                </template>-->
<!--              </q-input>-->
<!--            </div>-->
<!--            <div class="col-12">-->
<!--              <q-btn-->
<!--                no-caps-->
<!--                unelevated-->
<!--                class="bg-secondary text-white"-->
<!--                label="Iniciar sesion"-->
<!--                style="width: 100%"-->
<!--                :loading="btnIsLoading"-->
<!--                @click="login"-->
<!--              >-->

<!--              </q-btn>-->
<!--            </div>-->
<!--          </div>-->
<!--        </q-form>-->
<!--      </q-card-section>-->
<!--    </q-card>-->
<!--  </div>-->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();
import MyButton from '../../../components/MyButton.vue'
import { useAlert } from '../../../composables/useAlert';

const { alert } = useAlert();

import {
  Loading,

  // optional!, for example below
  // with custom spinner
  QSpinnerGears
} from 'quasar'

import laptopImg from '@/assets/software.png';

const refForm = ref(null);



const isPasswordVisible = ref<boolean>(false);

const username = ref<string>('');
const password = ref<string>('');

const btnIsLoading = ref<boolean>(false);

const login = async () => {
  try {
    Loading.show();
    // btnIsLoading.value = true;
    const response = await axios.post('http://localhost:8000/api/login', {
      usuario: username.value,
      password: password.value,
    });


    const { access_token } = response.data;
    //
    localStorage.setItem('token', access_token);

    await router.push('/');
  } catch (e) {
    console.log('error: ', e);
    alert({
      type: 'error',
      title: 'Algo salio mal!',
      msg: e.response.data.error,
    });
  } finally {
    // btnIsLoading.value = false;
    Loading.hide();
  }
};

const validateLogin = async () => {
  if(refForm.value) {
    await refForm.value.validate().then(async (success: any) => {
      if (success) {
        await login();
      }
    });
  }
};

onMounted(() => {
  // Loading.show()
});
</script>

<style scoped lang="sass">

</style>
