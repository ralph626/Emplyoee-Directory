import { getRandomUsers } from "./API";
import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";

export default function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortedUsers, setSortedUsers] = useState({ users: [] });
  useEffect(() => {
    getRandomUsers(100).then(({ data }) => {
      setUsers(data.results);
      setFilteredUsers(data.results);
      setSortedUsers({ users: data.results });
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
    setSortedUsers({ users: filteredUsers });
  };

  const sortUser = (key) => {
    const [key1, key2] = key.split(".");
    const sorted = filteredUsers.sort((a, b) => {
      if (key2) {
        return a[key1][key2] < b[key1][key2]
          ? -1
          : a[key1][key2] > b[key1][key2]
          ? 1
          : 0;
      }
      return a[key1] < b[key1] ? -1 : a[key1] > b[key1] ? 1 : 0;
    });

    setSortedUsers({ users: sorted });
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
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button
          onClick={() => sortUser("name.first")}
          className="btn btn-lg btn-secondary"
        >
          Sort By First Name
        </button>
        <button
          onClick={() => sortUser("name.last")}
          className="btn btn-lg btn-secondary"
        >
          Sort By Last Name
        </button>
        <button
          onClick={() => sortUser("email")}
          className="btn btn-lg btn-secondary"
        >
          Sort By Email
        </button>
        <button
          onClick={() => sortUser("phone")}
          className="btn btn-lg btn-secondary"
        >
          Sort By Phone Number
        </button>
      </div>
      <div className="row">
        {sortedUsers.users.map((user) => (
          <EmployeeCard {...user} />
        ))}
      </div>
    </>
  );
}
