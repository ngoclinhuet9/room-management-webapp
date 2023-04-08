import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const { authSuccess } = actions

const initialState = ''

const token = createReducer(initialState, {
  [authSuccess.type]: (state, action) => {
    return action.payload
  },
})

export default token
