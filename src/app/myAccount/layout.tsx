import Link from "next/link"

export default function myAccountLayout({children}: {children: React.ReactNode}){
    return(
        <div className="h-screen w-screen flex flex-col bg-gray-400">
            <nav className="flex w-full self-center justify-around text-2xl p-2 border-b">
                <Link href={'/myAccount/home'}>Home</Link>
                <Link href={'/myAccount/criar'}>Criar novas escalas</Link>
                <Link href={'/myAccount/perfil'}>Perfil</Link>
                <Link href={'/myAccount'}>Minha conta</Link>
            </nav>
            {children}
        </div>
    )
}