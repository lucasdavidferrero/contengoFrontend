<template>
  <q-page class="row items-center justify-evenly">
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
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { PetService } from 'src/services/PetService'
import { PetData } from 'src/components/models'
const petService = new PetService()

export default defineComponent({
  name: 'IndexPage',
  setup () {
    const isFetchingList = ref(false)
    const pets = ref([]) as Ref<PetData[]>

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

    function openExpandDialog (row: any) {
      const petId = row.id as number
      getPetById(petId)
    }

    function getPetById (id: number) : PetData | null {
      const i = pets.value.findIndex(p => p.id === id)
      if (i !== -1) return pets.value[i]
      return null
    }

    onMounted(async () => {
      await getPets()
    })

    return {
      pets,
      isFetchingList,
      columnConf,
      openExpandDialog
    }
  }
})

const columnConf = [
  {
    name: 'expand',
    label: 'Expandir',
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
