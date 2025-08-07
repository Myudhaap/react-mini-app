import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoute } from './App.route'
import {Provider} from 'react-redux'
import { store } from './redux/store'

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoute/>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
