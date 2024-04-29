// import firebase from "firebase/compat/app";

import firebase from "firebase/compat/app";

const Cadastro = () => {
  function cadastrar(email: string | null | undefined, senha: string | null | undefined){
    var data = {
      mail: email,
      pass: senha
    };

    return firebase.database().ref().child('usuarios').push(data);
  }

  var registerFirebase = () => { // Pra quando o botao for disparado
    var emailValue = document.querySelector("#emailInput")?.nodeValue;
    var senhaValue = document.querySelector("#senhaInput")?.nodeValue;

    cadastrar(emailValue, senhaValue); //para enviar ao firebase
  }


  return (
    <>
      <form>
        <h1>Cadastre-se</h1>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="emailInput">E-mail: </span>
          <input type="email" className="form-control" id="emailInput" placeholder="exemplo@gmail.com" required></input>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="senhaInput">Senha: </span>
          <input type="password" className="form-control" id="senhaInput" placeholder="••••••" required></input>
        </div>

        <div className="d-grid">
          <input className="btn btn-primary" 
          onClick={ registerFirebase }  //chamar a funcao para salvar no bd
          type="submit" value="Cadastrar"></input>
        </div>
        
          <p className="text-body-primary mt-3">
              <a href="/" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Já possui uma conta? Entre aqui!</a>
            </p>
      </form>
    </>
  )
}

export default Cadastro