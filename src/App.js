import React, { useState } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);

  const addUserHandler = (uName, uAge) => {
    setUsersList((prevUsersList) => [
      ...prevUsersList,
      { name: uName, age: uAge, id: Math.random().toString() },
    ]);
  };

  return (
    <div className="flex flex-col space-y-5 max-w-2xl mx-auto">
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </div>
  );
}

export default App;
