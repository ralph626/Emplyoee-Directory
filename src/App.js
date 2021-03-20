import { getRandomUsers } from "./API";
import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  useEffect(() => {
    getRandomUsers(100).then(({ data }) => {
      setUsers(data.results);
      setFilteredUsers(data.results);
    });
  }, []);

  const handleChange = (event) => {
    const searchValue = event.target.value;
    //use this input value to FILTER to list of users
    const filteredUsers = users.filter((user) => {
      //return true if user first name or last name contain the search value
      return (
        user.name.first.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.name.last.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
    setFilteredUsers(filteredUsers);
  };

  return (
    <>
      <h1 className="p-5 shadow" style={{ textAlign: "center" }}>
        Employee Directory
        <span>
          <input type="email" onChange={handleChange} class="form-control" />
          <div id="emailHelp" class="form-text">
            Type in a name to search for an employee
          </div>
        </span>
      </h1>
      <div className="row">
        {filteredUsers.map((user) => (
          <EmployeeCard {...user} />
        ))}
      </div>
    </>
  );
}
