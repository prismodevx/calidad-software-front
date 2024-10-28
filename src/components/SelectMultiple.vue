<template>
  <q-select
    dense
    options-dense
    v-model="model"
    :options="optionsFiltered"
    map-options
    multiple
    no-error-icon
    hide-bottom-space
    @blur="clearInputSearch"
  >
    <template #before-options>
      <q-item>
        <q-item-section side>
          <q-icon clickable @click="toggleAll" size="1.3rem" :name="getIcon(all)" class="cursor-pointer"/>
        </q-item-section>
        <q-item-section>
          <q-input
            autofocus
            dense
            borderless
            placeholder="Buscar"
            class=" sticky-search"
            hide-bottom-space
            v-model="inputSearch"
          >
          </q-input>
        </q-item-section>
      </q-item>
      <q-separator/>
    </template>
    <template v-slot:option="scope">
      <q-item clickable @click="toggleOption(scope)">
        <q-item-section side>
          <q-icon size="1.3rem" :name="getIcon(scope.opt.state)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
    <template #no-option>
      <q-item>
        <q-item-section side>
          <q-icon clickable @click="toggleAll" size="1.3rem" :name="getIcon(all)" class="cursor-pointer"/>
        </q-item-section>
        <q-item-section>
          <q-input
            autofocus
            dense
            borderless
            placeholder="Buscar"
            class=" sticky-search"
            hide-bottom-space
            v-model="inputSearch"
          >
          </q-input>
        </q-item-section>
      </q-item>
      <q-separator/>
      <q-item>
        <q-item-section class="text-grey">
          Ningún resultado
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:selected-item="{ index }">
      <template v-if="all === true">
        <span v-if="index === 0">TODOS</span>
      </template>
      <template v-else>
          <span v-if="index === 0" class="truncate-text">
            {{ model.map((option: any) => option.label).join(', ') }}
          </span>
      </template>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

/****************************************************************************/
/*                             PROPS                                        */
/****************************************************************************/
const props = defineProps({
  modelValue: {
    type: Object,
    default: null,
  },
  options: {
    type: Array,
    default: () => [],
  },
});

/****************************************************************************/
/*                             EMITS                                        */
/****************************************************************************/
const emits = defineEmits(['update:modelValue']);

/****************************************************************************/
/*                              DATA                                        */
/****************************************************************************/
const model = ref<any>(props.modelValue);
const inputSearch = ref<string>('');

/****************************************************************************/
/*                              COMPUTED                                    */
/****************************************************************************/
// opciones filtradas en base al props.options
// importante, aqui se realiza la busqueda segun el input del usuario
// a su vez, se mapea un atributo "state", utilizado para manejar los estados
// de cada opcion del componente
const optionsFiltered = computed(() => {
  const search = inputSearch.value.trim().toLowerCase();
  return props.options
    .map((opt: any) => ({ ...opt, state: model.value.some((item: any) => item.value === opt.value) }))
    .filter((opt: any) => opt.label.trim().toLowerCase().includes(search));
});

// booleano de TODOS, utilizado para la seleccion de todas las opciones de golpe
// el null indica que no todas las opciones estan seleccionadas
const all = computed(() => {
  if (model.value.length === 0)
    return false;
  if (model.value.length === props.options.length)
    return true;
  return null;
});

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
// limpiar el input de busqueda
const clearInputSearch = () => {
  inputSearch.value = '';
};

// retornar el icono segun el estado de la opcion
const getIcon = (state: any) => {
  if (state === null)
    return 'indeterminate_check_box';
  return state ? 'check_box' : 'check_box_outline_blank';
};

// check/uncheck todas las opciones de golpe
const toggleAll = () => {
  model.value = all.value === true ? [] : [...props.options];
};

// check/uncheck opcion por separado
const toggleOption = (scope: any) => {
  scope.opt.state = !scope.opt.state;
  const optionIndex = model.value.findIndex((opt: any) => opt.value === scope.opt.value);

  scope.opt.state
    ? optionIndex === -1 && model.value.push(scope.opt)
    : optionIndex !== -1 && model.value.splice(optionIndex, 1);
};

/****************************************************************************/
/*                             WATCHERS                                     */
/****************************************************************************/
watch(() => props.modelValue, (value) => {
  model.value = value;
}, { immediate: true });

watch(model, (newVal) => {
  emits('update:modelValue', newVal);
});

</script>

<style scoped lang="sass">
.sticky-search
  position: sticky
  top: 0
  background-color: white
  z-index: 1
  padding-top: 0
  padding-bottom: 0

.truncate-text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
</style>
