import React, { useState, useEffect } from 'react';
import './TaskManager.css'; // Keep original CSS file name
import backgroundImage from '../assets/3.png'; // Import the background image

const TaskManager = () => {
    const colors = [
        '#FF6F61', // Coral
        '#6B5B95', // Purple
        '#88B04B', // Green
        '#F7CAC9', // Pink
        '#92A8D1', // Blue
        '#955251', // Burgundy
        '#B9B300', // Olive
        '#FFB400', // Gold
    ]; // Attractive color array
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('low');
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [activeSection, setActiveSection] = useState('toDo'); // Track active section

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(interval);
    }, [tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: editingTaskId || Date.now(),
            name: taskName,
            description: taskDescription,
            dueDate,
            priority,
            completed: false,
            color: colors[tasks.length % colors.length], // Assign a color based on task count
        };

        if (editingTaskId) {
            setTasks(tasks.map(task => (task.id === editingTaskId ? newTask : task)));
            setEditingTaskId(null); // Reset editing task ID
        } else {
            setTasks(prevTasks => [...prevTasks, newTask]);
        }

        setTaskName('');
        setTaskDescription('');
        setDueDate('');
        setPriority('low');
        e.target.reset();
    };

    const handleEdit = (task) => {
        setTaskName(task.name);
        setTaskDescription(task.description);
        setDueDate(task.dueDate);
        setPriority(task.priority);
        setEditingTaskId(task.id);
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: true } : task
        ));
    };

    const handleMarkNotCompleted = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: false } : task
        ));
    };

    const currentTime = new Date();
    
    const getCurrentSectionTasks = (section) => {
        return tasks.filter(task => {
            const taskDueDate = new Date(task.dueDate);
            if (section === 'toDo') {
                return !task.completed && taskDueDate >= currentTime;
            } else if (section === 'completed') {
                return task.completed;
            } else if (section === 'overdue') {
                return !task.completed && taskDueDate < currentTime;
            }
            return false;
        });
    };

    return (
        <div 
          className="task-manager" 
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Apply the background image
        >
            <h1>Task Manager</h1>
            <div className="current-time">{time} - {date}</div>
            <form className="task-form" onSubmit={handleSubmit}>
                <div className="task-form-card">
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task Description"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                    </select>
                    <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
                </div>
            </form>

            <div className="section-buttons">
                <button onClick={() => setActiveSection('toDo')} className={activeSection === 'toDo' ? 'active' : ''}>To Do</button>
                <button onClick={() => setActiveSection('overdue')} className={activeSection === 'overdue' ? 'active' : ''}>Overdue</button>
                <button onClick={() => setActiveSection('completed')} className={activeSection === 'completed' ? 'active' : ''}>Completed</button>
                <button onClick={() => setActiveSection('all')} className={activeSection === 'all' ? 'active' : ''}>All Tasks</button>
            </div>

            <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h2>
            <div className="task-gallery">
                {activeSection === 'all' ? (
                    tasks.map((task) => (
                        <div key={task.id} className="task-card" style={{ backgroundColor: task.color }}>
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="task-buttons">
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    getCurrentSectionTasks(activeSection).map((task) => (
                        <div key={task.id} className="task-card" style={{ backgroundColor: task.color }}>
                            <h3>{task.name}</h3>
                            <p>{task.description}</p>
                            <p>Due Date: {task.dueDate}</p>
                            <p>Priority: {task.priority}</p>
                            <div className="task-buttons">
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                {activeSection === 'completed' ? (
                                    <button onClick={() => handleMarkNotCompleted(task.id)}>Mark as Incomplete</button>
                                ) : (
                                    <button onClick={() => handleComplete(task.id)}>Complete</button>
                                )}
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
                {activeSection !== 'all' && getCurrentSectionTasks(activeSection).length === 0 && <p>No tasks available.</p>}
            </div>
        </div>
    );
};

export default TaskManager;
