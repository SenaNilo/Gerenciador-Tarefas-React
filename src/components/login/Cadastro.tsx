import { useState } from "react";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { 
  createUserWithEmailAndPassword,
} from "firebase/auth";


const Cadastro = () => {
  //useState retorna um arr de dois valores, um para o valor atual e o outro para mudá-lo, useState(aqui vai o valor padrao)
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [modalError, setModalError] = useState(false);
  const navigate = useNavigate();

  const registerInFirebase = async () => { // Pra quando o botao for disparado
    //Ele vai esperar uma autorização do firebase com o email e a senha para o banco
    if(password.length < 6)
      setModalError(true);
    else{
      try{
        await createUserWithEmailAndPassword(auth, email, password);//funcao do firebase
        setModalActive(true);
      }catch (err){
        console.error(err);
      }
    }
  };

  const fecharEntrar = () => {
    setModalActive(false);
    navigate("/tarefas");
  }
  const fechar = () => {
    setModalError(false);
  }
  

  return (
    <>     
      {/* <!-- Modal --> */}
      {/* O codigo abaixo é um operador ternario com o qual se o State of modalActive for true ele irá mostrar o modal, se nao nao ne */}
      <div className={`${modalActive ? 'active' : 'desactive'} modal fade`} aria-labelledby="exampleModalLabel" aria-hidden="true"> 
        {/* Bagulhinho para controlar o estado do Modal */}
        <div className="modal-dialog mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="staticBackdropLabel">Sucesso!</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => fecharEntrar() }></button>
            </div>
            <div className="modal-body">
              Cadastro realizado com sucesso
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={ () => fecharEntrar() }>Ok</button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal de error */}
      <div className={`${modalError ? 'active' : 'desactive'} modal fade`} aria-labelledby="exampleModalLabel" aria-hidden="true"> 
        {/* Bagulhinho para controlar o estado do Modal */}
        <div className="modal-dialog mt-5">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-4" id="staticBackdropLabel">Erro</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ () => fechar() }></button>
            </div>
            <div className="modal-body">
              Sua senha precisa de 6 caracteres
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={ () => fechar() }>Ok</button>
            </div>
          </div>
        </div>
      </div>

      {/* Forms */}
      <div className="form">
        <h1>Cadastre-se</h1>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="emailInput">E-mail: </span>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            placeholder="exemplo@gmail.com"
            onChange={ (e) => setEmail(e.target.value) }
            required></input>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text" id="senhaInput">Senha: </span>
          <input
            type="password"
            className="form-control"
            id="senhaInput"
            placeholder="••••••"
            onChange={ (e) => setPassword(e.target.value) }
            min="6"
            required></input>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary"
            onClick={ registerInFirebase }  //chamar a funcao para salvar no bd
            >
            Cadastrar
          </button>
        </div>
        <p className="text-body-primary mt-3">
          <a href="/" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Já possui uma conta? Entre aqui!</a>
        </p>
      </div>
    </>
  )
}

export default Cadastro