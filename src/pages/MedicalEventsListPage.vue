<template>
  <q-page class="q-pa-xl">
    <div>
      <div>
        <q-dialog persistent full-width ref="QDialogEdit">
          <q-card>
            <q-card-section>
              Editar Evento Médico
            </q-card-section>

            <q-card-section class="q-pt-none">
              <MedicalEventForm @cancelled="handleEditCancel" @successfully="onSuccessfullyEdit" :selected-medical-event="selectedMedicalEvent"/>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>
      <div class="relative-position">
        <q-markup-table flat bordered>
          <thead>
            <tr>
              <th colspan="5">
                <div class="row no-wrap items-center">
                  <h2 class="text-h6 q-ma-none">Listado de Eventos Médicos</h2>
                </div>
              </th>
            </tr>
            <tr>
              <th class="text-left">Ver Detalle</th>
              <th class="text-left">ID Mascota</th>
              <th class="text-left">Veterinario</th>
              <th class="text-left">Observaciones</th>
              <th class="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(h, index) in headers" :key="h.idHeader">
              <td class="text-left">
                <q-btn flat round dense icon="add" @click="onShowDetail(h.idHeader)"></q-btn>
              </td>
              <td class="text-left">{{ h.idMascota }}</td>
              <td class="text-left">{{ h.vetName }}</td>
              <td class="text-left">{{ h.observations }}</td>
              <td class="text-left">
                <q-btn flat round dense icon="edit" @click="onEditRow(index)"></q-btn>
                <q-btn flat round dense icon="delete" @click="onDeleteRow(index)"></q-btn>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
        <q-inner-loading
          :showing="isTableLoading"
          label="Cargando..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </div>

      <div>
        <q-dialog
        v-model="expandDetailDialog" @hide="onDetailDialogHide">
          <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
              <div class="text-h6">Detalle</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-markup-table flat>
                <thead>
                  <tr>
                    <th class="text-left">Descripción</th>
                    <th class="text-left">Cantidad</th>
                    <th class="text-left">Precio unitario</th>
                    <th class="text-left">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="h in selectedDetail" :key="h.description">
                    <td class="text-left">{{ h.description }}</td>
                    <td class="text-left">{{ h.quantity }}</td>
                    <td class="text-left">{{ h.unitPrice }}</td>
                    <td class="text-left">{{ h.unitPrice * h.quantity }}</td>
                  </tr>
                </tbody>
                <tfoot class="q-pa-md" colspan="5">
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right text-weight-bold text-accent text-h5">Total ${{ totalSelectedDetail }}</td>
                  </tr>
                </tfoot>
              </q-markup-table>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
              <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, Ref } from 'vue'
import { EventoMedicoService } from 'src/services/EventoMedicoService'
import { MedicalEvent } from 'src/models/MedicalEvent'
import MedicalEventForm from 'src/components/MedicalEvents/MedicalEventForm.vue'
import { QDialog } from 'quasar'

const eventoMedicoService = new EventoMedicoService()
export default defineComponent({
  name: 'MedicalEventsListPage',
  components: { MedicalEventForm },
  setup () {
    const headers = ref([]) as Ref<MedicalEvent.tableHeaderDetail[]>
    const isTableLoading = ref(false)
    const selectedDetail = ref([]) as Ref<MedicalEvent.detail[]>
    const expandDetailDialog = ref(false)

    async function onShowDetail (idHeader: number) {
      try {
        isTableLoading.value = true
        const rowDetail = await eventoMedicoService.getDetailByHeaderId(idHeader)
        const iHeader = headers.value.findIndex(x => x.idHeader === idHeader)
        headers.value[iHeader].rows = rowDetail
        selectedDetail.value = rowDetail || []
        expandDetailDialog.value = true
      } catch (e) {
        console.error(e)
      } finally {
        isTableLoading.value = false
      }
    }

    function onDetailDialogHide () {
      expandDetailDialog.value = false
      selectedDetail.value = []
    }

    const totalSelectedDetail = computed(() => {
      let acc = 0
      if (selectedDetail.value.length > 0) {
        selectedDetail.value.forEach((x) => {
          acc += x.unitPrice * x.quantity
        })
        return acc
      }
      return 0
    })

    onMounted(async () => {
      try {
        isTableLoading.value = true
        const data = await eventoMedicoService.getAllHeaders()
        headers.value = data
      } catch (e) {
        console.error(e)
      } finally {
        isTableLoading.value = false
      }
    })

    /*
      Editar Evento Médico
    */
    const selectedMedicalEvent = ref(null) as Ref<MedicalEvent.tableHeaderDetail | null>
    const QDialogEdit = ref(null) as Ref<QDialog | null>
    async function onEditRow (iHeader: number) {
      //  Buscar por índice.
      //  Buscar detalle en Backend
      //  Pasarlo como una prop.
      try {
        isTableLoading.value = true
        const rowDetail = await eventoMedicoService.getDetailByHeaderId(headers.value[iHeader].idHeader)
        headers.value[iHeader].rows = rowDetail || []
        selectedMedicalEvent.value = headers.value[iHeader]
        QDialogEdit.value?.show()
      } catch (e) {
        console.error(e)
      } finally {
        isTableLoading.value = false
      }
    }

    function onSuccessfullyEdit (newData: MedicalEvent.buildObjectType) {
      const iHeader = headers.value.findIndex(e => { return e.idHeader === newData.idHeader })
      headers.value[iHeader].idMascota = newData.idMascota
      headers.value[iHeader].vetName = newData.vetName
      headers.value[iHeader].observations = newData.observations
      resetEdit()
    }

    function onDeleteRow (iHeader: number) {
      console.log(iHeader)
      resetEdit()
    }

    function handleEditCancel () {
      resetEdit()
    }

    function resetEdit () {
      selectedMedicalEvent.value = null
      QDialogEdit.value?.hide()
    }

    return {
      headers,
      isTableLoading,
      selectedDetail,
      expandDetailDialog,
      totalSelectedDetail,
      selectedMedicalEvent,
      QDialogEdit,
      onDetailDialogHide,
      onShowDetail,
      onEditRow,
      onDeleteRow,
      handleEditCancel,
      onSuccessfullyEdit
    }
  }
})
</script>
