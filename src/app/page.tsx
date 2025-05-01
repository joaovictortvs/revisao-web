import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
        <div className="text-black bg-amber-50 max-w-5/6 h-auto sm:h-4/6 sm:w-5/6 flex flex-col sm:flex-row items-center rounded-2xl overflow-hidden">
            <div className="w-3/6 flex flex-col items-center justify-start  h-full border-b sm:border-r sm:border-b-0 mx-2 mb-2">
                <div className="h-2/6 flex items-center">
                  <h1 className="text-3xl p-8 sm:text-4xl text-center">Escalas para sua empresa!</h1>
                </div>
                <div className="flex flex-col items-center justify-center h-3/6 space-y-4">
                  <p className="text-xl sm:text-2xl text-center">Organize e planeje sua empresa da melhor forma.</p>
                  <p className="text-xl sm:text-2xl text-center">Tarefas, escalas, tudo em um só lugar!</p>
                </div>
            </div>
            <div className="w-3/6 h-auto flex flex-col items-center">
                <h1 className="text-3xl m-4">Login</h1>
                <div className="space-y-4 flex flex-col w-4/6">
                  <div className="flex flex-col">
                      <label htmlFor="i_email">Email:</label>
                      <input type="text" id="i_email" className="border sm:py-2 px-4 bg-gray-50 text-base"/>
                  </div>
                  <div className="flex flex-col">
                      <label htmlFor="i_senha">Senha:</label>
                      <input type="password" id="i_senha" className="border sm:py-2 px-4 bg-gray-50 text-base"/>
                  </div>
                  <button className=" border-gray-600 bg-gray-300 sm:py-2 px-6 cursor-pointer hover:bg-amber-50 hover:outline transition rounded-xl mb-4">Entrar</button>
                </div>
                <div className="flex flex-col text-sm sm:text-normal mb-4">
                    <Link href={'/register'}>Ainda não é cliente? Clique aqui.</Link>
                </div>
            </div>
        </div>
    </div>
  );
}
