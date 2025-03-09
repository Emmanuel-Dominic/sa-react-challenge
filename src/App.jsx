import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, registerUser, updateUser, deleteUser } from './action/index';
import UserForm from './components/UserForm';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css'

function App() {
    const [show, setShow] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const users = useSelector((state) => state.users);
    const loading = useSelector((state) => state.loading);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();
    const searchInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleClose = () => {
        setShow(false);
        setEditUser(null);
    };
    const handleShow = () => setShow(true);

    const handleAddUser = (newUser) => {
        dispatch(registerUser(newUser));
        handleClose();
    };

    const handleUpdateUser = (userId, updatedUser) => {
        dispatch(updateUser(userId, updatedUser));
        handleClose();
    };

    const handleEditUser = (user) => {
        setEditUser(user);
        handleShow();
    };

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [users, searchTerm]);

    const handleSearch = useCallback((event) => {
        setSearchTerm(event.target.value);
    }, []);

    if(loading) return <div>Loading...</div>;
    if(error) return <div>{error}</div>;

    return (
        <div className="App">
            <div className="inline-field">
                <Button className="btn-sm" variant="primary" onClick={handleShow}>
                    Add user
                </Button>
                <input
                        type="search"
                        value={searchTerm}
                        onChange={handleSearch}
                        ref={searchInputRef}
                        placeholder="Search users..."
                    />
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{editUser ? 'Edit User' : 'Register User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UserForm onAddUser={handleAddUser} onUpdateUser={handleUpdateUser} editUser={editUser} />
                </Modal.Body>
            </Modal>
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
                    { filteredUsers.length > 0 ? filteredUsers.map((user, index) => (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <Button className="btn-sm m-2" variant="primary" onClick={() => handleEditUser(user)}>
                                    Edit
                                </Button>
                                <Button className="btn-sm m-2" variant="danger" onClick={() => handleDeleteUser(user.id)}>
                                    Delete
                                </Button>
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
