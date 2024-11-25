'use client'
import { useState } from "react";
import { useRef } from "react";
import ComponentValue from "@/components/ui/componentValue";
import ClientButton from "@/components/ui/clientButton";




export default function Page() {

    const [estado, setEstado] = useState(0);
    const var1 = "hello";


    const [counter, setCount] = useState(0);
    const handleClick = () => {
        setCount(counter + 1);
    }

    const counter2 = useRef(1);

    const [inputValue, setInputValue] = useState("INITIAL VALUE");

    return (
        <div className="p-20">
            <ClientButton label="Client Button" />
            <h1>{var1}</h1>
            <div>
                <h2>Counter: {counter}</h2>
                <button className="bg-blue-500 text-white font-bold m-2 p-4 rounded" onClick={handleClick}>Increment</button>
            </div>
            <div>
                <h3>Value of var2: {counter2.current}</h3>
                <button className="bg-blue-500 text-white font-bold m-2 p-4 rounded" onClick={() => counter2.current += 1}>Update var2</button>
            </div>
            <div>
                <h2>Estado: {estado}</h2>
                <button className="bg-blue-500 text-white font-bold m-2 p-4 rounded" onClick={() => setEstado(estado + 1)}>Increment</button>
            </div>
            <div className="grid grid-cols-3 gap-4 w-1/2">
                <div>
                    <input name="MyInput" className="border text-black w-full" value={inputValue} onChange={e => setInputValue(e.target.value)}></input>
                </div>
                <div>
                    <ComponentValue stringValue={inputValue} />
                </div>                
            </div>
        </div>
    )
}
