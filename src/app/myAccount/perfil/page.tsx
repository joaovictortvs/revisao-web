'use client'
import { useState, useEffect } from "react"

import Message from "@/components/Message"

export default function Perfil(){   

    const id = sessionStorage.getItem('id')

    const [editOn, setEditOn] = useState(false)

    const [nome, setNome] = useState<string>('')
    const [assinatura, setAssinatura] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')
    

    const [newName, setNewName] = useState<string>('')
    const [newAssignature, setNewAssignature] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [newEmail, setNewEmail] = useState<string>('')
    const [reconfirmNewPassword, setReconfirmNewPassword] = useState<string>('')

    const [dadosSalvos, setDadosSalvos] = useState<boolean>(false)
    const [errorSenha, setErrorSenha] = useState<boolean>(false)

    useEffect(()=>{
        fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const userData = data.user
            setNome(userData.name)
            setAssinatura(userData.assignature)
            setEmail(userData.email)
            setSenha(userData.password)
        })
    },[])

    function modeEdition(){
        setEditOn(true)
    }

    function editInfo(N_name: string, N_email: string, N_assignature: string, N_password: string, N_reconfirmPassord: string){
         
        const updateFields: Record<string, string> = {};

        if(N_name !== nome && N_name !== '') updateFields.name = N_name; else updateFields.name = nome;

        if(N_email !== email && N_email !== '') updateFields.email = N_email; else updateFields.email = email;

        if(N_assignature !== assinatura && N_assignature !== '') updateFields.assignature = N_assignature; else updateFields.assignature = assinatura;

        if(N_reconfirmPassord !== ''){
            if(N_password !== senha && N_password === N_reconfirmPassord){
                updateFields.password = N_password
            } else {
                setErrorSenha(true)
                setTimeout(()=>{
                    setErrorSenha(false)
                }, 2000)
                return
            }
        }   
        fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
                    method: 'PATCH',
                    headers: {
                    "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(updateFields)

                })
                .then(res => res.json())
                .then(data => {
                    const dataUpdated = data.user
                    setNome(dataUpdated.name)
                    setAssinatura(dataUpdated.assignature)
                    setEmail(dataUpdated.email)
                    setSenha(dataUpdated.password)

                    setDadosSalvos(true)
                    setTimeout(()=>{
                        setDadosSalvos(false)
                    },2000)
                })
                setEditOn(false)
    }

    return(
        <div className="w-full flex-auto flex flex-col items-center">
             <h1 className="p-4 text-3xl my">Perfil</h1>
             <div className="h-full w-5/6 bg-gray-200 rounded-xl flex flex-col items-center self-center space-y-2 p-4">
                {dadosSalvos && <Message msg="Dados alterados com sucesso!"/>}
                {errorSenha && <Message msg="Erro na confirmação da senha."/>}
                {/* Adicionar as configurações do perfil em inputs, botão se quer editar*/}
                <div className="flex flex-col items-center text-black space-y-1">
                    <label htmlFor="i_nome" className="self-start">Nome:</label>
                    <input type="text" name="i_nome" id="i_nome" className="border py-1 px-4 rounded-sm" defaultValue={nome} disabled={!editOn} onChange={(e)=>setNewName(e.target.value)}/>

                    {!editOn && <>
                        <label htmlFor="i_assinaturaFixa">Assinatura:</label>
                        <select id="i_assinaturaFixa" disabled className="py-1 px-4 w-full text-center">
                            <option>{assinatura}</option>
                        </select>
                    </>}

                    {editOn &&
                        <>
                            <label htmlFor="i_assinatura">Assinatura:</label>
                            <select id="i_assinatura" name="i_assinatura" className="py-1 px-4 w-full text-center" onChange={(e)=>setNewAssignature(e.target.value)} defaultValue={assinatura}>
                                <option value="Básico">Básico</option>
                                <option value="Médio">Médio</option>
                                <option value="Premium">Premium</option>
                            </select>
                        </>
                    }   


                    <label htmlFor="i_email" className="self-start">Email:</label>
                    <input type="email" name="i_email" id="i_email" className="border py-1 px-4 rounded-sm" defaultValue={email} disabled={!editOn} onChange={(e)=>setNewEmail(e.target.value)}/>

                    <label htmlFor="i_senha" className="self-start">Senha:</label>
                    <input type="password" name="i_senha" id="i_senha" className="border py-1 px-4 rounded-sm" defaultValue={senha} disabled={!editOn} onChange={(e)=>setNewPassword(e.target.value)}/>

                    {editOn && 
                        <>
                            <label htmlFor="i_confirmSenha">Reescreva sua nova senha:</label>
                            <input type="password" name="i_confirmSenha" id="i_confirmSenha" className="border py-1 px-4 rounded-sm" onChange={(e)=>setReconfirmNewPassword(e.target.value)}/>
                        </>
                    }

                    <div className="flex my-2">
                        {!editOn && <button className="border p-2 bg-blue-600 text-gray-100 rounded-sm cursor-pointer" onClick={modeEdition}>Editar informações</button>}
                        {editOn &&
                        <div className="flex space-x-4">
                            <button className="bg-red-600 p-2 text-gray-100 rounded-sm cursor-pointer" onClick={()=>setEditOn(false)}>Cancelar</button>
                            <button className="border p-2 bg-blue-600 text-gray-100 rounded-sm cursor-pointer" onClick={()=>editInfo(newName, newEmail, newAssignature, newPassword, reconfirmNewPassword)}>Salvar</button>
                        </div>    
                        }
    
                    </div>
                </div>
             </div>
        </div>
    )

}