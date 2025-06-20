import { useSearchParams } from "next/navigation";

interface QuestionType {
    id: string;
    title: string;
    answers: {
        answer_a: string;
        answer_b: string;
        answer_c: string;
        answer_d: string;
        answer_e?: string;
    };
    answer_correct: string
}

export async function DELETE(request: Request){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const idQuestion = searchParams.get('idQuestion')
    const questionLevel = searchParams.get('level')

    const resUser = await fetch(`http://localhost:5000/users/${id}`)
    const dataUser = await resUser.json()

    const userQuestion: QuestionType[] = dataUser.questions[questionLevel as keyof typeof dataUser]

    const findQuestionIndex = userQuestion.findIndex((question)=> question.id == idQuestion)

    userQuestion.splice(findQuestionIndex, 1)

    await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(dataUser)
    })

    return new Response(JSON.stringify({message: 'Questão removida com sucesso!'}), {status: 200})
}    