'use client'
import { useState } from "react";
import { useRef } from "react";
import ComponentValue from "./componentValue";

export default function ValuesPage(){

const [counter, setCount] = useState(0);
const var1 = "hello";


let counter2 = useRef(1);

const handleClick = () => {
    setCount(counter + 1);
}


    return (
        <div>
            <h1>{var1}</h1>
            <h2>Counter: {counter}</h2>
            <button  className="bg-blue-500 text-white font-bold m-2 p-4 rounded"  onClick={handleClick}>Increment</button>
            <h3>Value of var2: {counter2.current}</h3>
            <button className="bg-blue-500 text-white font-bold m-2 p-4 rounded"  onClick={() => counter2.current += 1}>Update var2</button>
            <div>
                <ComponentValue StringValue="Titulo"/>
            </div>
        </div>
    )
}