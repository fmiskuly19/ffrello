import ReactDOM from 'react-dom/client'
import './index.css'
import Main from './main.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.tsx'

ReactDOM.createRoot(
    document.getElementById('root')!).render(
        <Provider store={store}>
            <Main />
        </Provider>
    )