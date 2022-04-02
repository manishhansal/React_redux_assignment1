import React from 'react';
// import "./App.css";
import { useDispatch, useSelector } from 'react-redux';
import { updateTodos } from './Redux/action';
import { Link } from 'react-router-dom';


const Home = () => {
    const [title, setTitle] = React.useState("");
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos)

    const getTodos = () => {
        fetch(`http://localhost:3000/myData`)
          .then((res) => res.json())
          .then((res) => dispatch(updateTodos(res)))
          .catch((err) => console.log(err));
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/myData/${id}`, {
          method: "DELETE"
      }).then((res) => getTodos());
    }

    React.useEffect(() => {
        getTodos();
    }, [])
  
    const handleAdd = () => {
      const payload = {
        title,
        status: false,
      };
  
      // dispatch(addTodo(payload));
      // setName("");
  
      fetch(`http://localhost:3000/myData`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {"content-type" : "application/json"}
      }).then(() => getTodos())

      setTitle("")
    }

    const handleToggle = (id, title, status) => {
        let mod;
        if(status === false) {
            mod = true
        }
        else{
            mod = false
        }

        const fix = {
            title: title,
            id: id,
            status: mod
        }

        fetch(`http://localhost:3000/myData/${id}`, {
          method: "PUT",
          body: JSON.stringify(fix),
          headers: {"content-type" : "application/json"}
      }).then((res) => getTodos());


    }

    // console.log(todos)
  
    return (
      <div>
        <input
          placeholder='Add Todos'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
        <hr/>
         {
            todos.map((item) => (
                <div key={item.id}>
                     {item.title} - {item.status ? "Completed" : "Not Completed"} <button onClick={() => handleToggle(item.id, item.title, item.status)}>Toggle</button> - {<Link to={`/todos/${item.id}`}>More Dtaials</Link>}
                     <button onClick={() => handleDelete(item.id)}>Delete</button>
                 </div>
            ))
         }
      </div>
    )
}

export {Home}
