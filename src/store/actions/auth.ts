import { createAction } from '@reduxjs/toolkit'

type LoginByEmailAndPasswordType = {
  email: string
  password: string
}
type SignupByEmailAndPasswordType = {
  email: string
  password: string
  role: string
  name: string
  address?: string
  phone?: string
  identity?: string
}
type UpdatePasswordType = {
  newPass: string
}

const loginByEmailAndPassword = createAction<
  LoginByEmailAndPasswordType,
  'LOG_IN_BY_EMAIL_PASSWORD'
>('LOG_IN_BY_EMAIL_PASSWORD')

const signupByEmailAndPassword = createAction<
  SignupByEmailAndPasswordType,
  'SIGN_UP_BY_EMAIL_PASSWORD'
>('SIGN_UP_BY_EMAIL_PASSWORD')

const updatePassword = createAction<
UpdatePasswordType,
  'UPDATE_PASSWORD'
>('UPDATE_PASSWORD')

const authSuccess = createAction<string, 'AUTH_SUCCESS'>('AUTH_SUCCESS')
const signOut = createAction('SIGN_OUT')

const authActions = {
  loginByEmailAndPassword,
  signupByEmailAndPassword,
  updatePassword,
  authSuccess,
  signOut,
}

export default authActions
