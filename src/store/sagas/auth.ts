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

    if (token) {
      localStorage.setItem('token', token)
      yield put(authSuccess(token))

      axios.get('/profile')
        .then((result) => {
          localStorage.setItem('infoUser', JSON.stringify(result.data.data))
          switch(result.data.data.role) {
            case 'admin':
              window.location.pathname = '/admin'
              break;
            case 'owner':
              window.location.pathname = '/owner'
              break;
            default:
              window.location.pathname = '/'
    
          }
        })
        .catch((error) => {
          switch(error.response.status) {
            case 401:
            case 404:
              alert('Email hoặc mật khẩu không chính xác')
          }
        })
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
      yield axios.post('/user/create', {
        email: payload.email,
        name: payload.name,
        role: payload.role,
        identity: payload.identity,
        phone: payload.phone,
        address: payload.address,
      })
      // if (path.startsWith("/renter") || path === "/") {
      //   yield axios.post('/renters/create', {
      //     email: payload.email,
      //     phone: payload.phone,
      //     name: payload.name,
      //   })
      // }
      // if (path.startsWith("/owner")) {
      //   yield axios.post('/owners/create', {
      //     email: payload.email,
      //     name: payload.name,
      //     identity: payload.identity,
      //     phone: payload.phone,
      //     address: payload.address,
      //   })
      // }
    }
  } catch (e) {
    console.log(e)
  }
}

export function* watchAuth() {
  yield takeEvery(loginByEmailAndPassword.type, logInByEmailAndPasswordSaga)
  yield takeEvery(signupByEmailAndPassword.type, signUpByEmailAndPasswordSaga)
}
