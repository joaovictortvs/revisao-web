export async function POST(request: Request) {

    const generateUniqueId = require('generate-unique-id')
    const requestData = await request.json()

    interface bodyPost {
        id: number;
        name: string;
        email: string;
        password: number
    }

    const requestPost: bodyPost = {
        id: generateUniqueId({length: 32, useLetters: false}),
        name: requestData.name,
        email: requestData.email,
        password: requestData.password
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