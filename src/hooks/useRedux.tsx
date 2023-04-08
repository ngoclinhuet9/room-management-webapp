import { useSelector, useDispatch } from 'react-redux'

const useRedux = () => {
  const selector = useSelector
  const dispatch = useDispatch()

  return { selector, dispatch }
}

export default useRedux
