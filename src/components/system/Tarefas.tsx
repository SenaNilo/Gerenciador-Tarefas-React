import { signOut } from 'firebase/auth';
import { set, ref, onValue, remove } from 'firebase/database';
import { uid } from 'uid';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../tarefas.css';

const Tarefas = () => {
    let navigate = useNavigate();
    const uuid = auth?.currentUser?.uid;
    const [modalAdd, setModalAdd] = useState(true);

    let title = "Nilo";
    let desc = "Descrição Fajuta";
    let dtCreated = "07/08/2024";
    let dtConclusion = "09/08/2026";
    let importance = "orange";

    //create on database
    const createItemDatabase = () => {
        const id = uid(3);
        set(ref(db, `/${id}`), {
            title,
            desc,
            dtCreated,
            dtConclusion,
            importance,
            id,
            uuid
        });
    }
    
    const logOut = async () => {
        try{
            signOut(auth);
            navigate('/')
        }catch (err){
            console.error(err);
        }
    }

    
    //read
    const [toDos, setToDos] = useState([]);
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            //console.log(snapshot.val()); //TA DANDO CERTO POHA
            if(data){
                const todosArray: never[] = Object.values(data);
                const arrayOfUser: never[] = [];
                todosArray.map((obj) => { //Mapeamento para pegar somente as tarefas DAQUELE usuario, o logado
                    if(obj.uuid == uuid)
                        arrayOfUser.push(obj);
                });
                // console.log(arrayOfUser);
                setToDos(arrayOfUser);
            }
        });
    }, []);

    //delete
    const handleDelete = (todo: Object) => {
        remove(ref(db, `/${todo.id}`));
    }


    // console.log(
    //     toDos.map(user => user.id)
    // );

    return(
        <>
            {/* Modal para adicionar tarefas */}
            <div className={`${modalAdd ? 'active' : 'desactive'} modal fade`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Adicionar Tarefas</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalAdd(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="tituloTarefa" className="col-form-label">Título:</label>
                            <input type="text" className="form-control" id="tituloTarefa" />
                        </div>
                        <div className="mb-3">
                            <label  htmlFor="descricao" className="col-form-label">Descrição: </label>
                            <textarea className="form-control" id="descticao"></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="prioridade">Prioridade</label>
                                <select className="form-select" id="prioridade">
                                    <option selected>Choose...</option>
                                    <option value="greeb">Baixa</option>
                                    <option value="orange">Média</option>
                                    <option value="red">Urgente</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <input type="date" name="dataConclusao" id="dataConclusao" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Send message</button>
                    </div>
                    </div>
                </div>
                </div>

            <section className='tarefas'>
                <header className='container p-4 mt-4'>
                    <div className='row'>
                        <h1 className='col text-start'>Gerenciador de Tarefas</h1>
                        <button type="button" onClick={ createItemDatabase } className="fs-5 m-1 col-3 btn btn-success">Adicionar Tarefa</button>
                        <button className="btn btn-outline-light m-1 fs-6 col-1" onClick={ logOut }>Logout</button>
                    </div>
                </header>
                <div className="container input-group p-4">
                    <input type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                </div>
                <div className='container p-3'> {/* Tarefas - vai conter todas aqui */}
                    {//todo vai ser cada objeto dentro da array de tarefas do usuario, onde eu terei que pegar somente as deste usuario depois
                    toDos.map((todo) => (
                        <div className={`tarefa row p-4 ${todo.importance}`}>
                         {/* <div className={`tarefa row p-4 green`}> */}
                            <div className="col-1 prioridade"></div>
                            <div className='col-7 text-start'>
                                <h2 className="m-3">{ todo.title }</h2>
                                <p className="m-3">{ todo.desc }</p>
                            </div>
                            <div className="col-4 text-end p-3">
                                <p>Criação: { todo.dtCreated }</p>
                                <p>Conclusão: { todo.dtConclusion }</p>
                                <button type='button' className="btn btn-outline-light m-1">Ver Mais</button>
                                <button onClick={ () => handleDelete(todo) } type='button' className="btn btn-outline-info m-1">Concluir Tarefa</button>
                            </div>
                        </div>
                    ))}
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
                        <div className='col-1 prioridade'>
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
                        <div className='col-1 prioridade'>
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
        </>
    )
}

export default Tarefas