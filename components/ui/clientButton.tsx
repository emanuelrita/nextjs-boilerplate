'use client';

import { useState } from 'react';


export default function ClientButton() {
  const [counter, setCount] = useState(0);

  function handleClick() {
    setCount(counter + 1);
  }

  return (
    <div>
      <p>Count: {counter}</p>
      <button onClick={handleClick} className='bg-blue-500 hover:bg-green-700 text-white font-bold py-4 px-8 rounded'>Button</button>
    </div>
  );
}
  