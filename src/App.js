import {Provider} from 'react-redux';
import reducer from './reducers/combine-reducers';
import {intlInitialState, IntlProvider} from './reducers/intl.js';
import {createStore} from 'redux';

import Appbar from './components/Appbar';
import Workspace from './components/Workspace';

import './App.css';

const store = createStore(
  reducer,
  intlInitialState,
);

function App() {
  return (
    <Provider store={store}>
      <IntlProvider>
        <div className='flex flex-col h-screen bg-gray-500'>
          <Appbar />
          <Workspace />
        </div>
      </IntlProvider>
    </Provider>
  );
}

export default App;
