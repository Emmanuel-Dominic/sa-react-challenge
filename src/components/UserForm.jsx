import React, { useState, useReducer } from 'react';
import { reducer } from '../reducer/index';


const UserForm = ({ onAddUser, onUpdateUser, editUser }) => {
    const [formErrors, setFormErrors] = useState({});
    const [state, dispatch] = useReducer(reducer, editUser ? { form: editUser } : { form: {
        name: '',
        email: '',
        phone: '',
    }});

    const validateForm = (name, email, phone) => {
        const errors = {};
      
        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 3) {
            errors.name = 'Name must be at least 3 characters long';
        }
      
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            errors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            errors.email = 'Invalid email address';
        }
      
        const phoneRegex = /^(\+?\d{1,2}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
        if (!phone) {
            errors.phone = 'Phone number is required';
        } else if (!phoneRegex.test(phone)) {
            errors.phone = 'Invalid phone number';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm(state.form.name, state.form.email, state.form.phone);
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
        } else {
            if (editUser) {
                onUpdateUser(editUser.id, state.form);
            } else {
                onAddUser(state.form);
            }
            dispatch({ type: 'RESET_FORM' });
        }
    };

    const handleChange = (event) => {
        dispatch({ type: 'UPDATE_FORM', field: event.target.name, value: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" value={state.form.name} className="form-control" onChange={handleChange} />
                {formErrors.name && <div className="text-danger">{formErrors.name}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Email Address</label>
                <input type="email" name="email" value={state.form.email} className="form-control" onChange={handleChange} />
                {formErrors.email && <div className="text-danger">{formErrors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Phone</label>
                <input type="text" name="phone" value={state.form.phone} className="form-control" onChange={handleChange} />
                {formErrors.phone && <div className="text-danger">{formErrors.phone}</div>}
            </div>
            <button type="submit" className="btn btn-sm btn-primary">{editUser ? 'Update User' : 'Add User'}</button>
        </form>
    );
};

export default UserForm;
