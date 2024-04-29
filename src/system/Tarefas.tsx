import '../tarefas.css';

const Tarefas = () => (
    <section className='tarefas'>
        <header className='container p-4 mt-4'>
            <div className='row'>
                <h1 className='col text-start'>Gerenciador de Tarefas</h1>
                <button type="button" className="fs-5 col-3 btn btn-success">Adicionar Tarefa</button>
            </div>
        </header>

        <div className="container input-group p-4">
            <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
        </div>

        <div className='container p-3'> {/* Tarefas - vai conter todas aqui */}
            <div className="tarefa row p-4 green">
                <div className='col-1 prioridade bg-success'>
                    {/* coisinho para marcar a prioridade */}
                </div>
                <div className="col-7 text-start">
                    <h2 className='m-3'>Nome da tarefa</h2>
                    <p className='m-3'> scriç ãoDescriçãoDe scrição DescriçãoDescrição DescriçãoDescrição Descrição DescriçãoDescr içãoDescriçãoDescrição riçãoDe scrição DescriçãoDescrição DescriçãoDescrição Descrição DescriçãoDescr içãoDescriçãoDescrição</p>
                    {/* Usar text-truncate caso a descrição for muito longa */}
                </div>
                <div className="col-4 text-end p-3">
                    <p>Criação: xx/xx/xxxx</p>
                    <p>Conclusão: xx/xx/xxxx</p>
                    <button type="button" className="btn btn-outline-light m-1">Ver mais</button>
                    <button type="button" className="btn btn-outline-info m-1">Concluir Tarefa</button>
                </div>
            </div>

            <div className="tarefa row p-4 orange">
                <div className='col-1 prioridade bg-warning'>
                    {/* coisinho para marcar a prioridade */}
                </div>
                <div className="col-7 text-start">
                    <h2 className='m-3'>Nome da tarefa</h2>
                    <p className='m-3'>Descrição</p>
                </div>
                <div className="col-4 text-end p-3">
                    <p>Criação: xx/xx/xxxx</p>
                    <p>Conclusão: xx/xx/xxxx</p>
                    <button type="button" className="btn btn-outline-light m-1">Ver mais</button>
                    <button type="button" className="btn btn-outline-info m-1">Concluir Tarefa</button>
                </div>
            </div>

            <div className="tarefa row p-4 red">
                <div className='col-1 prioridade bg-danger'>
                    {/* coisinho para marcar a prioridade */}
                </div>
                <div className="col-7 text-start">
                    <h2 className='m-3'>Nome da tarefa</h2>
                    <p className='m-3'>Descrição</p>
                </div>
                <div className="col-4 text-end p-3">
                    <p>Criação: xx/xx/xxxx</p>
                    <p>Conclusão: xx/xx/xxxx</p>
                    <button type="button" className="btn btn-outline-light m-1">Ver mais</button>
                    <button type="button" className="btn btn-outline-info m-1">Concluir Tarefa</button>
                </div>
            </div>
        </div>
    </section>
)

export default Tarefas