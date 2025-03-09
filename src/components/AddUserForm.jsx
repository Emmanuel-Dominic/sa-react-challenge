import React, { useReducer } from 'react';
import { reducer } from '../reducer/index';


const AddUserForm = ({ onAddUser }) => {
    const [state, dispatch] = useReducer(reducer, { form: {
        name: '',
        email: '',
        phone: '',
    }});

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddUser(state.form);
        dispatch({ type: 'RESET_FORM' });
    };

    const handleChange = (event) => {
        dispatch({ type: 'UPDATE_FORM', field: event.target.name, value: event.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" name="name" value={state.form.name} className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Email Address</label>
                <input type="email" name="email" value={state.form.email} className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Phone</label>
                <input type="text" name="phone" value={state.form.phone} className="form-control" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-sm btn-primary">Submit</button>
        </form>
    );
};

export default AddUserForm;
