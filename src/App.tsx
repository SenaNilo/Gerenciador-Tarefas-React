import './App.css';

import Login from './login/Login';
import Cadastro from './login/Cadastro';
import Tarefas from './system/Tarefas';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZkNDOXz7rOWTfFC7cXlrjSJVHnYNchto",
  authDomain: "task-manager-84536.firebaseapp.com",
  projectId: "task-manager-84536",
  storageBucket: "task-manager-84536.appspot.com",
  messagingSenderId: "125386780504",
  appId: "1:125386780504:web:0cdde5514a2ea99c877f2d",
  measurementId: "G-FSTTWQJK2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
