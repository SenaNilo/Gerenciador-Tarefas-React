import { signOut } from 'firebase/auth';
import { set, ref, onValue, remove } from 'firebase/database';
import { uid } from 'uid';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, ReactNode } from 'react';
import '../../tarefas.css';

interface Todo{
    title: string;
    desc: string;
    importance: string;
    fDtConclusion: ReactNode;
    dtCreated: ReactNode;
    id: string;
    uuid: string;
}

const Tarefas = () => {
    let navigate = useNavigate();
    const uuid = auth?.currentUser?.uid;
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [dtConclusion, setDtConclusion] = useState(Date());
    const [importance, setImportance] = useState("");
    const [search, setSearch] = useState("");
    const dtCreated = new Date().toLocaleDateString('pt-BR');

    
    const logOut = async () => {
        try{
            signOut(auth);
            navigate('/')
        }catch (err){
            console.error(err);
        }
    }
    
    //create on database
    const createItemDatabase = () => {
        //Formatação da data para xx/xx/xxxx
        const [year, month, day] = dtConclusion.split("-");
        const fDtConclusion = `${day}/${month}/${year.slice(-2)}`;

        const id = uid(3);
        set(ref(db, `/${id}`), {
            title,
            desc,
            dtCreated,
            fDtConclusion,
            importance,
            id,
            uuid
        });
    }
    
    //read
    const [toDos, setToDos] = useState<Todo[]>([]);
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            //console.log(snapshot.val()); //TA DANDO CERTO 
            if(data){
                const todosArray: Todo[] = Object.values(data);
                const arrayOfUser: Todo[] = [];
                todosArray.map((obj: Todo) => { //Mapeamento para pegar somente as tarefas DAQUELE usuario, o logado
                    if(obj.uuid == uuid || obj.title == search)
                        arrayOfUser.push(obj);
                });
                // console.log(arrayOfUser);
                setToDos(arrayOfUser);
            }
        });
    }, []);
    //Search Bar
    // const searchOnDatabase = () => {
    //     useEffect(() => {
    //         onValue(ref(db), (snapshot) => {
    //             const data = snapshot.val();
    //             //console.log(snapshot.val()); //TA DANDO CERTO 
    //             if(data){
    //                 const todosArray: never[] = Object.values(data);
    //                 const arrayOfUser: never[] = [];
    //                 todosArray.map((obj) => { //Mapeamento para pegar somente as tarefas DAQUELE usuario, o logado
    //                     if(obj.uuid == uuid)
    //                         arrayOfUser.push(obj);
    //                 });
    //                 // console.log(arrayOfUser);
    //                 setToDos(arrayOfUser);
    //             }
    //         });
    //     }, []);
    // }

    //delete
    const handleDelete = (todo: Todo) => {
        remove(ref(db, `/${todo.id}`));
    }

    //Update
    var [dataAtt, setDataAtt] = useState<Todo | null>(null); //Aqui, o estado aux pode ser do tipo Todo ou null
    var [attImportance, setAttImportance] = useState("");
    var [attDate, setAttDate] = useState("");
    const handleUpdate = (todo: Todo) => {
        setDataAtt(todo);
        setAttImportance(todo?.importance);

        const fDate = todo.fDtConclusion;

        console.log(todo.fDtConclusion);
        if(typeof fDate === "string"){
            const [day, month, year] = fDate.split("/");
            const isoDate = `20${year}-${month}-${day}`;
            console.log(isoDate);
                        
            setAttDate(isoDate);
        }

        setModalUpdate(true);
    }

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
                            <input type="text" className="form-control" id="tituloTarefa" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label  htmlFor="descricao" className="col-form-label">Descrição: </label>
                            <textarea className="form-control" id="descricao" onChange={(e) => setDesc(e.target.value)}></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="prioridade">Prioridade</label>
                                <select className="form-select" id="prioridade" onChange={(e) => setImportance(e.target.value)}>
                                    <option selected disabled value="green">Escolha...</option>
                                    <option defaultValue="green" value="green">Baixa</option>
                                    <option value="orange">Média</option>
                                    <option value="red">Urgente</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dataConclusao" className="input-group-text">Data de Conclusão:</label>
                            <input className="form-date" type="date" name="dataConclusao" id="dataConclusao" onChange={(e) => setDtConclusion(e.target.value)}/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setModalAdd(false)} data-bs-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={ createItemDatabase }>Adicionar</button>
                    </div>
                    </div>
                </div>
            </div>

            {/* Modal para atualizar tarefas */}
            <div className={`${modalUpdate ? 'active' : 'desactive'} modal fade`} id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Modificar Tarefa</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setModalUpdate(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="tituloTarefa" className="col-form-label">Título:</label>
                            <input type="text" className="form-control" id="tituloTarefa" onChange={(e) => setTitle(e.target.value)} value={ dataAtt?.title }/>
                        </div>
                        <div className="mb-3">
                            <label  htmlFor="descricao" className="col-form-label">Descrição: </label>
                            <textarea className="form-control" id="descricao" onChange={(e) => setDesc(e.target.value)} value={ dataAtt?.desc }></textarea>
                        </div>
                        <div className="mb-3">
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="prioridade">Prioridade</label>
                                <select className="form-select" id="prioridade" onChange={(e) => setAttImportance(e.target.value)} value={ attImportance }>

                                    <option disabled>Escolha...</option>
                                    <option value="green">Baixa</option>
                                    <option value="orange">Média</option>
                                    <option value="red">Urgente</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dataConclusao" className="input-group-text">Data de Conclusão:</label>
                            <input className="form-date" type="date" name="dataConclusao" id="dataConclusao" onChange={(e) => setDtConclusion(e.target.value)} value={ attDate } /> 
                            {/* Converte para o formato yyyy-MM-dd */}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={() => setModalUpdate(false)} data-bs-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" >Modificar</button>
                    </div>
                    </div>
                </div>
            </div>

            <section className='tarefas'>
                <header className='container p-4 mt-4'>
                    <div className='row'>
                        <h1 className='col text-start'>Gerenciador de Tarefas</h1>
                        <button type="button" onClick={ () => setModalAdd(true) } className="fs-5 m-1 col-3 btn btn-success">Adicionar Tarefa</button>
                        <button className="btn btn-outline-light m-1 fs-6 col-1" onClick={ logOut }>Logout</button>
                    </div>
                </header>
                <div className="container input-group p-4">
                    <input type="text" className="form-control" placeholder="Pesquisar por títulos" aria-label="Pesquisar por títulos" aria-describedby="button-addon2" onChange={ (e) => setSearch(e.target.value) }/>

                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" >Button</button>
                </div>
                <div className='container p-3'> {/* Tarefas - vai conter todas aqui */}
                    {//todo vai ser cada objeto dentro da array de tarefas do usuario, onde eu terei que pegar somente as deste usuario depois
                    toDos.map((todo: Todo) => (
                        <>
                            <div className={`tarefa row p-4 ${todo.importance}`}>
                             {/* <div className={`tarefa row p-4 green`}> */}
                                <div className="col-1 prioridade"></div>
                                <div className='col-7 text-start'>
                                    <h2 className="m-3">{ todo.title }</h2>
                                    <p className="m-3">{ todo.desc }</p>
                                </div>
                                <div className="col-4 text-end p-3">
                                    <p>Criação: { todo.dtCreated }</p>
                                    <p>Conclusão: { todo.fDtConclusion }</p>
                                    <button type='button' className="btn btn-outline-light m-1" onClick={() => handleUpdate(todo)}>Ver Mais</button>
                                    <button onClick={ () => handleDelete(todo) } type='button' className="btn btn-outline-info m-1">Concluir Tarefa</button>
                                </div>
                            </div>
                        </>
                    ))}
                    
                    
                </div>
            </section>
        </>
    )
}

export default Tarefas