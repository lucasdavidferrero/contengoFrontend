<template>
  <q-page class="q-pa-xl">
    <div>
      <PetForm></PetForm>
    </div>
    <div>
      <q-table
      :rows="pets"
      title="Mascotas"
      :columns="columnConf"
      row-key="id"
      :loading="isFetchingList"
      separator="cell" :pagination="{ rowsPerPage: 30 }">

      <template #body-cell-expand="props">
        <q-td :props="props">
          <q-btn flat round dense icon="add" @click="openExpandDialog(props.row)"></q-btn>
        </q-td>
      </template>

      <!-- Acciones -->
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round dense icon="edit"></q-btn>
          <q-btn flat round dense icon="delete"></q-btn>
        </q-td>
      </template>
    </q-table>
    </div>

    <!-- Expand Dialog -->
    <div>
      <q-dialog
      v-model="expandDialog" @hide="onExpandDialogHide">
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Más info de {{selectedExpandedPet?.name}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <p>ID: {{selectedExpandedPet?.id}}</p>
          <p>Fecha creado: {{selectedExpandedPet?.createdAt}}</p>
          <p>Sexo: {{selectedExpandedPet?.sex}}</p>
          <p>Peso (KG): {{selectedExpandedPet?.weightKg}}</p>
          <p>Año nacimiento: {{selectedExpandedPet?.birthDate}}</p>
          <div>Notas: {{selectedExpandedPet?.notes}}</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { PetService } from 'src/services/PetService'
import { PetData } from 'src/components/models'
import PetForm from 'src/components/PetForm.vue'
const petService = new PetService()

export default defineComponent({
  name: 'IndexPage',
  components: { PetForm },
  setup () {
    const isFetchingList = ref(false)
    const expandDialog = ref(false)
    const selectedExpandedPet = ref() as Ref<PetData | null>
    const pets = ref([]) as Ref<PetData[]>

    function getPetById (id: number) : PetData | null {
      const i = pets.value.findIndex(p => p.id === id)
      if (i !== -1) return pets.value[i]
      return null
    }

    async function getPets () {
      try {
        isFetchingList.value = true
        const petsFound = await petService.getAll()
        pets.value = petsFound
      } catch (e) {
        console.error(e)
      } finally {
        isFetchingList.value = false
      }
    }

    /* Expand Dialog START */
    function openExpandDialog (row: any) {
      const petId = row.id as number
      const pet = getPetById(petId)
      if (pet) {
        selectedExpandedPet.value = pet
        expandDialog.value = true
      }
    }

    function onExpandDialogHide () {
      selectedExpandedPet.value = null
    }
    /* Expand Dialog END */

    onMounted(async () => {
      await getPets()
    })

    return {
      pets,
      isFetchingList,
      columnConf,
      expandDialog,
      selectedExpandedPet,
      openExpandDialog,
      onExpandDialogHide
    }
  }
})

const columnConf = [
  {
    name: 'expand',
    label: 'Ver más',
    align: 'center'
  },
  {
    name: 'name',
    label: 'Nombre',
    field: 'name',
    align: 'left',
    sortable: true
  },
  {
    name: 'specie',
    label: 'Especie',
    field: 'specie',
    align: 'left'
  },
  {
    name: 'isAdopted',
    label: 'Adoptado',
    field: (row: any) => row.isAdopted ? 'Sí' : 'No',
    align: 'left'
  },
  {
    name: 'admitionKind',
    label: 'Tipo admisión',
    field: 'admitionKind',
    align: 'left'
  },
  {
    name: 'admitionCondition',
    label: 'Condición admisión',
    field: 'admitionCondition',
    align: 'left'
  },
  {
    name: 'admitionDate',
    label: 'Fecha admisión',
    field: 'admitionDate',
    align: 'left',
    sortable: true
  },
  {
    name: 'breed',
    label: 'Raza',
    field: 'breed',
    align: 'left'
  },
  {
    name: 'idInternal',
    label: 'ID interno',
    field: (row: any) => row.idInternal || '-',
    align: 'left',
    sortable: true
  },
  {
    name: 'idMicrochip',
    label: 'ID Microchip',
    field: (row: any) => row.idMicrochip || '-',
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center'
  }
]
</script>
