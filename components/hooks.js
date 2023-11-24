import React from "react";
import { Poppins } from 'next/font/google'
import { Faphone } from 'react-icons/fa'

const poppinsRegular = Poppins({
    subsets:['latin'],
    weight:'600'
})

export function TallyCounter() {
    const [tally,setTally] = React.useState(0);

    
    React.useEffect(() => {
        setTimeout(() => alert('your inforamtion is fully loaded'))
    },[]);
    return(
        <div className={`${poppinsRegular.className} w-full flex flex-col justify-center items-center py-20`}>
            <h1 className="text-3xl">Your current count is {tally}</h1>
            <div className="flex flex-rows gap-2 ">
                <button
                onClick={() => setTally(tally - 1)} 
                className="h-[48px] px-2 justify-center items-center bg-black text-white">-</button>
                <button
                onClick={() => setTally(tally + 1)}
                className="h-[48px] px-2 justify-center items-center bg-black text-white">+</button>
            </div>
        </div>
    )
}