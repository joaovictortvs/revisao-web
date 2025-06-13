import { FaArrowDown } from "react-icons/fa"
import Link from "next/link"

export default function Home(){

    return(
        <div className="w-full flex-auto flex justify-center pt-4">
            <div className="w-3/4 bg-white rounded-xl flex flex-col items-center justify-center text-black"> 
                <h1 className="text-2xl mb-4">Revise através de perguntas!</h1>
                <div className="flex flex-col w-3/4 items-center space-y-4 text-lg">
                    <Link href={'/myAccount/home/levels?level=easy'} className="w-1/4 text-center bg-green-400 flex justify-center items-center space-x-2 p-6">
                        <span>FÁCIL</span> <FaArrowDown/>
                    </Link>
                    <Link href={'/myAccount/home/levels?level=medium'} className="w-1/4 text-center bg-yellow-300 flex justify-center items-center space-x-2 p-6">
                        <span>MÉDIO</span> <FaArrowDown/>
                    </Link>
                    <Link href={'/myAccount/home/levels?level=hard'} className="w-1/4 text-center bg-red-500 flex justify-center items-center space-x-2 p-6">
                       <span>DIFÍCIL</span>
                        <FaArrowDown/>
                    </Link>
                </div>    
            </div>
        </div>
    )

}