import {  useState, useRef, useEffect  } from 'react'
import './App.css'

function Task({taskValue, handleDelete, taskIndex}) {

    function handleClick() {
      handleDelete(taskIndex);
    }

    return (
      <>
      <div className="task">
        <input type="checkbox" />
        <p>{taskValue}</p>
        <button className='deleteButton' onClick={handleClick}>x</button>
      </div>
      </>
    )
}

function App() {
  const [tasks, setTasks] = useState(["Clean House", "Take out Trash", "Walk Dog"]);
  const [taskInput, setTaskInput] = useState("");

  function handleClick(e){
    e.preventDefault();
    if(taskInput === "") return;

    setTasks(previousTasks => [...previousTasks, taskInput]);

    setTaskInput("");
  }

  function handleDelete(index){
    setTasks(previousTasks => previousTasks.filter((val, i) => i !== index));
  }


  return (
    <>
    <main>
      <div className="taskContainer">
      {
        tasks.map((task, i) => {
          return (<Task key={i} taskValue={task} handleDelete={handleDelete} taskIndex={i} />)
        })
      }
      </div>
      <form action="">
        <input className="taskInput" onChange={(e) => setTaskInput(e.target.value)} value={taskInput}/>
        <button onClick={handleClick}>Add</button>
      </form>
    </main>

    </>
  )
}

export default App
