import { auth } from 'firebase-config'

const useAuth = async () => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.
    }
  })
}

export default useAuth
