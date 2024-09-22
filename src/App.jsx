import './App.css';
import { useEffect, useState } from 'react';
import Task from './components/Tasks/Task';
export default function App() {

  const [list, setList] = useState('');
  const [arr, setArr] = useState(['']);
  const [editIndex, setEditInput] = useState(null);
  // localStorage.clear()

  useEffect(() => {
    const val = localStorage.getItem('arr');
    if (val) {
      setArr(JSON.parse(val));
    }
  }, []);
    
  function handleAddList() {
    if (list.trim()) {
      let copy = [...arr];

      if (editIndex !== null) {
        copy[editIndex] = list; 
        setEditInput(''); 
      } else {
        copy.push(list); 
      }

      setArr(copy);
      localStorage.setItem('arr', JSON.stringify(copy)); 
      setList(''); 
    }
  }

  function handleEditList(index) {
    setList(arr[index]);
    setEditInput(index);
  }


  function handleListDelite(index) {
    let copy = [...arr]
    copy.splice(index, 1)
    localStorage.setItem('arr', JSON.stringify(copy))
    setArr(copy)
  }

  let result
  if (arr.length > 0) {
    result = arr.map((item, index) => {

      return (
        <li key={index}>
          {item}
          {item.trim() && <button onClick={() => handleListDelite(index)}>Delete</button>}
        </li>
      )
    })
  }

  return (
    <>
      <main className='main'>
        <input
          onChange={e => setList(e.target.value)}
          value={list}
          type="text"
        />
        <br />
        <button onClick={handleAddList}>{editIndex !== null ? 'Update' : 'Add'}</button>
        <div className='Bottom'>
          <ul>
            {arr.length > 0 && arr.map((item, index) => (
              <li key={index}>
                {item}
                <button onClick={() => handleListDelite(index)}>Delete</button>
                <button onClick={() => handleEditList(index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
