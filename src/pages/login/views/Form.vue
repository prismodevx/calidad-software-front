<template>
  <div class="row flex-center align-items-center bg-grey-5" style="height: 100vh;">
    <q-card flat square class="col-xs-12 col-sm-6 col-md-3 col-lg-2">
      <q-card-section class="bg-primary">
        <div class="text-h6 text-white">GEST RRHH</div>
      </q-card-section>
      <q-card-section class="q-px-none q-py-sm">
        <q-form autofocus greedy ref="refForm">
          <div class="row q-px-lg q-py-xl q-col-gutter-lg">
            <div class="col-12">
              <q-input
                dense
                outlined
                placeholder="Escribe tu nombre de usuario"
                type="text"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="password"
                dense
                outlined
                placeholder="Escribe tu contrasena"
                :type="isPasswordVisible ? 'text' : 'password'"
                class="q-pa-none"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-btn
                    unelevated
                    :icon="isPasswordVisible ? 'visibility_off' : 'visibility'"
                    size="md"
                    flat
                    class="q-px-sm"
                    @click="isPasswordVisible = !isPasswordVisible"
                  >

                  </q-btn>
                </template>
              </q-input>
            </div>
            <div class="col-12">
              <q-btn
                no-caps
                unelevated
                class="bg-secondary text-white"
                label="Iniciar sesion"
                style="width: 100%"
              >

              </q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isPasswordVisible = ref<boolean>(false);

const password = ref<string>('');



</script>

<style scoped lang="sass">

</style>
