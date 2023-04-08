/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
import { all } from 'redux-saga/effects'
import { watchAuth } from './auth'

export default function* rootSaga() {
  yield all([watchAuth()])
}
