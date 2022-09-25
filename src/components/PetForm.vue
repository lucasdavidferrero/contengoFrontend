<template>
  <div>
    <div class="q-pa-lg relative-position">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="qFormRef"
      >
      <div class="text-h6 q-ma-none">Formulario Mascota</div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.name"
            label="Nombre *"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-select v-model="form.specie"
            :options="specieOptions"
            label="Especie *"
            :rules="[fRules.required]" lazy-rules/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.breed"
            label="Raza *"
            :rules="[fRules.required]" lazy-rules
            />
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model.number="form.weightKg"
            label="Peso *"
            hint="Peso en Kilogramos."
            :rules="[fRules.requiredNum, fRules.positiveNumber]" lazy-rules
            />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-select v-model="form.sex"
            :options="sexOptions"
            label="Sexo *"
            :rules="[fRules.required]" lazy-rules/>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.birthDate"
            mask="date"
            label="Fecha nacimiento *"
            :rules="[fRules.required, 'date']" lazy-rules/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.admitionDate"
            mask="date"
            label="Fecha admisión *"
            :rules="[fRules.required, 'date']" lazy-rules/>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-select v-model="form.admitionKind"
            :options="admitionKindOptions"
            label="Tipo de admisión *"
            :rules="[fRules.required]" lazy-rules/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-12">
          <q-input
            v-model="form.admitionCondition"
            label="Condición admisión"/>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.idMicrochip"
            label="ID Microchip"/>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            v-model="form.idInternal"
            label="ID Interno"/>
        </div>
      </div>

      <div v-if="pet">
        <q-checkbox
          left-label
          v-model="form.isAdopted"
          label="Adoptado?"
        />
      </div>

      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-xs-12 col-md-12">
          <q-input
            v-model="form.notes"
            label="Notas adicionales"
            autogrow
          />
        </div>
      </div>

      <div class="row justify-center">
        <q-btn label="Cancelar" type="button" color="primary" flat class="q-ml-sm" @click="onAbort"/>
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
  </div>
</template>

<script lang="ts">
import { Pet } from 'src/entities/Pet'
import { defineComponent, PropType, reactive, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'
import { PetService } from 'src/services/PetService'
const petService = new PetService()
export default defineComponent({
  emits: ['completedUpdate', 'completedCreation', 'aborted'],
  name: 'PetForm',
  props: {
    pet: {
      type: Object as PropType<Pet> | PropType<null>,
      default: null
    }
  },
  setup (props, { emit }) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const form = reactive({
      name: '',
      specie: null as any,
      breed: '',
      weightKg: 0,
      sex: null as any,
      birthDate: '',
      admitionDate: '',
      admitionKind: '' as any,
      admitionCondition: '',
      isAdopted: false,
      notes: '',
      idMicrochip: '',
      idInternal: ''
    })

    const isLoading = ref(false)

    const fRules = {
      required,
      positiveNumber,
      requiredNum
    }

    const $q = useQuasar()

    const qFormRef = ref(null)

    const specieOptions = [{ label: 'Perro', value: 'perro' }, { label: 'Gato', value: 'gato' }, { label: 'Otro', value: 'otro' }]
    const sexOptions = [{ label: 'Macho', value: 'macho' }, { label: 'Hembra', value: 'hembra' }, { label: 'Otro', value: 'otro' }]
    const admitionKindOptions = [
      { label: 'Perdido', value: 'perdido' },
      { label: 'Abandonado', value: 'abandonado' },
      { label: 'Maltrato', value: 'maltrato' },
      { label: 'Recién nacido', value: 'recienNacido' },
      { label: 'Dueño entrega', value: 'duenioEntrega' },
      { label: 'Otro', value: 'otro' }
    ]

    async function onSubmit () {
      // TODO Ver como solucionar la estructura de la fecha (debe ser 2022-05-23 y no 2022/05/23).
      const pet = new Pet(0, form.idMicrochip || '', form.idInternal || '', form.name, form.sex, form.breed, form.specie.value,
        form.weightKg, form.admitionKind.value, form.admitionCondition, form.admitionDate.split('/').join('-'), form.birthDate.split('/').join('-'),
        form.notes || '', form.isAdopted)
      try {
        isLoading.value = true
        if (!props.pet) {
          // crear
          const res = await petService.createNew(pet)
          $q.notify({
            type: 'positive',
            message: `Mascota "${form.name}" creada exitosamente`
          })
          pet.id = res.id
          pet.createdAt = new Date(res.createdAt * 1000).toString()
          emit('completedCreation', pet)
        } else {
          // actualizar
          pet.id = props.pet.id
          await petService.update(pet)
          $q.notify({
            type: 'positive',
            message: `Mascota "${form.name}" actualizada correctamente`
          })
          emit('completedUpdate', pet)
        }
      } catch (e) {
        console.error(e)
      } finally {
        isLoading.value = false
      }
    }

    function onAbort () {
      emit('aborted')
    }

    onMounted(() => {
      if (props.pet) {
        form.name = props.pet.name
        form.specie = props.pet.specie
        form.breed = props.pet.breed
        form.weightKg = props.pet.weightKg
        form.sex = props.pet.sex
        form.birthDate = props.pet.birthDate
        form.admitionDate = props.pet.admitionDate
        form.admitionKind = props.pet.admitionKind
        form.admitionCondition = props.pet.admitionCondition
        form.isAdopted = props.pet.isAdopted
        form.notes = props.pet.notes
        form.idMicrochip = props.pet.idMicrochip
        form.idInternal = props.pet.idInternal
      }
    })

    return {
      form,
      fRules,
      qFormRef,
      isLoading,
      specieOptions,
      sexOptions,
      admitionKindOptions,
      onSubmit,
      onAbort
    }
  }
})
</script>
