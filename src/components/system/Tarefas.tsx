import { signOut } from 'firebase/auth';
import { set, ref, onValue } from 'firebase/database';
import { uid } from 'uid';
import { auth, db } from '../../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../tarefas.css';

const Tarefas = () => {
    let navigate = useNavigate();
    const uuid = auth?.currentUser?.uid;

    const logOut = async () => {
        try{
            signOut(auth);
            navigate('/')
        }catch (err){
            console.error(err);
        }
    }

    let title = "sexomto";
    let desc = "Descrição Fajuta";
    let dtCreated = "07/08/2024";
    let dtConclusion = "09/08/2026";
    let importance = "2";

    //create on database
    const createItemDatabase = () => {
        const id = uid();
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
    
    //read
    const [toDos, setToDos] = useState([]);
    useEffect(() => {
        onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            // console.log(Object.values(data)); TA DANDO CERTO POHA
            if(data){
                const todosArray: never[] = Object.values(data);
                setToDos(todosArray);
            }
        });
    }, []);


    console.log(
        toDos.map(user => user.id)
    );

    return(
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

                { toDos.map((todo) => ( //todo vai ser cada objeto dentro da array de tarefas do usuario, onde eu terei que pegar somente as deste usuario depois
                    <>
                        <h1>{todo.title}</h1>
                    </>
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
}

export default Tarefas