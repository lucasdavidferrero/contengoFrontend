<template>
  <q-page class="q-pa-xl">
    <div>
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
            <tr v-for="(h) in headers" :key="h.idHeader">
              <td class="text-left">
                <q-btn flat round dense icon="add" @click="onShowDetail(h.idHeader)"></q-btn>
              </td>
              <td class="text-left">{{ h.idMascota }}</td>
              <td class="text-left">{{ h.vetName }}</td>
              <td class="text-left">{{ h.observations }}</td>
              <td class="text-left">[Botones]</td>
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
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { EventoMedicoService } from 'src/services/EventoMedicoService'
import { MedicalEvent } from 'src/models/MedicalEvent'

const eventoMedicoService = new EventoMedicoService()
export default defineComponent({
  name: 'MedicalEventsListPage',
  setup () {
    const headers = ref([]) as Ref<MedicalEvent.tableHeaderDetail[]>
    const isTableLoading = ref(false)

    async function onShowDetail (idHeader: number) {
      try {
        isTableLoading.value = true
        const rowDetail = await eventoMedicoService.getDetailByHeaderId(idHeader)
        debugger
        const iHeader = headers.value.findIndex(x => x.idHeader === idHeader)
        headers.value[iHeader].rows = rowDetail
      } catch (e) {
        console.error(e)
      } finally {
        isTableLoading.value = false
      }
    }

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

    return { headers, isTableLoading, onShowDetail }
  }
})
</script>
