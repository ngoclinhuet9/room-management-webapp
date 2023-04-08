import { createAction } from '@reduxjs/toolkit'

const pushError = createAction<string, 'PUSH_ERROR'>('PUSH_ERROR')
const popError = createAction('POP_ERROR')

const errorActions = {
  pushError,
  popError,
}

export default errorActions
