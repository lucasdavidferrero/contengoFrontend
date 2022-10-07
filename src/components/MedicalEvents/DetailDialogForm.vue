<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 1000px; max-width: 80vw;">
        <q-card-section>

          <q-form
              class="q-gutter-md"
              ref="qFormDetailRef"
            >
            <div class="row items-center q-col-gutter-md q-pa-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="formState.description"
                  label="Descripcion" autogrow/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="formState.quantity"
                  label="Cantidad"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="formState.unitPrice"
                  label="P.Unitario"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="formState.finalPrice"
                  label="Importe"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="center" class="q-mt-md">
          <q-btn flat label="Cancelar" color="primary" v-close-popup @click="onCancelled"/>
          <q-btn label="Añadir" color="primary" @click="onSubmit" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<!-- TODO
          [*] Agregar los fields
          [] Validaciones
          [] Emitir objeto al componente del form para que lo muestre en una tabla
        -->
<script lang="ts">
import { QForm } from 'quasar'
import { defineComponent, ref, reactive, watch, Ref } from 'vue'
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
    const qFormDetailRef = ref() as Ref<QForm>
    const formState = reactive({
      description: '',
      quantity: 0,
      unitPrice: 0,
      finalPrice: 0
    })

    async function onSubmit () {
      console.log(formState)
      try {
        const isFormValid = await qFormDetailRef.value.validate(true)
        if (isFormValid) emit('added')
      } catch (e) { console.error(e) }
    }

    function onCancelled () {
      emit('cancelled')
    }

    watch(() => props.opened, (newVal) => {
      dialog.value = newVal
    })

    return {
      formState,
      dialog,
      onCancelled,
      onSubmit,
      qFormDetailRef
    }
  }
})
</script>
