import React, { useState, useEffect } from "react";
import { isEmpty, size } from "lodash";
import {
    addDocument,
    deleteDocument,
    getCollection,
    updateDocument,
} from "./actions";

function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [Id, setId] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            const result = await getCollection("tasks");
            result.statusResponse && setTasks(result.data);
        })();
    }, []);

    const validForm = () => {
        let isValid = true;
        setError(null);

        if (isEmpty(task)) {
            setError("Debes ingresar una tarea");
            isValid = false;
        } else {
            setError(null);
        }

        return isValid;
    };

    const addTask = async (e) => {
        e.preventDefault();

        if (!validForm()) {
            return false;
        }

        const result = await addDocument("tasks", { name: task });

        !result.statusResponse && setError(result.error);

        setTasks([...tasks, { id: result.data.id, name: task }]);
        setTask("");
    };

    const deleteTask = async (id) => {
        const result = await deleteDocument("tasks", id);

        if (!result.statusResponse) {
            setError(result.error);
            return;
        }

        const filteredTasks = tasks.filter((task) => task.id !== id);
        setTasks(filteredTasks);
    };

    const editTask = (task) => {
        setTask(task.name);
        setId(task.id);
        setEditMode(true);
    };

    const saveTask = async (e) => {
        e.preventDefault();

        if (!validForm()) {
            return false;
        }

        const result = await updateDocument("tasks", Id, { name: task });

        !result.statusResponse && setError(result.error);

        const editedTasks = tasks.map((item) =>
            item.id === Id ? { id: item.id, name: task } : item
        );

        setTasks(editedTasks);

        setEditMode(false);
        setTask("");
        setId("");
    };

    return (
        <div className="container mt-5">
            <h1>Tareas</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <h4 className="text-center">Lista de tareas</h4>

                    {size(tasks) > 0 ? (
                        <ul className="list-group">
                            {tasks.map((task) => (
                                <li
                                    className={
                                        task.id === Id
                                            ? "alert alert-danger"
                                            : "list-group-item"
                                    }
                                    key={task.id}
                                >
                                    <span className="lead">{task.name}</span>

                                    {!editMode && (
                                        <>
                                            <button
                                                className="btn btn-danger btn-sm float-right mx-2"
                                                onClick={() =>
                                                    deleteTask(task.id)
                                                }
                                            >
                                                Eliminar
                                            </button>
                                            <button
                                                className="btn btn-warning btn-sm float-right"
                                                onClick={() => editTask(task)}
                                            >
                                                Editar
                                            </button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <li className="list-group-item">
                            Aun no hay tareas programadas.
                        </li>
                    )}
                </div>
                <div className="col-4">
                    <h4 className="text-center mb-2">
                        {editMode ? "Modificar Tareas" : "Agregar Tarea"}
                    </h4>
                    <form onSubmit={editMode ? saveTask : addTask}>
                        <input
                            type="text"
                            className="form-control mb-3 p-4"
                            placeholder="Ingrese la tarea..."
                            onChange={(text) => setTask(text.target.value)}
                            value={task}
                        />

                        {error && (
                            <span className="alert alert-danger alert-dismissible fade show btn-block">
                                {error}
                            </span>
                        )}

                        <button
                            type="submit"
                            className={
                                editMode
                                    ? "btn btn-warning btn-block"
                                    : "btn btn-success btn-block"
                            }
                        >
                            {editMode ? "Guardar" : "Agregar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
