import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
// import { AuthContext } from '../../contexts/authCont.jsx';

const Login = () => {
  // const { userLoggedIn } = useAuth();
  // const [currentUser, setCurrentUser] = useState(null);
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [loading, setLoading] = useState(true);
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  // const [ isSigningIn, setIsSigningIn ] = useState(false);
  // const [ errMessage, setErrMessage ] = useState(false);

  console.log(auth?.currentUser?.email);

  async function signInWithFirebase() {
    try{
      await signInWithEmailAndPassword(auth, email, password);
    }catch (err){
      console.error(err);
    }
  }


  return (
    <>
      <div className='form'>
        <h1>Log-In</h1>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="email">E-mail: </span>
          <input type="email" className="form-control" id="email" onChange={ (e) => setEmail(e.target.value) } placeholder="exemplo@gmail.com"></input>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="senha">Senha: </span>
          <input type="password" className="form-control" id="senha" onChange={ (e) => setPassword(e.target.value) } placeholder="••••••"></input>
        </div>

        <div className="d-grid">
          <input className="btn btn-primary" onClick={ signInWithFirebase } type="submit" value="Entrar"></input>
        </div>
        
          <p className="text-body-primary mt-3">
            <a href="/cadastro" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Não possui uma conta? Cadastre-se!</a>
          </p>
      </div>

    </>
  )
}

export default Login