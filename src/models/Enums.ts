const AdmitionKindEnum = {
  Perdido: 'Perdido',
  Abandonado: 'Abandonado',
  Maltrato: 'Maltrato',
  RecienNacido: 'Recien Nacido',
  DuenioEntrega: 'Dueño Entrega',
  Otro: 'Otro'
}

const SpeciesEnum = {
  Perro: 'Perro',
  Gato: 'Gato',
  Otro: 'Otro'
}

const SexEnum = {
  Macho: 'Macho',
  Hembra: 'Hembra',
  Otro: 'Otro'
}

Object.freeze(AdmitionKindEnum)
Object.freeze(SpeciesEnum)
Object.freeze(SexEnum)

export {
  AdmitionKindEnum,
  SpeciesEnum,
  SexEnum
}
