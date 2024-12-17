import React from 'react';
import './TodoList.css';

import {useTodo} from "../../App";
import Cell from "./cell";

const Header = [
    {name: "Todo", key: "todo"},
    {name: "In Progress", key: "inProgress"},
    {name: "Closed", key: "closed"}
]


/**
 * Represents the TodoList component that displays tasks grouped by their status
 * and allows drag-and-drop functionality for updating status.
 *
 * @return {JSX.Element} The JSX structure of the TodoList component.
 */
function TodoList() {

    const [draggedTask, setDraggedTask] = React.useState(null);
    const {tasks, updateTask} = useTodo();

    function handleDragOver(e) {
        e.preventDefault();
    }

    /**
     * Handles the drop action for a dragged task and updates its status.
     *
     * @param {string} newStatus - The new status to be assigned to the dragged task.
     * @return {void} This function does not return a value.
     */
    function handleDrop(newStatus) {

        if (draggedTask) {
            const _tasks = tasks.map(task => task.id === draggedTask.id ? {...task, status: newStatus} : task);
            updateTask(_tasks);
            setDraggedTask(null);
        }
    }

    const groupedTasks =
        {
            todo: tasks.filter(task => task.status === 'todo'),
            inProgress: tasks.filter(task => task.status === 'inProgress'),
            closed: tasks.filter(task => task.status === 'closed')
        };

    return (
        <div className="todo-list">
            {
                Header.map(
                    (headerItem) => {
                        const taskStatus = groupedTasks[headerItem.key];
                        const hasTasks = taskStatus.length > 0;

                        return (
                            <div
                                key={headerItem.key}
                                className={`column ${headerItem.key} ${hasTasks ? 'with-content' : 'empty'}`}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDrop(headerItem.key)}
                            >
                                <h3>{headerItem.name}</h3>
                                {
                                    hasTasks && groupedTasks[headerItem.key].map(
                                        (task) => (
                                            <div className='task-container'>
                                                <div
                                                    key={task.id}
                                                    className="task-item"
                                                    draggable
                                                    onDragStart={() => setDraggedTask(task)}
                                                    onDragEnd={() => setDraggedTask(null)}
                                                >
                                                    <Cell
                                                        cellKey={headerItem.key}
                                                        value={task[headerItem.key]}
                                                        row={task}
                                                    />
                                                </div>
                                            </div>

                                        ))
                                }
                            </div>
                        )
                    })}
        </div>
    )
}

export default TodoList