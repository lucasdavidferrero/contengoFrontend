<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="question_mark" color="primary" text-color="white" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup @click="onCancelled"/>
          <q-btn flat label="Añadir" color="primary" v-close-popup @click="onAdd"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  emits: ['cancelled', 'added'],
  name: 'DetailDialogForm',
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const dialog = ref(false)

    function onCancelled () {
      emit('cancelled')
    }

    function onAdd () {
      emit('added')
    }

    watch(() => props.opened, (newVal) => {
      dialog.value = newVal
    })

    return {
      onCancelled,
      onAdd,
      dialog
    }
  }
})
</script>
