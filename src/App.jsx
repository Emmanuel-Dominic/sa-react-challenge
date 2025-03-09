import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from './action/index';
import Button from './components/Button';
import './App.css'

function App() {
    const users = useSelector((state) => state.users);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

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
                                <Button type="button" text="Edit" />
                                <Button type="button" text="Delete" />
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5">
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
