import React, { useState, useEffect } from "react";
import "./ToDo.css";

function Task({ task, index, finishTask, removeTask }) {
  return (
    <div
      className="task"
      style={{ textDecoration: task.done ? "line-through" : "" }}
    >
      {task.name}

      <button style={{ background: "red" }} onClick={() => removeTask(index)}>
        x
      </button>
      <button
        className="doneLabel"
        style={{ display: task.done ? "none" : "" }}
        onClick={() => finishTask(index)}
      >
        Done
      </button>
      <button className="bucketName">{task.bucket}</button>
    </div>
  );
}

function Bucket({ bucket, i }) {
  return (
    <option key={i} value={bucket}>
      {bucket}
    </option>
  );
}

function CreateBucket({ addBucket }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addBucket(value);
    setValue("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Create a new bucket</label>
      <input
        type="text"
        className="input"
        value={value}
        placeholder="Create a new bucket"
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}

export default function Todo() {
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [buckets, setBuckets] = useState(["Important", "Update"]);
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([
    {
      name: "Fix issue #SC-121",
      done: true,
      bucket: "Important"
    },
    {
      name: "Meeting at 4PM",
      done: true,
      bucket: "Update"
    },
    {
      name: "Deploymet",
      done: false,
      bucket: "Important"
    }
  ]);
  const [selectedBucket, setSelectedBucket] = useState("Update");

  useEffect(() => {
    setRemainingTasks(tasks.filter((task) => !task.done).length);
  },[tasks]);

  const addTask = (name) => {
    console.log(name);
    const newTasks = [...tasks, { name, done: false, bucket: selectedBucket }];
    setTasks(newTasks);
  };

  const onChangeUser = (event) => {
    setSelectedBucket(event.target.value);
  };

  const addBucket = (title) => {
    const newBucket = [...buckets, title];
    setSelectedBucket(title);
    setBuckets(newBucket);
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const finishTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = true;
    setTasks(newTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTask(value);
    setValue("");
  };
  return (
    <div className="todo-container">
      <h1 className="header">Yet to-do ({remainingTasks})</h1>
      <div className="tasks">
        {tasks.map((task, index) => (
          <Task
            task={task}
            index={index}
            finishTask={finishTask}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>

      <div className="create-task">
        <form>
            <div>
          <label htmlFor="createTask ">Add a new task</label>
          <input
            type="text"
            id="createTask"
            className="input"
            value={value}
            placeholder="Add a new task"
            onChange={(e) => setValue(e.target.value)}
          />
          </div>
          <div>
          <label htmlFor="bucketSelect">Choose the bucket </label>
          <select
            id="bucketSelect"
            value={selectedBucket}
            onChange={onChangeUser}
          >
            {buckets.map((bucket, index) => (
              <Bucket bucket={bucket} key={index} />
            ))}
          </select>
          </div>
        </form>
      </div>
      <div className="todo-buttonWrapper">
        <button className="todo-button" onClick={handleSubmit}>
          Add task
        </button>
      </div>

      <div className="create-bucket">
        <CreateBucket addBucket={addBucket} />
      </div>
    </div>
  );
}
