import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { store, persistor } from './redux/store/store'

import App from './app'
import { ThemeState } from './context/'
import './core/i18n'

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <ThemeState>
                <PersistGate persistor={persistor}>
                    <App />
                </PersistGate>
            </ThemeState>
        </Provider>
    </Router>,
    document.getElementById('root')
)
