// import React from 'react';
// import BackwardCounter from './components/BackwardCounter';
// import ForwardCounter from './components/ForwardCounter';

// function App() {
//   return (
//     <React.Fragment>
//       {/* <ForwardCounter />
//       <BackwardCounter /> */}
//     </React.Fragment>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";

function App() {
  const httpData = useHttp();

  const { isLoading, error, sendRequest: fetchTasks } = httpData;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const transformTasks = (taskObject) => {
      const loadedTasks = [];
      for (const key in taskObject) {
        loadedTasks.push({ ...taskObject[key], id: key });
      }
      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://react-http-f2474-default-rtdb.firebaseio.com/tasks.json",
      },
      transformTasks
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
