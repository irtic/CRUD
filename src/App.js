import React, { useState } from "react";
import { isEmpty } from "lodash";
import { generate } from "shortid";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = (e) => {
        e.preventDefault();

        if (isEmpty(task)) {
            console.log("Task empty");
            return;
        }

        const newTask = {
            id: generate(),
            name: task,
        };

        setTasks([...tasks, newTask]);

        console.log(tasks);
        setTask("");
    };

    return (
        <div className="container mt-5">
            <h1>Tareas</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de tareas</h4>
                    <ul className="list-group">
                        {tasks.map((task) => (
                            <li className="list-group-item" key={task.id}>
                                <span className="lead">{task.name}</span>
                                <button className="btn btn-danger btn-sm float-right mx-2">
                                    Eliminar
                                </button>
                                <button className="btn btn-warning btn-sm float-right">
                                    Editar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-4">
                    <h4 className="text-center mb-2">Formulario</h4>
                    <form onSubmit={addTask}>
                        <input
                            type="text"
                            className="form-control mb-3 p-4"
                            placeholder="Ingrese la tarea..."
                            onChange={(text) => setTask(text.target.value)}
                            value={task}
                        />

                        <button
                            type="submit"
                            className="btn btn-success btn-block"
                        >
                            Agregar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
