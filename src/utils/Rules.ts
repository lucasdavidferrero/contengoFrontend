const required = (val: unknown) => !!val || 'Este campo es obligatorio'

const requiredNum = (val: unknown) => {
  return isNaN(Number(val)) ? (!!val || 'Este campo es obligatorio') : true
}

const minChar = (minChar: number) => {
  return (val: string) => { return val.length >= minChar || `Este campo debe tener al menos ${minChar} caracteres` }
}

const positiveNumber = (val: number) => val >= 0 || 'El número debe ser positivo'

export {
  required,
  requiredNum,
  minChar,
  positiveNumber
}
