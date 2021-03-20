import { getRandomUsers } from "./API";
import { useState, useEffect } from "react";
import EmployeeCard from "./components/EmployeeCard";

export default function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getRandomUsers(100).then(({ data }) => {
      console.log(data.results);
      setUsers(data.results);
    });
  }, []);
  return (
    <>
      <h1>HELLO</h1>
      <div className="row">
        {users.map((user) => (
          <EmployeeCard {...user} />
        ))}
      </div>
    </>
  );
}
