<template>
  <q-page class="q-pa-xl">
    <div>
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
        <tr v-for="h in headers" :key="h.idHeader">
          <td class="text-left">[Boton]</td>
          <td class="text-left">{{ h.idMascota }}</td>
          <td class="text-left">{{ h.vetName }}</td>
          <td class="text-left">{{ h.observations }}</td>
          <td class="text-left">[Botones]</td>
        </tr>
      </tbody>
    </q-markup-table>
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
    onMounted(async () => {
      const data = await eventoMedicoService.getAllHeaders()
      console.log(data)
      headers.value = data
    })

    return { headers }
  }
})
</script>
