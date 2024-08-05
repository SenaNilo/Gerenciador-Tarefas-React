import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from "react-router-dom"

import { useState } from 'react';
// import { AuthContext } from '../../contexts/authCont.jsx';

const Login = () => {  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [modalError, setModalError] = useState(false);
  
  let navigate = useNavigate();

  if(auth?.currentUser?.email){
    console.log("logado");
    navigate('/tarefas');
  }
  // console.log(auth?.currentUser?.email);

  async function signInWithFirebase() {
    try{
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/tarefas');
    }catch (err){
      console.error(err);
      setModalError(true);
    }
  }


  return (
    <>
    {/* Modal de error */}
      <div className={`${modalError ? 'active' : 'desactive'} modal fade`} aria-labelledby="exampleModalLabel" aria-hidden="true"> 
        {/* Bagulhinho para controlar o estado do Modal */}
        <div className="modal-dialog mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="staticBackdropLabel">Erro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => setModalError(false) }></button>
            </div>
            <div className="modal-body">
              E-mail ou senha inválidos
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={ () =>  setModalError(false) }>Ok</button>
            </div>
          </div>
        </div>
      </div>

    {/* Form */}
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