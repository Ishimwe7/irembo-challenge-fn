
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RicaImportPermitForm from './pages/RICAImportPermitForm';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(

      <>
        <Route path="/" element={<RicaImportPermitForm/>} /> 
      </>
    )
  );

  return (
        <RouterProvider router={router} />

  );
};

export default App;