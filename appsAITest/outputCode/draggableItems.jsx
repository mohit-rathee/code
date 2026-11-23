"use client";

import React, { useState } from 'react';

export default function AppComponent() {
  const initialTasks = [{"id":1,"title":"Design UI","status":"Todo","color":"blue","group":"Design"},{"id":2,"title":"Write backend","status":"In Progress","color":"green","group":"Backend"},{"id":3,"title":"Deploy to server","status":"Done","color":"purple","group":"DevOps"}]
  const columns = ["Todo","In Progress","Done"]
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({"title":"","color":"gray","group":""});
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDrop = (e, status) => {
  const taskId = e.dataTransfer.getData("task-id");
  setTasks(prev => prev.map(task => task.id === Number(taskId) ? {
    ...task,
    status
  } : task));
}
  const handleDragStart = (e, id) => {
  e.dataTransfer.setData("task-id", id);
}
  const handleSaveTask = () => {
  if (!newTask.title.trim()) return;
  if (editingTask) {
    setTasks(prev => prev.map(t => t.id === editingTask.id ? {
      ...editingTask,
      ...newTask
    } : t));
  } else {
    setTasks([...tasks, {
      id: Date.now(),
      ...newTask,
      status: "Todo"
    }]);
  }
  setNewTask({
    title: "",
    color: "gray",
    group: ""
  });
  setEditingTask(null);
  setIsModalOpen(false);
}
  const handleEdit = task => {
  setEditingTask(task);
  setNewTask({
    title: task.title,
    color: task.color,
    group: task.group
  });
  setIsModalOpen(true);
}
  const handleDelete = id => {
  setTasks(prev => prev.filter(task => task.id !== id));
}


  return (    <div
      style={{"width":"100%","height":"100%"}}
      data-component-id="root">
      <div
        style={{
  "width": "100%",
  "height": "100%"
}}
        data-component-id="panel-1">
        <div
          className="min-h-screen bg-gray-900 text-white p-6"
          data-component-id="task-manager-root">
          <div
            className="flex justify-between items-center mb-6"
            data-component-id="header">
            <h1
              className="text-3xl font-bold"
              data-component-id="app-title">
              Task Manager
            </h1>
            <button
              onClick={() => {
  setNewTask({
    title: "",
    color: "gray",
    group: ""
  });
  setEditingTask(null);
  setIsModalOpen(true);
}}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
              data-component-id="add-task-button">
              {editingTask ? "Edit Task" : "Add Task"}
            </button>
          </div>
          <div
            className="flex gap-6"
            data-component-id="columns-container">
            {columns.map((col, index) => (
              <div
                key={col}
                onDrop={e => {
  const taskId = e.dataTransfer.getData("task-id");
  setTasks(prev => prev.map(task => task.id === Number(taskId) ? {
    ...task,
    status: col
  } : task));
}}
                onDragOver={e => e.preventDefault()}
                className="flex-1 bg-gray-800 p-4 rounded-xl shadow-lg"
                data-component-id="element-1">
                <h2
                  className="text-xl font-bold text-white mb-4"
                  data-component-id="column-title">
                  {col}
                </h2>
                <div
                  className="flex flex-col gap-3"
                  data-component-id="task-list">
                  {tasks.map((task, index) => (
                    task.status === col && (
                      <div
                        key={task.id}
                        draggable={true}
                        onDragStart={e => e.dataTransfer.setData("task-id", task.id)}
                        className={`bg-${task.color}-700 text-white p-3 rounded-lg shadow-md cursor-grab hover:bg-${task.color}-600`}
                        data-component-id="element-2">
                        <div
                          className="flex justify-between items-center"
                          data-component-id="element-3">
                          <div
                            data-component-id="element-4">
                            <div
                              className="font-semibold"
                              data-component-id="task-title">
                              {task.title}
                            </div>
                            <div
                              className="text-sm text-gray-300"
                              data-component-id="task-group">
                              {task.group}
                            </div>
                          </div>
                          <div
                            className="flex gap-2"
                            data-component-id="element-5">
                            <button
                              onClick={() => {
  setEditingTask(task);
  setNewTask({
    title: task.title,
    color: task.color,
    group: task.group
  });
  setIsModalOpen(true);
}}
                              className="text-xs bg-yellow-500 hover:bg-yellow-400 px-2 py-1 rounded"
                              data-component-id="edit-task-button">
                              Edit
                            </button>
                            <button
                              onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                              className="text-xs bg-red-600 hover:bg-red-500 px-2 py-1 rounded"
                              data-component-id="delete-task-button">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    )                  ))}                </div>
              </div>
            ))}          </div>
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
              data-component-id="modal-overlay">
              <div
                className="bg-gray-800 p-6 rounded-lg w-full max-w-md"
                data-component-id="modal">
                <h2
                  className="text-2xl font-bold mb-4"
                  data-component-id="modal-title">
                  {editingTask ? "Edit Task" : "Add New Task"}
                </h2>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={e => setNewTask({
  ...newTask,
  title: e.target.value
})}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  data-component-id="input-title" />
                <input
                  type="text"
                  value={newTask.group}
                  onChange={e => setNewTask({
  ...newTask,
  group: e.target.value
})}
                  placeholder="Enter group name..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  data-component-id="input-group" />
                <select
                  value={newTask.color}
                  onChange={e => setNewTask({
  ...newTask,
  color: e.target.value
})}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white mb-4"
                  data-component-id="select-color">
                  <option
                    value="gray"
                    data-component-id="element-6">
                    Gray
                  </option>
                  <option
                    value="blue"
                    data-component-id="element-7">
                    Blue
                  </option>
                  <option
                    value="green"
                    data-component-id="element-8">
                    Green
                  </option>
                  <option
                    value="purple"
                    data-component-id="element-9">
                    Purple
                  </option>
                  <option
                    value="red"
                    data-component-id="element-10">
                    Red
                  </option>
                  <option
                    value="yellow"
                    data-component-id="element-11">
                    Yellow
                  </option>
                </select>
                <div
                  className="flex justify-end gap-2"
                  data-component-id="modal-actions">
                  <button
                    onClick={() => {
  setIsModalOpen(false);
  setEditingTask(null);
  setNewTask({
    title: "",
    color: "gray",
    group: ""
  });
}}
                    className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                    data-component-id="cancel-button">
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTask}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500"
                    data-component-id="save-button">
                    {editingTask ? "Update" : "Add"}
                  </button>
                </div>
              </div>
            </div>
          )}        </div>
      </div>
    </div>
  );
}