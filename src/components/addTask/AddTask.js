import React from 'react';
import './addTask.css'
import {useTodo} from "../../App";

function AddTask() {
    const {addTask, inputVal, handleChange} = useTodo()
    return (
        <div className="task-input">
            <input
                type="text"
                placeholder="Enter task title"
                className="task-input"
                value={inputVal}
                onChange={(e) => handleChange(e)}
            />
            <button
                type="button"
                onClick={() => addTask(inputVal)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask(inputVal);
                    }
                }}
                className="add-task-btn"
            >Create
            </button>

        </div>
    )
}

export default AddTask;