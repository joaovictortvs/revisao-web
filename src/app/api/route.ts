import { headers } from "next/headers";
import { SearchParams } from "next/dist/server/request/search-params";

 type User = {
        id: number;
        name: string;
        email: string;
        password: string;
        assignature: string;
    }

export async function POST(request: Request) {

    const generateUniqueId = require('generate-unique-id')
    const requestData = await request.json()

    const requestPost: User = {
        id: generateUniqueId({length: 32, useLetters: false}),
        name: requestData.name,
        email: requestData.email,
        password: requestData.password,
        assignature: 'Básico'
    };

    fetch('http://localhost:5000/users',{
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(requestPost)
    })
    
    return new Response(JSON.stringify(requestPost), {
        headers: {
            'Content-Type': "application/json"
        },
        status: 201
    })
}

export async function GET(request: Request){

    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    const options = {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json'
        }
    }

    const response = await fetch('http://localhost:5000/users', options)

    const data: User[] = await response.json()

    const user = data.find((user)=> user.email === email);
    const confirmLogin = user?.password === password;

    return new Response(JSON.stringify({ confirmLogin, user }), {
        status: 200,
        headers: { "Content-Type": 'application/json' }
    })
    
}