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
      <q-item dense clickable @click="all">
        <q-item-section side>
          <q-icon size="1.3rem" :name="getState(todosTemp)" />
        </q-item-section>
        <q-item-section>TODOS</q-item-section>
      </q-item>
    </template>
    <template v-slot:option="scope">
      <q-item dense clickable @click="toggleOption(scope)">
        <q-item-section side>
          <q-icon size="1.3rem" :name="getState(scope.opt.state)" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
/****************************************************************************/
/*                             PROPS                                        */
/****************************************************************************/
const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  options: {
    type: Array,
    default: () => []
  }
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

const todos = ref<boolean>(false);
/****************************************************************************/
/*                              COMPUTED                                    */
/****************************************************************************/
const optionsFiltered = computed(() => {
  const search = inputSearch.value.trim().toLowerCase();
  return props.options.filter((opt: any) => opt.label.trim().toLowerCase().includes(search));
});

const todosTemp = computed(() => {
  if (model.value.length === 0) return false;
  if (model.value.length === props.options.length) return true;
  return null;
});
/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const clearInputSearch = () => {
  inputSearch.value = '';
};

const getState = (state: any) => {
  if(state === null) return 'indeterminate_check_box';
  return state ? 'check_box' : 'check_box_outline_blank';
};

const all = () => {
  todos.value = !todos.value;

    if(todos.value) {
    model.value = [...props.options];
  }
  else {
    model.value = [];
  }
};

const toggleOption = (scope: any) => {
  const optionIndex = model.value.findIndex((opt: any) => opt.value === scope.opt.value);
  scope.opt.state = !scope.opt.state;

  if (scope.opt.state) {
    // Añade la opción si no está ya en la lista
    if (optionIndex === -1) {
      model.value.push(scope.opt);
    }
  } else {
    // Elimina la opción usando su índice
    if (optionIndex !== -1) {
      model.value.splice(optionIndex, 1);
    }
  }
};
/****************************************************************************/
/*                             WATCHERS                                     */
/****************************************************************************/
watch(() => props.modelValue, (newVal) => {
  newVal.map((e: any) => ({ state: true, ...e }))
  model.value = newVal;
  console.log(newVal);
}, { immediate: true });

watch(model, (newVal) => {
  emits('update:modelValue', newVal);
});

// watch(todos, (newVal) => {
//   if(newVal) {
//     model.value = [...props.options];
//   }
//   else {
//     model.value = [];
//   }
// });

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
