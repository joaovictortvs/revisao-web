'use client'
import { FaPlus, FaMinus } from "react-icons/fa"
import { useState } from "react"

export default function Criar(){

    const id = sessionStorage.getItem('id')

    const [addAlternativa, setAddAlternativa] = useState<boolean>(false)

    interface typeAlternatives {
        answer_a: string;
        answer_b: string;
        answer_c: string;
        answer_d: string;
        answer_e?: string
    }

    const [titleQuestion, setTitleQuestion] = useState<string>('')
    const [questionLevel, setQuestionLevel] = useState<string>('easy')
    const [answer_a, setAnswer_a] = useState<string>('')
    const [answer_b, setAnswer_b] = useState<string>('')
    const [answer_c, setAnswer_c] = useState<string>('')
    const [answer_d, setAnswer_d] = useState<string>('')
    const [answer_e, setAnswer_e] = useState<string>('')

    const [alternativeAnswers, setAlternativeAnswers] = useState<typeAlternatives>()

    function createQuestion(title: string, level: string, answer_A: string, answer_B: string, answer_C: string, answer_D: string, answer_E: string){
        let altsQuestion: typeAlternatives;
        if(answer_E !== ''){
            altsQuestion = {
                answer_a: answer_A,
                answer_b: answer_B,
                answer_c: answer_C,
                answer_d: answer_D,
                answer_e: answer_E
            }
        } else {
            altsQuestion = {
                answer_a: answer_A,
                answer_b: answer_B,
                answer_c: answer_C,
                answer_d: answer_D,
            }
        }

        setAlternativeAnswers(altsQuestion)
        
        const bodyPergunta = {
            title: title,
            answers: altsQuestion
        }

        fetch(`http://localhost:3000/myAccount/api?id=${id}&level=${level}`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(bodyPergunta)
        })
    }

    return(
         <div className="w-full flex-auto flex flex-col items-center text-black">
            <h1 className="p-4 text-3xl my text-white">Criar perguntas</h1>
             <div className="h-full w-5/6 bg-gray-200 rounded-xl flex flex-col items-center self-center space-y-2">
                <div className="w-4/6 flex flex-col m-4">
                    <label htmlFor="questao">Digite aqui o enunciado da questão:</label>
                    <input type="text" id="questao" name="questao" className="border border-black py-2 text-black px-2 rounded-sm" onChange={(e)=> setTitleQuestion(e.target.value)}/>
                </div>

                <div className="w-4/6 flex flex-col">
                    <label htmlFor="nivelQuestao">Classificação da questão:</label>
                    <select name="nivelQuestao" id="nivelQuestao" className="py-1 text-lg" onChange={(e)=> setQuestionLevel(e.target.value)} defaultValue={'Fácil'}>
                        <option value={'easy'}>Fácil</option>
                        <option value={'medium'}>Médio</option>
                        <option value={'hard'}>Difícil</option>
                    </select>
                </div>

                <span className="text-xl my-2">Alternativas de respostas:</span>

                <div className="flex flex-col w-4/6 mb-4 space-y-2">
                    <div className="flex flex-col">
                        <label htmlFor="alternativa_A">Alternativa A:</label>
                        <input type="text" id="alternativa_A" className="border border-black py-2 p-2 rounded-sm" onChange={(e)=> setAnswer_a(e.target.value)}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="alternativa_B">Alternativa B:</label>
                        <input type="text" id="alternativa_B" className="border border-black py-2 p-2 rounded-sm" onChange={(e)=> setAnswer_b(e.target.value)}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="alternativa_C">Alternativa C:</label>
                        <input type="text" id="alternativa_C" className="border border-black py-2 p-2 rounded-sm" onChange={(e)=> setAnswer_c(e.target.value)}/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="alternativa_D">Alternativa D:</label>
                        <input type="text" id="alternativa_D" className="border border-black py-2 p-2 rounded-sm" onChange={(e)=> setAnswer_d(e.target.value)}/>
                    </div>
                     {addAlternativa &&
                        <>
                            <div className="flex flex-col">
                                <label htmlFor="alternativa_E">Alternativa E:</label>
                                <input type="text" id="alternativa_E" className="border border-black py-2 p-2 rounded-sm" onChange={(e)=> setAnswer_e(e.target.value)}/>
                            </div>
                            <span onClick={()=>{setAddAlternativa(false); setAnswer_e('')}}><FaMinus className="text-4xl cursor-pointer text-blue-900 bg-gray-400 py-2 px-2"/></span>
                        </>
                    }
                    {!addAlternativa && <span onClick={()=>{setAddAlternativa(true)}}><FaPlus className="text-4xl cursor-pointer text-blue-900 bg-gray-400 py-2 px-2"/></span>}
                    
                </div>    

                <button className="border py-2 px-4 mb-4 cursor-pointer rounded-md bg-blue-600 text-white" onClick={()=> createQuestion(titleQuestion, questionLevel, answer_a, answer_b, answer_c, answer_d, answer_e)}>Criar pergunta</button>
             </div>
         </div>
    )

}