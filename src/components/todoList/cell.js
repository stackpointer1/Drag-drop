import React from 'react';
import {useTodo} from "../../App";

function Cell(props) {
    const {cellKey, row} = props;
    const {tasks, updateTask} = useTodo();

    /**
     * Handles the deletion of a task by its ID.
     *
     * @param {number|string} id - The unique identifier of the task to be deleted.
     * @return {void} This method does not return a value.
     */
    function handleDelete(id) {
        let newTask = tasks.filter(task => task.id !== id);
        updateTask(newTask);

    }

    return (
        <div className="cell">
            {cellKey === row.status && <span className='row-text'>{row.title}</span>}
            <button
                type="button"
                className='delete-btn'
                onClick={() => handleDelete(row.id)}
            > x
            </button>
        </div>
    );
}

export default Cell