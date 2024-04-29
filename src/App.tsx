import './App.css';

import Login from './components/login/Login';
import Cadastro from './components/login/Cadastro';
import Tarefas from './components/system/Tarefas';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/cadastro',
    element: <Cadastro />,
  },
  {
    path: '/tarefas',
    element: <Tarefas />,
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
