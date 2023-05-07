import { put, takeEvery } from 'redux-saga/effects'
import { auth } from 'firebase-config'
import axios from 'utils/axios'
import actions from '../actions'
import { useToast } from '@chakra-ui/react'



const {
  loginByEmailAndPassword,
  authSuccess,
  signupByEmailAndPassword,
  pushError,
  updatePassword,
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
    .then((res) => {
      const toast = useToast()
      if (payload.role === 'renter'){
        toast({
          title: 'Thành công',
          description: 'Tài khoản của bạn đã được đăng ký thành công',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
      }
      if (payload.role === 'owner'){
        toast({
          title: 'Thành công',
          description: 'Tài khoản của bạn đang được chờ phê duyệt',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true,
        })
      }
    })
        
      // localStorage.setItem('token', token)
      // axios.get('/profile')
      //   .then((result) => {
      //     localStorage.setItem('infoUser', JSON.stringify(result.data.data))
      //     switch(result.data.data.role) {
      //       case 'admin':
      //         window.location.pathname = '/admin'
      //         break;
      //       case 'owner':
      //         window.location.pathname = '/owner'
      //         break;
      //       default:
      //         window.location.pathname = '/'
    
      //     }
      //   })
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

function* updatePasswordSaga({
  payload,
}: ReturnType<typeof updatePassword>) {
  console.log('check pass')
  //const user: any = yield auth?.currentUser?.p;
  yield auth?.currentUser?.updatePassword(payload.newPass)
    .catch((error: any) => {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      if (errorCode === 'auth/weak-password') {
        alert('The password is too weak.')
      } else {
        alert(errorMessage)
      }
    })
}

export function* watchAuth() {
  yield takeEvery(loginByEmailAndPassword.type, logInByEmailAndPasswordSaga)
  yield takeEvery(signupByEmailAndPassword.type, signUpByEmailAndPasswordSaga)
  yield takeEvery(updatePassword.type, updatePasswordSaga)
}
