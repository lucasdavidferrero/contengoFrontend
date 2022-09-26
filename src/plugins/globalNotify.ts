import { Notify } from 'quasar'

function showNotify (message: string, type = 'positive') {
  Notify.create({
    type,
    message
  })
}

export {
  showNotify
}
