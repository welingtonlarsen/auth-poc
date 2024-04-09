import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';
import { Provider } from 'react-redux';
import { store } from './app/store.js';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
