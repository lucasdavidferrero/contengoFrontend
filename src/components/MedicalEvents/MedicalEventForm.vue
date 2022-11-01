<template>
  <div class="q-card q-pa-md">
    <div class="q-pa-lg relative-position">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="qFormRef"
      >
      <div class="text-h6 q-ma-none">Formulario Evento Médico</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.idMascota"
            label="ID Mascota *"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <!-- <div class="col-xs-12 col-md-6">
          <q-input v-model="form.headerDate" mask="date" :rules="['date']" label="Fecha">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="form.headerDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div> -->
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <!--<div class="col-xs-12 col-md-6">
          <q-input v-model="form.headerTime" mask="time" :rules="['time']" label="Hora">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="form.headerTime" format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="OK" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div> -->

        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.vetName"
            label="Veterinario"/>
        </div>
      </div>

      <section class="q-ml-none">
        <div>
          <q-markup-table flat bordered>
            <thead>
              <tr>
                <th colspan="5">
                  <div class="row no-wrap items-center">
                    <q-btn round type="button" color="primary" icon="add" @click="openDetailDialogForm" outline/>
                    <h2 class="text-h6 q-ma-none q-ml-md">Detalle</h2>
                  </div>
                </th>
              </tr>
              <tr>
                <th class="text-left">Descripción</th>
                <th class="text-right">Cantidad</th>
                <th class="text-right">P.Unitario</th>
                <th class="text-right">Importe</th>
                <th class="text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-grey-3">
              <tr v-for="(detail, i) in details" :key="detail.description">
                <td class="text-left">{{ detail.description }}</td>
                <td class="text-right">{{ detail.quantity }}</td>
                <td class="text-right">{{ detail.unitPrice }}</td>
                <td class="text-right">{{ detail.finalPrice }}</td>
                <td class="text-center">
                  <q-btn color="accent" icon="delete" @click="onDeleteRow(i)" outline round />
                </td>
              </tr>
            </tbody>
            <tfoot class="q-pa-md" colspan="5">
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td class="text-right text-weight-bold text-accent text-h5">Total ${{ total }}</td>
              </tr>
            </tfoot>
          </q-markup-table>
        </div>
      </section>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-12">
          <q-input
            v-model="form.observations"
            label="Observaciones" autogrow
          />
        </div>
      </div>

      <div class="row justify-center">
        <q-btn label="Cancelar" type="button" color="primary" flat class="q-mr-sm"/>
        <q-btn label="Guardar" type="submit" color="primary"/>
      </div>

      </q-form>
      <q-inner-loading
        :showing="isLoading"
        label="Cargando..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </div>
    <div>
      <DetailDialogForm @added="onDetailDialogAdded" @cancelled="onDetailDialogCancelled" :opened="detailDialog"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, Ref, computed } from 'vue'
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'
import DetailDialogForm from './DetailDialogForm.vue'
import { MedicalEvent } from 'src/models/MedicalEvent'
import { EventoMedicoService } from 'src/services/EventoMedicoService'
import { showNotify } from 'src/plugins/globalNotify'
import { QForm } from 'quasar'
const eventoMedicoService = new EventoMedicoService()

export default defineComponent({
  name: 'MedicalEventForm',
  components: { DetailDialogForm },
  setup () {
    const form = reactive({
      idMascota: '',
      // headerDate: '',
      // headerTime: '',
      vetName: '',
      observations: ''
    })

    const details = ref([]) as Ref<MedicalEvent.rowDetail[]>

    const detailDialog = ref(false)

    const isLoading = ref(false)

    const qFormRef = ref(null) as Ref<QForm | null>

    const onSubmit = async () => {
      if (!details.value.length) { return }
      const data = buildRequestObject()
      try {
        isLoading.value = true
        const id = await eventoMedicoService.create(data)
        showNotify(`Evento médico creado correctamente. ID: ${id}`)
        resetForm()
        qFormRef.value?.reset()
      } catch (e) {
        console.error(e)
      } finally {
        isLoading.value = false
      }
    }

    function buildRequestObject () {
      const createUpdateReq = {
        idMascota: form.idMascota,
        // headerDate: form.headerDate,
        // headerTime: form.headerTime,
        vetName: form.vetName,
        observations: form.observations,
        rows: [] as MedicalEvent.rowDetail[]
      }

      if (details.value.length) {
        details.value.forEach((e) => {
          createUpdateReq.rows.push({
            description: e.description,
            quantity: e.quantity,
            unitPrice: e.unitPrice,
            finalPrice: e.finalPrice
          })
        })
        console.log(createUpdateReq.rows)
      }
      return createUpdateReq
    }

    function resetForm () {
      form.idMascota = ''
      form.vetName = ''
      form.observations = ''
      details.value = []
    }

    const fRules = {
      required,
      positiveNumber,
      requiredNum
    }

    function onDetailDialogAdded (rowDetail: MedicalEvent.rowDetail) {
      closeDialog()
      details.value.push(rowDetail)
    }

    function onDetailDialogCancelled () {
      closeDialog()
    }

    function openDetailDialogForm () {
      detailDialog.value = true
    }

    function closeDialog () {
      detailDialog.value = false
    }

    function onDeleteRow (rowIndex: number) {
      details.value.splice(rowIndex, 1)
    }

    const total = computed(() => {
      let accTotal = 0
      details.value.forEach((e) => {
        accTotal += e.finalPrice
      })
      return accTotal
    })

    return {
      qFormRef,
      form,
      fRules,
      detailDialog,
      details,
      total,
      isLoading,
      onDetailDialogCancelled,
      onDetailDialogAdded,
      openDetailDialogForm,
      onSubmit,
      onDeleteRow
    }
  }
})
</script>

<style lang="scss"></style>
