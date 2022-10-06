<template>
  <div>
    <div class="q-pa-lg relative-position">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
        ref="qFormRef"
      >
      <div class="text-h6 q-ma-none">Formulario Mascota - {{ !pet ? 'Agregar' : 'Actualizar' }}</div>
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
        <q-btn label="Cancelar" type="button" color="primary" flat class="q-mr-sm" @click="onAbort"/>
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
import { required, positiveNumber, requiredNum } from 'src/utils/Rules'
import { PetService } from 'src/services/PetService'
import { showNotify } from 'src/plugins/globalNotify'
import { AdmitionKindEnum, SexEnum, SpeciesEnum } from 'src/models/Enums'

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
      specie: '',
      breed: '',
      weightKg: 0,
      sex: '',
      birthDate: '',
      admitionDate: '',
      admitionKind: '',
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

    const qFormRef = ref(null)

    const specieOptions = Object.values(SpeciesEnum)
    const sexOptions = Object.values(SexEnum)
    const admitionKindOptions = Object.values(AdmitionKindEnum)

    async function onSubmit () {
      // TODO Ver como solucionar la estructura de la fecha (debe ser 2022-05-23).
      const pet = new Pet(0, form.idMicrochip || '', form.idInternal || '', form.name, form.sex, form.breed, form.specie,
        form.weightKg, form.admitionKind, form.admitionCondition, form.admitionDate.split('/').join('-'), form.birthDate.split('/').join('-'),
        form.notes || '', form.isAdopted)
      try {
        isLoading.value = true
        if (!props.pet) {
          // crear
          const res = await petService.createNew(pet)
          showNotify(`Mascota "${form.name}" creada exitosamente`)
          pet.id = res.id
          pet.createdAt = new Date(res.createdAt * 1000).toString()
          emit('completedCreation', pet)
        } else {
          // actualizar
          pet.id = props.pet.id
          await petService.update(pet)
          showNotify(`Mascota "${form.name}" actualizada correctamente`)
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
