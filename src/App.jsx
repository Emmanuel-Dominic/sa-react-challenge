import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { REACT_APP_BASE_URL } from "./utils/index";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async() => {
        try{
            const response = await axios.get(REACT_APP_BASE_URL);
            setUsers(response.data);
            setLoading(false);
        }catch(err){
            setError("Failed to fetch users!");
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error}</div>;

    return (
        <div className="App">
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>No:</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    { users.length > 0 ? users.map((user, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button type="button">Edit</button>
                                <button type="button">Delete</button>
                            </td>
                        </tr>
                    )) : (
                        <tr colSpan="5">
                            <td>
                              <h4>No users found!</h4>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default App
