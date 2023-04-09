import { put, takeEvery } from 'redux-saga/effects'
import { auth } from 'firebase-config'
import axios from 'utils/axios'
import actions from '../actions'

const {
  loginByEmailAndPassword,
  authSuccess,
  signupByEmailAndPassword,
  pushError,
} = actions

function* logInByEmailAndPasswordSaga({
  payload,
}: ReturnType<typeof loginByEmailAndPassword>) {
  try {
    yield auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .catch(async (error) => {
        let errorCode = error.code
        let errorMessage = error.message
        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.')
        } else {
          alert(errorMessage)
        }
      })

    const token: string = yield auth?.currentUser?.getIdToken(true)

    localStorage.setItem('token', token)
    if (token) {
      yield put(authSuccess(token))
    }
  } catch (e) {
    console.log(e)
  }
}

function* signUpByEmailAndPasswordSaga({
  payload,
}: ReturnType<typeof signupByEmailAndPassword>) {
  try {
    yield auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.')
        } else {
          alert(errorMessage)
        }
      })
    const token: string = yield auth?.currentUser?.getIdToken(true)
    localStorage.setItem('token', token)
    if (token) {
      yield put(authSuccess(token))
      const path = window.location.pathname
      if (path.startsWith("/renter")) {
        yield axios.post('/renters/create', {
          email: payload.email,
          name: payload.name,
        })
      }
      if (path.startsWith("/owner")) {
        yield axios.post('/owners/create', {
          email: payload.email,
          name: payload.name,
          identity: payload.identity,
          phone: payload.phone,
          address: payload.address,
        })
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export function* watchAuth() {
  yield takeEvery(loginByEmailAndPassword.type, logInByEmailAndPasswordSaga)
  yield takeEvery(signupByEmailAndPassword.type, signUpByEmailAndPasswordSaga)
}
