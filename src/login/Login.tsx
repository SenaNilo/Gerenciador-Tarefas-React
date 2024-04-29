const Login = () => {
  return (
    <>
      <form action="">
        <h1>Log-In</h1>
        
        <div className="input-group mb-3">
          <span className="input-group-text" id="email">E-mail: </span>
          <input type="email" className="form-control" id="email" placeholder="exemplo@gmail.com"></input>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" id="senha">Senha: </span>
          <input type="password" className="form-control" id="senha" placeholder="••••••"></input>
        </div>

        <div className="d-grid">
          <input className="btn btn-primary" type="submit" value="Entrar"></input>
        </div>
        
          <p className="text-body-primary mt-3">
              <a href="/cadastro" className="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Não possui uma conta? Cadastre-se!</a>
            </p>
      </form>

    </>
  )
}

export default Login
