<!--<template>-->
<!--  <div class="row">-->
<!--    <div class="col-6 row flex flex-center">-->
<!--      <q-card class="col-7" flat>-->
<!--&lt;!&ndash;        <q-tabs v-model="activeTab" class="text-grey-9" dense>&ndash;&gt;-->
<!--&lt;!&ndash;          <q-tab name="login" label="Login" />&ndash;&gt;-->
<!--&lt;!&ndash;          <q-tab name="signup" label="Sign Up" />&ndash;&gt;-->
<!--&lt;!&ndash;        </q-tabs>&ndash;&gt;-->
<!--        <q-tab-panels v-model="activeTab" animated-->
<!--                      swipeable-->
<!--                      transition-prev="jump-left"-->
<!--                      transition-next="jump-right">-->
<!--          <q-tab-panel name="login" style="min-height: 80vh">-->
<!--            <q-card-section class="q-mb-lg">-->
<!--              <div class="text-weight-bold text-h4 text-grey-9">Login</div>-->
<!--              <div class="text-weight-medium text-grey-6 q-mt-lg">Ingresa al sistema de RRHH con tus credenciales!</div>-->
<!--            </q-card-section>-->
<!--            <q-card-section>-->
<!--              <q-form greedy ref="refForm">-->
<!--                <div class="row q-col-gutter-y-lg q-col-gutter-x-md">-->
<!--                  <div class="col-12">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Username</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignIn.usuario"-->
<!--                      placeholder="ejemplo_usuario123"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                        (v) => {-->
<!--                          return !!v || 'El campo es obligatorio'-->
<!--                        }-->
<!--                      ]"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Password</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignIn.password"-->
<!--                      placeholder="Min. 8 caracteres"-->
<!--                      :type="isPasswordVisible ? 'text' : 'password'"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                        (v) => {-->
<!--                          return !!v || 'El campo es obligatorio'-->
<!--                        },-->
<!--                      ]"-->
<!--                    >-->
<!--                      <template v-slot:append>-->
<!--                        <q-icon-->
<!--                          :name="isPasswordVisible ? 'visibility_off' : 'visibility'"-->
<!--                          class="cursor-pointer"-->
<!--                          @click="isPasswordVisible = !isPasswordVisible"-->
<!--                        />-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-12 row justify-between flex-center">-->
<!--                    <div class="col-5">-->
<!--                      <q-checkbox :model-value="true">-->
<!--                        <div class="text-weight-medium text-grey-8">Recordarme</div>-->
<!--                      </q-checkbox>-->
<!--                    </div>-->
<!--                    <div class="col-7 text-right">-->
<!--                      <div class="text-weight-medium text-deep-purple-5">Olvidaste tu contrasena?</div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <MyButton-->
<!--                      :label="'Login'"-->
<!--                      :color="'primary'"-->
<!--                      :text-color="'white'"-->
<!--                      @click="validateLogin"-->
<!--                    >-->

<!--                    </MyButton>-->
<!--                  </div>-->
<!--                  <div class="col-12 flex">-->
<!--                    <div class="text-weight-medium text-grey-9 q-mr-xs">No tienes una cuenta?</div>-->
<!--                    <div class="text-weight-medium text-deep-purple-5 cursor-pointer" @click="switchToSignUp">Crea una ahora</div>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </q-form>-->
<!--            </q-card-section>-->
<!--          </q-tab-panel>-->
<!--          <q-tab-panel name="signup" style="min-height: 80vh">-->
<!--            <q-card-section class="q-mb-lg">-->
<!--              <div class="text-weight-bold text-h4 text-grey-9">Sign Up</div>-->
<!--              <div class="text-weight-medium text-grey-6 q-mt-lg">-->
<!--                Crea una cuenta para acceder al sistema de RRHH.-->
<!--              </div>-->
<!--            </q-card-section>-->
<!--            <q-card-section>-->
<!--              <q-form greedy ref="refFormSignUp">-->
<!--                <div class="row q-col-gutter-y-lg q-col-gutter-x-md">-->
<!--                  <div class="col-12">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Usuario</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignUp.usuario"-->
<!--                      placeholder="ejemplo_usuario123"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                        (v) => {-->
<!--                          return !!v || 'El campo es obligatorio'-->
<!--                        }-->
<!--                      ]"-->
<!--                      @blur="checkUsuarioExists"-->
<!--                      :loading="loadingCheckUsuario"-->
<!--                      :error="usuarioExisteError"-->
<!--                    >-->

<!--                      <template v-if="usuarioExisteError" #error>-->
<!--                        Ese usuario ya existe!-->
<!--                      </template>-->
<!--                      <template v-slot:append>-->
<!--                        <q-icon-->
<!--                          v-if="!usuarioExisteError && usuarioSignUp.usuario.trim().length > 0 && !loadingCheckUsuario"-->
<!--                          :name="'check_circle'"-->
<!--                          color="positive"-->
<!--                          class="cursor-pointer"-->
<!--                          @click="isPasswordVisible = !isPasswordVisible"-->
<!--                        >-->
<!--                          <q-tooltip-->
<!--                          >Usuario disponible</q-tooltip>-->
<!--                        </q-icon>-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-6">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Nombres</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignUp.nombres"-->
<!--                      placeholder="John"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                    (v) => {-->
<!--                      return !!v || 'El campo es obligatorio'-->
<!--                    }-->
<!--                  ]"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col-6">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Apellidos</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignUp.apellidos"-->
<!--                      placeholder="Doe"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                    (v) => {-->
<!--                      return !!v || 'El campo es obligatorio'-->
<!--                    }-->
<!--                  ]"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Email</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignUp.email"-->
<!--                      placeholder="email@example.uss"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                    (v) => {-->
<!--                      return !!v || 'El campo es obligatorio'-->
<!--                    }-->
<!--                  ]"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <div class="text-weight-bold text-grey-8 q-mb-sm">Password</div>-->
<!--                    <q-input-->
<!--                      v-model="usuarioSignUp.password"-->
<!--                      placeholder="Min. 8 caracteres"-->
<!--                      :type="isPasswordVisible ? 'text' : 'password'"-->
<!--                      outlined-->
<!--                      dense-->
<!--                      hide-bottom-space-->
<!--                      no-error-icon-->
<!--                      :rules="[-->
<!--                        (v) => {-->
<!--                          return !!v || 'El campo es obligatorio'-->
<!--                        },-->
<!--                      ]"-->
<!--                    >-->
<!--                      <template v-slot:append>-->
<!--                        <q-icon-->
<!--                          :name="isPasswordVisible ? 'visibility_off' : 'visibility'"-->
<!--                          class="cursor-pointer"-->
<!--                          @click="isPasswordVisible = !isPasswordVisible"-->
<!--                        />-->
<!--                      </template>-->
<!--                    </q-input>-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <MyButton :label="'Sign Up'" :color="'primary'" :text-color="'white'" @click="validateSignUp" />-->
<!--                  </div>-->
<!--                  <div class="col-12 flex">-->
<!--                    <div class="text-weight-medium text-grey-9 q-mr-xs">¿Ya tienes una cuenta?</div>-->
<!--                    <div class="text-weight-medium text-deep-purple-5 cursor-pointer" @click="switchToLogin">-->
<!--                      Inicia sesión-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->

<!--              </q-form>-->
<!--            </q-card-section>-->
<!--          </q-tab-panel>-->
<!--        </q-tab-panels>-->

<!--      </q-card>-->
<!--    </div>-->
<!--    <div class="col-6 bg-deep-purple-9" style="height: 100vh">-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted } from 'vue';-->
<!--import axios from 'axios'-->
<!--import { useRouter } from 'vue-router';-->
<!--const router = useRouter();-->
<!--import MyButton from '../../../components/MyButton.vue'-->
<!--import { useAlert } from '../../../composables/useAlert';-->

<!--const { alert } = useAlert();-->

<!--import {-->
<!--  Loading,-->

<!--  // optional!, for example below-->
<!--  // with custom spinner-->
<!--  QSpinnerGears-->
<!--} from 'quasar'-->

<!--import laptopImg from '@/assets/software.png';-->
<!--import { UsuarioSignIn } from '../interface/UsuarioSignIn';-->
<!--import { UsuarioSignUp } from '../interface/UsuarioSignUp';-->

<!--import { useUsuarioStore } from '../../../stores/usuarioStore';-->

<!--const usuarioStore = useUsuarioStore();-->

<!--const refForm = ref(null);-->
<!--const refFormSignUp = ref(null);-->
<!--const activeTab = ref<string>('login'); // Controla la pestaña activa-->

<!--const usuarioSignIn = ref<UsuarioSignIn>({-->
<!--  usuario: '',-->
<!--  password: '',-->
<!--});-->

<!--const loadingCheckUsuario = ref(false);-->

<!--const usuarioSignUp = ref<UsuarioSignUp>({-->
<!--  usuario: '',-->
<!--  email: '',-->
<!--  nombres: '',-->
<!--  apellidos: '',-->
<!--  password: '',-->
<!--  passwordConfirm: '',-->
<!--});-->

<!--const cleanSignIn = () => {-->
<!--  usuarioSignIn.value = {-->
<!--    usuario: '',-->
<!--    password: '',-->
<!--  }-->
<!--};-->

<!--const cleanSignUp = () => {-->
<!--  usuarioSignUp.value = {-->
<!--    usuario: '',-->
<!--    email: '',-->
<!--    nombres: '',-->
<!--    apellidos: '',-->
<!--    password: '',-->
<!--    passwordConfirm: '',-->
<!--  }-->
<!--};-->

<!--const isPasswordVisible = ref<boolean>(false);-->

<!--// const username = ref<string>('');-->
<!--// const password = ref<string>('');-->

<!--const switchToSignUp = () => {-->
<!--  activeTab.value = 'signup';-->
<!--};-->

<!--// Cambia a la pestaña de login-->
<!--const switchToLogin = () => {-->
<!--  activeTab.value = 'login';-->
<!--};-->

<!--const login = async () => {-->
<!--  try {-->
<!--    Loading.show();-->
<!--    const response = await axios.post('http://localhost:8000/api/login', {-->
<!--      usuario: usuarioSignIn.value.usuario,-->
<!--      password: usuarioSignIn.value.password,-->
<!--    });-->


<!--    const { access_token } = response.data.token.original;-->
<!--    const usuario = response.data.usuario;-->
<!--    const email = response.data.email;-->
<!--    localStorage.setItem('token', access_token);-->
<!--    usuarioStore.setUsuario({ usuario, email });-->

<!--    await router.push('/');-->
<!--  } catch (e) {-->
<!--    console.log('error: ', e);-->
<!--    alert({-->
<!--      type: 'error',-->
<!--      title: 'Algo salio mal!',-->
<!--      msg: e.response.data.error,-->
<!--    });-->
<!--  } finally {-->
<!--    Loading.hide();-->
<!--  }-->
<!--};-->

<!--const signUp = async () => {-->
<!--  try {-->

<!--    Loading.show();-->
<!--    cleanSignIn();-->
<!--    const response = await axios.post('http://localhost:8000/api/register', {-->
<!--      usuario: usuarioSignUp.value.usuario,-->
<!--      email: usuarioSignUp.value.email,-->
<!--      nombres: usuarioSignUp.value.nombres,-->
<!--      apellidos: usuarioSignUp.value.apellidos,-->
<!--      password: usuarioSignUp.value.password,-->
<!--    });-->

<!--    activeTab.value = 'login';-->
<!--    console.log(response);-->
<!--    alert({-->
<!--      type: 'success',-->
<!--      title: 'Genial!',-->
<!--      msg: response.data.message,-->
<!--    });-->
<!--    cleanSignUp();-->
<!--  } catch (e: any) {-->
<!--    console.log('error: ', e);-->
<!--    alert({-->
<!--      type: 'error',-->
<!--      title: 'Algo salio mal!',-->
<!--      msg: e.response.data.error,-->
<!--    });-->
<!--  } finally {-->
<!--    Loading.hide();-->
<!--  }-->
<!--};-->

<!--const usuarioExisteError = ref(false);-->

<!--const checkUsuarioExists = async () => {-->
<!--  usuarioExisteError.value = false;-->
<!--  const username = usuarioSignUp.value.usuario;-->
<!--  if(username.trim().length == 0){-->
<!--    return;-->
<!--  }-->
<!--  try {-->
<!--    loadingCheckUsuario.value = true;-->

<!--    const response: any = await axios.get('http://localhost:8000/api/usuario-exists?' + 'usuario=' + username);-->

<!--    if(response.data.ok) {-->
<!--      return;-->
<!--    }-->
<!--    else {-->
<!--      usuarioExisteError.value = true;-->
<!--      alert({-->
<!--        type: 'error',-->
<!--        title: 'Ups!',-->
<!--        msg: response.data.warning,-->
<!--      });-->
<!--    }-->
<!--  } catch (e: any) {-->
<!--    alert({-->
<!--      type: 'error',-->
<!--      title: 'Algo salio mal!',-->
<!--      msg: e.response.data.error,-->
<!--    });-->
<!--  } finally {-->
<!--    loadingCheckUsuario.value = false;-->
<!--  }-->
<!--}-->

<!--const validateLogin = async () => {-->
<!--  if(refForm.value) {-->
<!--    await refForm.value.validate().then(async (success: any) => {-->
<!--      if (success) {-->
<!--        await login();-->
<!--      }-->
<!--    });-->
<!--  }-->
<!--};-->

<!--const validateSignUp = async () => {-->
<!--  if(refFormSignUp.value) {-->
<!--    await refFormSignUp.value.validate().then(async (success: any) => {-->
<!--      if (success && !usuarioExisteError.value && !loadingCheckUsuario.value) {-->
<!--        await signUp();-->
<!--      }-->
<!--    });-->
<!--  }-->
<!--};-->

<!--onMounted(() => {-->
<!--  // Loading.show()-->
<!--});-->
<!--</script>-->

<!--<style scoped lang="sass">-->

<!--</style>-->
<template>
  <q-form greedy ref="refForm">
    <q-input
      v-model="usuario.usuario"
      :rules="[
        v => !!v || 'El campo es obligatorio'
      ]"
    />
    <q-input
      v-model="usuario.password"
      type="password"
      :rules="[
        v => !!v || 'El campo es obligatorio'
      ]"
    />
    <q-btn
      label="Iniciar Sesion"
      color="primary"
      @click="validateSignIn"
    />
  </q-form>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import axios from 'axios';
import { UsuarioSignIn as Usuario } from 'pages/login/interface/UsuarioSignIn';
import { Dialog, Loading, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useUsuarioStore } from '../../../stores/usuarioStore';

const usuarioStore = useUsuarioStore();
const router = useRouter();
const $q = useQuasar();

const usuario = ref<Usuario>(null);
const refForm = ref<any>(null);

const validateSignIn = async () => {
  if (refForm.value) {
    await refForm.value.validate().then(async (success: any) => {
      if (success) await login();
    });
  }
};

const login = async () => {
  try {
    Loading.show();

    const response = await axios.post('http://localhost:8000/api/login', {
      usuario: usuario.value.usuario,
      password: usuario.value.password,
    });

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('usuario', response.data.usuario);
    localStorage.setItem('email', response.data.email);

    // console.log(response)

    // const usuario = response.data.usuario;
    // const email = response.data.email;

    // usuarioStore.setUsuario({ usuario, email });

    await router.push('/');
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

const cleanUsuario = (): Usuario => {
  return {
    usuario: '',
    password: ''
  }
}

onBeforeMount(() => {
  usuario.value = cleanUsuario();
});
</script>
