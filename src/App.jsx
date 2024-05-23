import React from 'react'
import { useRef } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useState } from 'react'

const App = () => {

  let passwordRef = useRef();

  const [password, setPassword] = useState("");
  const [isNumber, setIsNumber] = useState(false)
  const [isChar, setIsChar] = useState(false)
  const [range, setRange] = useState(8)


  const passwordGenerator = useCallback(() => {

    let pwd = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if(isNumber){
      str = str + "123456789"
    }

    if(isChar){
      str = str + "!@#$%^&*(){}[]~|<>,"
    }

    for(let i=1; i<=range; i++){

      let randomNum = Math.floor(Math.random() * str.length + 1);
      pwd += str.charAt(randomNum);
    }

    setPassword(pwd);

  }, [isNumber, isChar, range, setPassword])

  const copyPasswordToClipboard = (e) => {
    e.preventDefault();
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);

  }

  useEffect(() => {
    passwordGenerator();
  }, [isNumber, isChar, range])

  return (
    <div className='h-screen w-screen bg-[#000] flex justify-center'>
        <div className='bg-gray-700 md:w-[60%] h-48 md:h-40 p-4 rounded-md ml-2 mr-2 mt-16'>
            <h1 className='text-white text-center text-lg font-semibold shadow-md'>Password Generator</h1>
            <form className='flex'>
                <input type = "text" value = {password} className='w-full rounded-l-md p-2 mt-4 mb-4 outline-none' ref = {passwordRef} readOnly/>
                <button className='bg-blue-700 transition-all font-semibold ease-in-out hover:bg-blue-800 text-white mt-4 mb-4 pl-4 pr-4 rounded-r-md'
                onClick = {copyPasswordToClipboard}
                >Copy</button>
            </form>
            <div className='flex items-center justify-between flex-wrap gap-4'>
              <div className='flex gap-2'>
                <input type = "range" min={8} max={70} value = {range} onChange={(e) => setRange(e.target.value)}/>
                <label className='text-orange-600 font-semibold'>Length: {range}</label>
              </div>
              <div className='flex gap-2'>
                <input type = "checkbox" onChange={() => setIsNumber((prev) => !prev)} defaultChecked = {isNumber}/>
                <label className='text-orange-600 font-semibold'>Numbers</label>
              </div>
              <div className='flex gap-2'>
                <input type = "checkbox" onChange={() => setIsChar((prev) => !prev)} defaultChecked = {isChar}/>
                <label className='text-orange-600 font-semibold'>Characters</label>
              </div>
            </div>
        </div>
    </div>
  )
}

export default App
  