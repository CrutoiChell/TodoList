import uuid from 'react-uuid';
import './App.css';
import { useEffect, useState } from 'react';

export default function App() {

  const [list, setList] = useState('');
  const [arr, setArr] = useState(['']);

  // localStorage.clear()

  useEffect(() => {
    let copy2 = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let val = localStorage.getItem(key);
        copy2.push(val);
      }
    }
    
    setArr(() => [...copy2]);
  }, []);

  function Addlist() {
    if (list) {
      localStorage.setItem(uuid(), list)
      setArr([...arr, list])
      setList([''])
    }
  }

  function DelLi(index) {
    let copy = [...arr]
    copy.splice(index, 1)
    console.log(copy);
    setArr(copy)
  }

  let result = arr.map((item, index) => {
    return <li onClick={() => DelLi(index)} key={index}>{item}</li>
  })

  return (
    <>
      <main className='main'>
        <input onChange={e => setList(e.target.value)} value={list} type="text" /> <br />
        <button onClick={Addlist}>add</button>
        <div className='Buttom'>
          <ul>
            {result}
          </ul>
        </div>
      </main>
    </>
  );
}
