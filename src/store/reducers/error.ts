import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const { pushError, popError } = actions
const initialState = {
  isError: false,
  error: '',
}

const auth = createReducer(initialState, {
  [pushError.type]: (state, action) => {
    return { isError: true, error: action.payload }
  },
  [popError.type]: () => {
    return { isError: false, error: '' }
  },
})

export default auth
