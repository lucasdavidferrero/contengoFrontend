<template>
  <div>
    <q-dialog v-model="dialog" persistent>
      <q-card style="min-width: 1200px; max-width: 80vw;">
        <q-card-section>

          <q-form
              class="q-gutter-md"
              ref="qFormDetailRef"
            >
            <div class="row items-center q-col-gutter-md q-pa-md">
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model="formState.description"
                  label="Descripcion" autogrow autofocus
                  :rules="[fRules.required]"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  v-model.number="formState.quantity"
                  min="1"
                  type="number"
                  label="Cantidad" :rules="[fRules.requiredNum, fRules.positiveNumber]"/>
              </div>
              <div class="col-xs-12 col-md-6">
                <q-input
                  prefix="$"
                  v-model.number="formState.unitPrice"
                  min="1"
                  :rules="[fRules.requiredNum, fRules.positiveNumber]"
                  label="P.Unitario"/>
              </div>
              <div class="col-xs-12 col-md-6">
                Importe: ${{ finalPriceComputed }}
              </div>
            </div>
          </q-form>
        </q-card-section>
        <q-card-actions align="center" class="q-mt-md">
          <q-btn flat label="Cancelar" color="primary" @click="onCancelled"/>
          <q-btn label="Añadir" color="primary" @click="onSubmit"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script lang="ts">
import { QForm } from 'quasar'
import { defineComponent, ref, reactive, watch, Ref, computed } from 'vue'
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'
import { MedicalEvent } from 'src/models/MedicalEvent'
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
      quantity: 1,
      unitPrice: 0,
      finalPrice: 0
    })

    const fRules = {
      required,
      positiveNumber,
      requiredNum
    }

    async function onSubmit () {
      try {
        const isFormValid = await qFormDetailRef.value.validate(true)
        const auxDetail: MedicalEvent.rowDetail = {
          description: formState.description,
          quantity: formState.quantity,
          unitPrice: formState.unitPrice,
          finalPrice: calculateFinalPrice()
        }
        if (isFormValid) {
          closeDialog()
          emit('added', auxDetail)
        }
      } catch (e) { console.error(e) }
    }

    function onCancelled () {
      closeDialog()
      emit('cancelled')
    }

    const finalPriceComputed = computed(() => {
      return calculateFinalPrice()
    })

    watch(() => props.opened, (newVal) => {
      dialog.value = newVal
    })

    function closeDialog () {
      qFormDetailRef.value.reset()
      resetFormState()
    }

    function resetFormState () {
      formState.description = ''
      formState.quantity = 1
      formState.unitPrice = 0
      formState.finalPrice = 0
    }

    function calculateFinalPrice () {
      return formState.quantity * formState.unitPrice
    }

    return {
      formState,
      dialog,
      fRules,
      finalPriceComputed,
      onCancelled,
      onSubmit,
      qFormDetailRef
    }
  }
})
</script>
