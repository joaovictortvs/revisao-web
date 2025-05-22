'use client'
import { useState } from "react";
import { useRouter } from "next/router";

import Message from "@/components/Message";

export default function Register(){

    const [nome, setNome] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [confirmEmail, setConfirmEmail] = useState<string>('')
    const [senha, setSenha] = useState<string>('')

    const [msgError, setMsgError] = useState(false)

    type registerData = {
        name: string;
        email: string;
        password: string;
    }

     function enviarRegistro(nomeR: string, emailR: string, confirmEmailR: string, senhaR: string){

        let emailVerificado: string;

        if(emailR === confirmEmailR){
            emailVerificado = emailR
        } else {
            setMsgError(true)
            setTimeout(()=>{
                setMsgError(false)
            }, 2000)
            return
        }

        const dadosRegistro: registerData = {
            name: nomeR,
            email: emailVerificado,
            password: senhaR
        }

        fetch('http://localhost:3000/api', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(dadosRegistro)
        })
        .then(res => res.json())
        .then(res => console.log(res));

    }


    return(
        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
            {msgError && <Message msg="Verifique se o e-mail está correto."/>}
            <div className="text-black bg-amber-50 max-w-5/6 h-auto sm:h-4/6 sm:w-4/6 flex flex-col justify-center sm:flex-row items-center rounded-2xl overflow-hidden"> 
                <div className="h-full w-3/6 flex flex-col items-center">
                    <div className="flex h-1/6 w-full items-center justify-center">
                        <h1 className="text-3xl sm:text-4xl">Registre-se</h1>
                    </div>
                    <div className="flex flex-col w-3/6 ">
                        <label htmlFor="i_nome" className="self-start">Nome completo:</label>
                        <input type="text" name="i_nome" id="i_nome" required placeholder="Seu nome completo" className="border sm:py-2 px-6 bg-gray-50 text-base w-full" onChange={(e)=>{setNome(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col w-3/6 ">
                        <label htmlFor="i_email" className="self-start">E-mail:</label>
                        <input type="email" name="i_email" id="i_email" required placeholder="Digite seu E-mail" className="border sm:py-2 px-6 bg-gray-50 text-base w-full" onChange={(e)=>{setEmail(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col w-3/6 ">
                        <label htmlFor="i_confirmEmail" className="self-start">Confirme seu E-mail:</label>
                        <input type="email" name="i_confirmEmail" id="i_confirmEmail" required placeholder="Reescreva seu E-mail" className="border sm:py-2 px-6 bg-gray-50 text-base w-full" onChange={(e)=>{setConfirmEmail(e.target.value)}}/>
                    </div>
                    <div className="flex flex-col w-3/6 ">
                        <label htmlFor="i_senha" className="self-start">Senha:</label>
                        <input type="password" name="i_senha" id="i_senha" required placeholder="Digite sua senha" className="border sm:py-2 px-6 bg-gray-50 text-base w-full" onChange={(e)=>{setSenha(e.target.value)}}/>
                    </div>
                    <button className=" border-gray-600 bg-gray-300 sm:py-2 px-6 cursor-pointer hover:bg-amber-50 hover:outline transition rounded-xl my-4" onClick={()=>{enviarRegistro(nome,email, confirmEmail,senha)}}>Registrar</button>
                </div>
            </div>
        </div>
    )
}