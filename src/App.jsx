import './App.css';
import { useEffect, useState } from 'react';

export default function App() {

  const [list, setList] = useState('');
  const [arr, setArr] = useState(['']);

  // localStorage.clear()

  useEffect(() => {
    let copy2
    if (localStorage.length > 0) {
      let key = localStorage.key('arr');
      let val = localStorage.getItem(key);
      copy2 = val.split(',')
    }

    setArr(() => [...copy2]);
  }, []);

  function Addlist() {
    if (list) {
      let copy = [...arr,list]
      setArr(copy)
      localStorage.setItem('arr', copy)
      setList([''])
    }
  }

  function DelLi(index) {
    let copy = [...arr]
    copy.splice(index, 1)
    localStorage.setItem('arr', copy)
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
        <div className='Bottom'>
          <ul>
            {result}
          </ul>
        </div>
      </main>
    </>
  );
}
