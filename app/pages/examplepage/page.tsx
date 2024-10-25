'use client'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import NewTestComponent from "@/components/ui/newTestComponent";
import { Button } from "@/components/ui/button";




export default function examplePage() {

    const [var1, setVar1] = useState("hello");

    const varText: string = "Hello World";

    return (
        <div>
            <h1>Hello Next.js</h1>
            <p>This is an example page.</p>
            <h1>{varText}</h1>
            <p className="bg-gray-400 border p-3 w-20">{var1}</p>
            <button className="bg-blue-400 border font-bold p-4 text-white rounded" onClick={() => setVar1(var1 + "a")}>Change Text</button>
            <NewTestComponent></NewTestComponent>
            <Button variant={"default"} size={"lg"}>Button</Button>
            <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>
                    You can add components and dependencies to your app using the cli.
                </AlertDescription>
            </Alert>
        </div>
    );
}