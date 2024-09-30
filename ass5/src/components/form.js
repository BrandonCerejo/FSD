import React, { useState } from 'react';
import styles from './form.css'

const UserDataForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error on change
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Check for empty fields
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required.';
      }
    });
    
    // Validate email format
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }
    
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      setSuccessMessage('');
    } else {
      // Reset form and show success message
      setFormData({ name: '', email: '', age: '' });
      setSuccessMessage('Form submitted successfully!');
      setErrors({});
    }
  };

  return (
    <div className="form-container">
      <h2>User Data Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={errors.name ? 'error' : ''}/>
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="text" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''}/>
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange}className={errors.age ? 'error' : ''}/>
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>

      {successMessage && <div className="success-message">{successMessage}</div>}
    </div>
  );
};

export default UserDataForm;
