import './App.css';
import { RouterProvider } from 'react-router';
import { staticRouter } from './router/static-router';

function App() {
  return (
    <div className="App">
      <RouterProvider router={staticRouter} />
    </div>
  );
}

export default App;
