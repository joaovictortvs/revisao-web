import { SearchParams } from "next/dist/server/request/search-params"

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

    type User = {
        id: number,
        name: string,
        email: string,
        password: number
    }

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

    type User = {
        id: number;
        name: string;
        email: string;
        password: number;
    }

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