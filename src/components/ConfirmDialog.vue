<template>
  <div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="question_mark" color="primary" text-color="white" />
          <span class="q-ml-sm">{{ title ? title : '¿Estás seguro?' }}</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup @click="onCancelled"/>
          <q-btn flat label="Confirmar" color="primary" v-close-popup @click="onConfirm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  emits: ['confirmed', 'cancelled'],
  name: 'ConfirmDialog',
  props: {
    title: {
      type: String,
      default: null
    }
  },
  setup (_, { emit }) {
    const confirm = ref(false)

    const onConfirm = () => emit('confirmed')
    const onCancelled = () => emit('cancelled')

    return {
      onConfirm,
      onCancelled,
      confirm
    }
  }
})
</script>
