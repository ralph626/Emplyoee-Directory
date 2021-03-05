import { useState, useEffect } from "react";
import { getRandomUsers } from "./API";
import "./App.css";

function App() {
  const [users, setUsers] = useState({ userData: [] });
  const [filteredUsers, setFilteredUsers] = useState({ userData: [] });
  const [sortDirection, setSortDirection] = useState(1);

  useEffect(() => {
    getAndSetUsers(20);
  }, []);

  const getAndSetUsers = async (count) => {
    try {
      const {
        data: { results },
      } = await getRandomUsers(count);
      //flatten data for easier access and sorting later
      const userData = results.map((user) => {
        return {
          firstName: user.name.first,
          lastName: user.name.last,
          phone: user.phone,
          age: user.dob.age,
          email: user.email,
          gender: user.gender,
          picture: user.picture.thumbnail,
        };
      });
      setUsers({ userData });
      setFilteredUsers({ userData });
    } catch (err) {
      //handle error here in case API call goes wrong
      throw new Error(err);
    }
  };

  const handleFilterUsers = (val) => {
    const filtered = users.userData.filter((a) => {
      return (
        a.firstName.toLowerCase().includes(val) ||
        a.lastName.toLowerCase().includes(val) ||
        a.email.toLowerCase().includes(val) ||
        ("" + a.phone).includes(val) ||
        a.gender.toLowerCase().includes(val) ||
        ("" + a.age).includes(val)
      );
    });
    setFilteredUsers({ userData: filtered });
  };

  const handleSort = (key) => {
    const sorted = filteredUsers.userData.sort((a, b) => {
      if (a[key] < b[key]) return -1 * sortDirection;
      if (a[key] > b[key]) return 1 * sortDirection;
      return 0;
    });
    setFilteredUsers({ userData: sorted });
    setSortDirection(-sortDirection);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }} className="bg-light p-5">
        WELCOME TO EMPLOYEE DIRECTORY!
      </h1>
      <div
        style={{ marginLeft: "10%", width: "80%" }}
        className="btn-group"
        role="group"
        aria-label="Basic example"
      >
        <div className="input-group ml-3">
          <span className="input-group-text" id="inputGroup-sizing-default">
            Search An Employee...
          </span>
          <input
            onChange={({ target: { value } }) =>
              handleFilterUsers(value.toLowerCase())
            }
            placeholder="or click on a header to sort"
            type="text"
            className="form-control"
          />
        </div>
        <button
          type="button"
          onClick={() => getAndSetUsers(20)}
          className="btn btn-primary"
        >
          Get A Few
        </button>
        <button
          type="button"
          onClick={() => getAndSetUsers(200)}
          className="btn btn-primary"
        >
          Get A Lot
        </button>
        <button
          type="button"
          onClick={() => getAndSetUsers(1000)}
          className="btn btn-primary"
        >
          Get A Ton
        </button>
      </div>
      <table
        className="table-primary mt-4"
        style={{ width: "70%", marginLeft: "15%" }}
      >
        <thead>
          <tr>
            <th scope="col"></th>
            <th onClick={() => handleSort("firstName")} scope="col">
              First Name
            </th>
            <th onClick={() => handleSort("lastName")} scope="col">
              Last Name
            </th>
            <th onClick={() => handleSort("age")} scope="col">
              Age
            </th>
            <th onClick={() => handleSort("gender")} scope="col">
              Gender
            </th>
            <th onClick={() => handleSort("phone")} scope="col">
              Phone
            </th>
            <th onClick={() => handleSort("email")} scope="col">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.userData.map((user, i) => (
            <tr key={`user${i}`}>
              <th scope="row">
                <img src={user.picture} alt="user" />
              </th>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
