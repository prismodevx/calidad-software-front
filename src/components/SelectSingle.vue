<template>
  <q-select
    class="col-12"
    dense
    options-dense
    v-model="model"
    :options="optionsFiltered"
    map-options
    no-error-icon
    hide-bottom-space
    @blur="clearInputSearch"
    menu-anchor="bottom left"
    menu-self="top left"
    menu-class="custom-menu-width"
  >
    <template #before-options>
      <q-input
        autofocus
        dense
        borderless
        placeholder="Buscar"
        class="q-px-sm sticky-search"
        hide-bottom-space
        v-model="inputSearch"
      >
        <template #prepend>
          <q-icon name="search" size="xs" />
        </template>
      </q-input>
      <q-separator/>
    </template>
    <template #no-option>
      <q-input
        autofocus
        dense
        borderless
        placeholder="Buscar"
        class="q-px-sm"
        hide-bottom-space
        v-model="inputSearch"
      >
        <template #prepend>
          <q-icon name="search" size="xs" />
        </template>
      </q-input>
      <q-separator/>
      <q-item>
        <q-item-section class="text-grey">
          Ningun resultado
        </q-item-section>
      </q-item>
    </template>
    <template v-slot:selected>
      <span
        :class="model?.value != 0 ? 'truncate-text' : 'text-grey-5'"
      >
        {{ model?.label }}
      </span>
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
/****************************************************************************/
/*                              COMPUTED                                    */
/****************************************************************************/
const optionsFiltered = computed(() => {
  const search = inputSearch.value.trim().toLowerCase();
  return props.options.filter((opt: any) => opt.label.trim().toLowerCase().includes(search));
});

/****************************************************************************/
/*                             METHODS                                      */
/****************************************************************************/
const clearInputSearch = () => {
  inputSearch.value = '';
};

/****************************************************************************/
/*                             WATCHERS                                     */
/****************************************************************************/
watch(() => props.modelValue,(newVal) => {
  model.value = newVal;
});

watch(model, (newVal) => {
  emits('update:modelValue', newVal);
});
</script>

<style scoped lang="sass">
.truncate-text
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  max-width: 100%

.sticky-search
  position: sticky
  top: 0
  background-color: white
  z-index: 1
  padding-top: 0
  padding-bottom: 0
</style>
