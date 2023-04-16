import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'

const { authSuccess, signOut } = actions

const initialState = {
  isAuth: false,
}

const auth = createReducer(initialState, {
  [authSuccess.type]: () => {
    debugger
    return { isAuth: true }
  },
  [signOut.type]: () => {
    return { isAuth: false }
  },
})

export default auth
