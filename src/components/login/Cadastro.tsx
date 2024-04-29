import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const Cadastro = () => {
  //useState retorna um arr de dois valores, um para o valor atual e o outro para mudá-lo, useState(aqui vai o valor padrao)
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.email);

  const registerInFirebase = async () => { // Pra quando o botao for disparado
    //Ele vai esperar uma autorização do firebase com o email e a senha para o banco
    if(password.length < 6)
      alert("Sua senha precisa de 6 caracteres");
    else{
      try{
        await createUserWithEmailAndPassword(auth, email, password);
      }catch (err){
        console.error(err);
      }
    }
  };

  const logOut = async () => {
    try{
      signOut(auth);
    }catch (err){
      console.error(err);
    }
  }


  return (
    <>
      <form>
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
      </form>
      
      <p className="text-body-primary mt-3">
        <a href="/" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Já possui uma conta? Entre aqui!</a>
      </p>
      <button onClick={ logOut }>logout</button>
    </>
  )
}

export default Cadastro