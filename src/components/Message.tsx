import { useState } from 'react'
interface Msg {
    msg: string;
    button?: boolean;
    confirmDelete?:(confirm: boolean) => void;
}

export default function Message({ msg, button, confirmDelete}: Msg){


    return(
        <div className="w-3/4 h-20 flex flex-col items-center justify-center bg-amber-300 absolute rounded-2xl mt-4">
            <h1 className="text-xl">{msg}</h1>
            {button && <div className='flex items-center w-1/4 justify-center space-x-4 mt-2'>
                    <div>   
                        <button onClick={()=>{confirmDelete?.(true)}} className='cursor-pointer px-4 py-1 bg-green-500'>Sim</button>
                    </div>    
                    <div>
                        <button onClick={()=>{confirmDelete?.(false)}} className='cursor-pointer px-4 py-1 bg-red-900'>Não</button>
                    </div>
            </div>}
        </div>
    )
}