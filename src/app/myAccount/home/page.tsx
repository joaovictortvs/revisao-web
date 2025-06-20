'use client'
import { FaArrowDown } from "react-icons/fa"
import Link from "next/link"

import { useState } from "react"

export default function Home(){

    const id = sessionStorage.getItem('id')

    const [showStats, setShowStats] = useState(false)
    const [questionsAnswered, setQuestionsAnswered] = useState<number>()
    const [correctAnswers, setCorrectAnswers] = useState<number>()
    const [acertosPorcentagem, setAcertosPorcentagem] = useState<number>()

    async function mostrarEstatiscas(){
        const res = await fetch(`http://localhost:3000/myAccount/api?id=${id}`)
        const data = await res.json()
        const user = data.user 

        const userStats = user.stats  
        const totalAnswered = userStats.answered_questions
        const correctAnswered = userStats.correct_answers

        setQuestionsAnswered(totalAnswered)
        setCorrectAnswers(correctAnswered)

        const acertoEstatistica = (correctAnswered / totalAnswered) * 100
        setAcertosPorcentagem(acertoEstatistica)

        setShowStats(!showStats)
    }

    return(
        <div className="w-full flex-auto flex justify-center pt-4">
            <div className="w-3/4 bg-white rounded-xl flex flex-col items-center justify-center text-black"> 
                <h1 className="text-2xl mb-4">Revise através de perguntas!</h1>
                <div className="flex flex-col w-3/4 items-center space-y-4 text-lg">
                    <Link href={'/myAccount/home/levels?level=easy'} className="w-1/4 text-center bg-green-400 flex justify-center items-center space-x-2 p-6">
                        <span>FÁCIL</span> <FaArrowDown/>
                    </Link>
                    <Link href={'/myAccount/home/levels?level=medium'} className="w-1/4 text-center bg-yellow-300 flex justify-center items-center space-x-2 p-6">
                        <span>MÉDIO</span> <FaArrowDown/>
                    </Link>
                    <Link href={'/myAccount/home/levels?level=hard'} className="w-1/4 text-center bg-red-500 flex justify-center items-center space-x-2 p-6">
                       <span>DIFÍCIL</span>
                        <FaArrowDown/>
                    </Link>
                </div>    
                <section className="flex flex-col flex-auto w-3/4 my-6 items-center ">
                    <button className="text-xl cursor-pointer w-3/4 bg-blue-600 p-2 rounded-tl-xl rounded-tr-xl text-gray-100" onClick={()=> mostrarEstatiscas()}>Clique aqui para ver suas estatísticas</button>
                    {showStats && (
                        <div className="w-3/4 h-auto bg-gray-50 border-r border-l border-b text-lg p-2">
                            Você respondeu <span className="text-xl text-green-500">{questionsAnswered} </span>questões  e acertou<span className="text-xl text-green-500"> {correctAnswers}</span>. Tendo <span className="text-2xl text-green-500">{acertosPorcentagem ? acertosPorcentagem : 0}%</span> de acertos.
                        </div>
                    )}
                </section>
            </div>
        </div>
    )

}