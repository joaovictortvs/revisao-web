'use client'
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import Message from "@/components/Message"

export default function MyAccount(){

    const router = useRouter();
    const id = sessionStorage.getItem('id')

    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [assinatura, setAssinatura] = useState<string>('')

    const [msgConfirmDelete, setMsgConfirmDelete] = useState<boolean>(false)

    function deleteOrNot(confirm: boolean){
        if (confirm){
            fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then(res => {
                setMsgConfirmDelete(false)
                router.push('/')
                sessionStorage.removeItem('id')
            })
    
        } else {
            setMsgConfirmDelete(false)
        }
    }

    function deleteAccount(){
        setMsgConfirmDelete(true)
        // função de excluir conta
    }

    useEffect(()=>{
        fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            const user = data.user
            setNome(user.name)
            setEmail(user.email)
            setAssinatura(user.assignature)
        })
    }, [])

    return(
        <div className="w-full flex-auto flex flex-col items-center">
            {msgConfirmDelete && <Message msg="Você realmente quer excluir sua conta?" button={true} confirmDelete={deleteOrNot}/>}
            <h1 className="p-4 text-3xl my-1">Minha conta</h1>
            <div className="h-full w-5/6 bg-gray-200 rounded-xl flex flex-col items-center self-center space-y-2">
                <section className="text-black text-xl flex flex-col items-center justify-center h-3/6">
                    <span>Nome: {nome ? nome : 'carregando...'}</span>
                    <span>Email: {email ? email : 'carregando'}</span>
                    <span>Assinatura: {assinatura}</span>
                </section>
                <Link href={`/myAccount/perfil`} className="bg-blue-600 cursor-pointer w-1/6 px-2 py-2 rounded-sm text-center">
                    Alterar meus dados
                </Link>
                <button className="bg-red-500 cursor-pointer w-1/6 px-2 py-2 rounded-sm" onClick={()=>deleteAccount()}>
                    Excluir conta
                </button>
            </div>
        </div>
    )

}