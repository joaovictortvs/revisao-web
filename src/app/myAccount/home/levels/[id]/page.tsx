'use client'
import { useParams, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

import Message from "@/components/Message"

export default function Question(){
    
    const id = sessionStorage.getItem('id')
    const searchParams = useSearchParams()
    const level = searchParams.get('level')
    const params = useParams()
    const idQuestion = params.id
    

    type questionType = {
        id: string;
        title: string;
        answers: {
            answer_a: string;
            answer_b: string;
            answer_c: string;
            answer_d: string;
            answer_e?:string
        },
        answer_correct: string
    }

    const [question, setQuestion] = useState<questionType>()
    const [clickResp, setClickResp] = useState<boolean>(false)
    const [msgAnswer, setMsgAnswer] = useState<string>('')
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)
    const [answeredQuestions, setAnsweredQuestions] = useState<number>(0)

    useEffect(()=>{
        fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
            method: 'GET',
            headers: {
                "Content-type": 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            const dataUser = data.user
            setCorrectAnswers(dataUser.correct_answers)
            setAnsweredQuestions(dataUser.answered_questions)
            const userQuestions = data.user.questions
            const questionLevel: questionType[] = userQuestions[level as keyof typeof userQuestions]

            const questionActual = questionLevel.find(question => question.id == idQuestion)
            setQuestion(questionActual)
        })
    }, [idQuestion])

    async function verificResposta(resposta: string | undefined){

        const res = await fetch(`http://localhost:3000/myAccount/api?id=${id}`)
        const data = await res.json()
        const stats = data.user.stats

        const atualCorrectNumber = stats.correct_answers
        const atualAnsweredNumber = stats.answered_questions

        if(resposta === question?.answer_correct){
            setMsgAnswer('Correta resposta!')
            setClickResp(true)
            setTimeout(()=>{
                setClickResp(false)
            }, 1500)

            const updateProp = {
                stats: {
                    correct_answers: atualCorrectNumber + 1,
                    answered_questions: atualAnsweredNumber + 1  // continuar corrigindo erro
                }    
            }

            await fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(updateProp)
            })
            
            setCorrectAnswers(updateProp.stats.correct_answers)
            setAnsweredQuestions(updateProp.stats.answered_questions)

        } else {
            setMsgAnswer('Resposta errada!')
            setClickResp(true)
            setTimeout(()=>{
                setClickResp(false)
            }, 1500)

            const updateProp = {
                stats: {
                    correct_answers: atualCorrectNumber,
                    answered_questions: atualAnsweredNumber + 1
                }    
            }

            fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(updateProp)
            })

            setAnsweredQuestions(updateProp.stats.answered_questions)
        }
        
    }
    
    return(
        <div className="w-full flex-auto flex justify-center pt-4">
            <div className="w-3/4 bg-white rounded-xl flex flex-col p-4 text-center items-center text-black">
                {clickResp && <Message msg={msgAnswer}/>}
                <h1 className="text-lg max-w-3/4">{question?.title}</h1>
                <section className="flex flex-col w-5/6 items-start space-y-4">
                    <p>Alternativas:</p>
                    <div className="w-full bg-gray-100 flex rounded-xl border p-1 hover:bg-gray-200 transition-all">
                        <label htmlFor="answer_a">A.</label>
                        <button id="answer_a" className="flex-auto py-2 cursor-pointer" onClick={()=> verificResposta(question?.answers.answer_a)}>{question?.answers.answer_a}</button>
                    </div>
                    <div className="w-full bg-gray-100 flex rounded-xl border p-1 hover:bg-gray-200 transition-all">
                        <label htmlFor="answer_b">B.</label>
                        <button id="answer_b" className="flex-auto py-2 cursor-pointer " onClick={()=> verificResposta(question?.answers.answer_b)}>{question?.answers.answer_b}</button>
                    </div>
                    <div className="w-full bg-gray-100 flex rounded-xl border p-1 hover:bg-gray-200 transition-all">
                        <label htmlFor="answer_c">C.</label>
                        <button id="answer_c" className="flex-auto py-2 cursor-pointer" onClick={()=> verificResposta(question?.answers.answer_c)}>{question?.answers.answer_c}</button>
                    </div>
                    <div className="w-full bg-gray-100 flex rounded-xl border p-1 hover:bg-gray-200 transition-all">
                        <label htmlFor="answer_d">D.</label>
                        <button id="answer_d" className="flex-auto py-2 cursor-pointer" onClick={()=> verificResposta(question?.answers.answer_d)}>{question?.answers.answer_d}</button>
                    </div>

                    {question?.answers.answer_e && (
                        <div className="w-full bg-gray-100 flex rounded-xl border p-1 hover:bg-gray-200 transition-all">
                            <label htmlFor="answer_e">E.</label>
                            <button id="answer_e" className="flex-auto py-2 cursor-pointer" onClick={()=> verificResposta(question?.answers.answer_e)}>{question?.answers.answer_e}</button>
                        </div>
                    )}
                </section>
            </div>
             
        </div>
    )

}