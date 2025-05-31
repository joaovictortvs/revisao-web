'use client'
import Link from "next/link"

import { usePathname } from "next/navigation"

export default function myAccountLayout({children}: {children: React.ReactNode}){

    const pathname = usePathname()

    const navlinks = [
        {name: 'Home', href: '/myAccount/home'},
        {name: 'Criar novas perguntas', href: '/myAccount/criar'},
        {name: 'Perfil', href: '/myAccount/perfil'},
        {name: 'Minha conta', href: '/myAccount'}
    ]   
    
    return(
        <div className="h-screen w-screen flex flex-col bg-gray-400 overflow-y-auto">
            <nav className="flex w-full self-center justify-around text-2xl p-2 border-b">
                {navlinks.map((link, indice)=>{
                    const isActive = pathname.endsWith(link.href)
                    return(
                        <Link key={indice} href={link.href} className={`${isActive ? 'text-blue-900': 'text-white'}`}>{link.name}</Link>
                    )

                })}
            </nav>
            {children}
        </div>
    )
}