import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './theme/font.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux'
import App from './routes'
import reportWebVitals from './reportWebVitals'
import 'react-dates/lib/css/_datepicker.css'
import theme from './theme/theme'
import { persistor, store } from './store/configureStore'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const onBeforeLift = () => {
  // take some action before the gate lifts
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
     <BrowserRouter>
      <Provider store={store}>
        <PersistGate onBeforeLift={onBeforeLift} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
