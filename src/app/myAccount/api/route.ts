import { SearchParams } from "next/dist/server/request/search-params"

type User = {
        id: number,
        name: string,
        email: string,
        password: string,
        assignature: string
    }

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const id = Number(searchParams.get('id')) 

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    }

    const response = await fetch('http://localhost:5000/users', options)

    const data: User[] = await response.json()

    const user = data.find((user)=> user.id == id)

    return new Response(JSON.stringify({user}), {
        status: 201,
        headers: {"Content-Type": 'application/json'}
    })
}


export async function DELETE(request: Request){
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id');

    const UserResponse = await fetch(`http://localhost:5000/users/${id}`)
    const user = await UserResponse.json()

    const deleteUserResponse = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE'
    })

    return new Response(JSON.stringify(user), {
        status: 200,
        headers: {'Content-Type': "application/json"}
    })
}

export async function PATCH(request: Request){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    const body = await request.json()

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        } 
    }
 
    const usersResponse = await fetch(`http://localhost:5000/users`, options)
    const dataUsers: User[] = await usersResponse.json()    

    const userIndex = dataUsers.findIndex(user => String(user.id) == id)

    const updateUser = {
        ...dataUsers[userIndex],
        ...body
    }

    const updateResponse = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(updateUser)
    })

    const updatedData = await updateResponse.json()

    return new Response(JSON.stringify({message: 'Usuário atualizado com sucesso', user: updatedData},),{
        status: 200,
        headers: {
            "Content-Type": 'application/json'
        }
    })

}

export async function POST(request: Request){
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const level = searchParams.get('level')

    const generateUniqueId = require('generate-unique-id')
    // continuar a função de post da pergunta

    const body = await request.json()
    const newQuestion = {
        id: generateUniqueId({length: 32, useLetters: false}),
        title: body.title,
        answers: body.answers
    };

    const response = await fetch(`http://localhost:5000/users/${id}`);

    const user = await response.json();

    user.questions[String(level)].push(newQuestion);

    const updateResponse = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    })

    return new Response(JSON.stringify({message: 'Questão adicionada com sucesso!', status: 200}))
}