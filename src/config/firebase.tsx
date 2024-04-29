//Arquivo dado pelo firebase para implementar em noso app
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCZkNDOXz7rOWTfFC7cXlrjSJVHnYNchto",
  authDomain: "task-manager-84536.firebaseapp.com",
  projectId: "task-manager-84536",
  storageBucket: "task-manager-84536.appspot.com",
  messagingSenderId: "125386780504",
  appId: "1:125386780504:web:0cdde5514a2ea99c877f2d",
  measurementId: "G-FSTTWQJK2C"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); //tudo o que formos adicionar, irá para o app

