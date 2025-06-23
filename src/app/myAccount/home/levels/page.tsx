'use client'

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";

import Message from "@/components/Message";

interface QuestionType {
  id: string;
  title: string;
  answers: {
    answer_a: string,
    answer_b: string,
    answer_c: string,
    answer_d: string,
    answer_e?: string
  }
}

function EasyContent() {
  const searchParams = useSearchParams()
  const level = searchParams.get('level')

  const [id, setId] = useState<string | null>()
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [theresQuestion, setThereQuestion] = useState<boolean>(false)
  const [mouseOn, setMouseOn] = useState(false)
  const [questionDeleted, setQuestionDeleted] = useState<boolean>(false)
  const [questionDeletedMsg, setQuestionDeletedMsg] = useState<string>('')

  useEffect(() => {
    const idUser = sessionStorage.getItem('id')
    setId(idUser)
  }, [])

  useEffect(() => {
    if (!id || !level) return;
    fetch(`http://localhost:3000/myAccount/api?id=${id}`, {
      method: 'GET',
      headers: {
        "Content-Type": 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        const userQuestions = data.user.questions
        const nivelQuestions = userQuestions[level as keyof typeof userQuestions]
        setQuestions(nivelQuestions)
        setThereQuestion(nivelQuestions && nivelQuestions.length > 0)
      })
  }, [id, level])

  function deleteQuestion(idQuestion: string) {
    fetch(`http://localhost:3000/myAccount/home/levels/api?id=${id}&level=${level}&idQuestion=${idQuestion}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        setQuestionDeletedMsg(data.message)
        setQuestionDeleted(true)
        setTimeout(() => {
          setQuestionDeleted(false)
        }, 2000)
      })
  }

  return (
    <div className="w-full flex-auto flex justify-center pt-4">
      {questionDeleted && <Message msg={questionDeletedMsg} />}
      <div className="w-3/4 bg-white rounded-xl flex flex-col p-4 text-center items-center">
        <h1 className="text-2xl text-green-500 font-semibold my-2">Questões de nível {level}</h1>
        <div className="flex flex-wrap space-x-2 space-y-2 pl-6">
          {theresQuestion ? questions.map((question) => (
            <Link
              href={`/myAccount/home/levels/${question.id}?level=${level}`}
              className="border p-4 bg-blue-800 w-40 h-30 text-sm text-center cursor-pointer"
              key={question.id}
              onMouseEnter={() => setMouseOn(true)}
              onMouseLeave={() => setMouseOn(false)}
            >
              <p>{question.title}</p>
              <div className="flex justify-center my-8">
                {mouseOn && (
                  <FaTrash className="text-xl hover:text-blue-200" onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteQuestion(question.id)
                  }} />
                )}
              </div>
            </Link>
          )) : (
            <h1 className="text-2xl text-black">Nenhuma questão criada.</h1>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Easy() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <EasyContent />
    </Suspense>
  )
}
