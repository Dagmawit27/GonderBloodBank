import { checkUsername, registerUser } from '../api';
import { useState } from 'react'
import './register.css';
import { Link, useNavigate } from 'react-router-dom'
import { Heart, User, Mail, Phone, Calendar, MapPin } from 'lucide-react'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    secondName: '',
    lastName: '',
    dob: '',
    contact: '',
    email: '',
    gender: '',
    bloodGroup: '',
    address: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [usernameStatus, setUsernameStatus] = useState({
    checking: false,
    available: null,
    message: ''
  })

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  // Check username availability
  const checkUsernameAvailability = async (username) => {
    if (!username || username.length < 3) {
      setUsernameStatus({ checking: false, available: null, message: '' })
      return
    }

    setUsernameStatus({ checking: true, available: null, message: 'Checking...' })

    try {
      const data = await checkUsername(username)

      if (data.success) {
        setUsernameStatus({
          checking: false,
          available: data.available,
          message: data.message
        })
      } else {
        setUsernameStatus({
          checking: false,
          available: false,
          message: 'Error checking username'
        })
      }
    } catch (error) {
      console.error('Username check error:', error)
      setUsernameStatus({
        checking: false,
        available: false,
        message: 'Error checking username'
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Check username availability when username changes
    if (name === 'username') {
      const timeoutId = setTimeout(() => {
        checkUsernameAvailability(value)
      }, 500) // Debounce for 500ms
      
      // Clear previous timeout
      if (handleChange.timeoutId) {
        clearTimeout(handleChange.timeoutId)
      }
      handleChange.timeoutId = timeoutId
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'
    } else if (usernameStatus.available === false) {
      newErrors.username = 'Username is not available'
    }
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!formData.secondName.trim()) newErrors.secondName = 'Second name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!formData.dob) newErrors.dob = 'Date of birth is required'
    if (!formData.contact.trim()) newErrors.contact = 'Contact number is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.gender) newErrors.gender = 'Gender is required'
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Blood group is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,15}$/
    if (formData.contact && !phoneRegex.test(formData.contact.replace(/\D/g, ''))) {
      newErrors.contact = 'Please enter a valid phone number'
    }

    // Age validation (must be at least 18)
    if (formData.dob) {
      const today = new Date()
      console.log(formData.dob)
      const birthDate = new Date(formData.dob)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old to donate blood'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("button clicked")
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const registrationData = {
        firstName: formData.firstName,
        secondName: formData.secondName,
        lastName: formData.lastName,
        dob: formData.dob,
        username: formData.username,
        password: formData.password,
        contact: formData.contact,
        email: formData.email,
        bloodGroup: formData.bloodGroup,
        address: formData.address
      }

      console.log('Sending registration data:', registrationData)

      const data = await registerUser(registrationData)
      console.log('Registration response:', data)

      if (data.success) {
        alert('Registration successful! Please login to continue.')
        sessionStorage.setItem('username', data.username)
        sessionStorage.setItem('email', data.email)
        sessionStorage.setItem('donorId', data.donorId)
        navigate('/login')
      } else {
        setErrors({ submit: data.message || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      console.error('Registration error:', error)
      setErrors({ submit: 'Registration failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='register'>
      <div className="container">
        <div className='register-container'>
          {/* Header */}
          <div className="text-center">
            <div className='title-div'>
              <Heart size={48} style={{ color: '#dc2626' }} />
              <h1>Sign Up</h1>
            </div>
            <p>
              Register to become a blood donor and start saving lives today
            </p>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit}>
              {errors.submit && (
                <div className='error-submit'>
                  {errors.submit}
                </div>
              )}

              {/* Personal Information */}
              <div className='personal-info'>
                <h3>
                  <User size={24} />
                  Personal Information
                </h3>
                
                <div className="grid grid-3">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter first name" required />
                    {errors.firstName && <div className="error">{errors.firstName}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="secondName">Second Name *</label>
                    <input type="text" id="secondName" name="secondName" value={formData.secondName} onChange={handleChange} placeholder="Enter second name" required />
                    {errors.secondName && <div className="error">{errors.secondName}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter last name" required />
                    {errors.lastName && <div className="error">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="username">Username *</label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} placeholder="Choose a unique username" required />
                  {usernameStatus.checking && (
                    <div style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>
                      {usernameStatus.message}
                    </div>
                  )}
                  {!usernameStatus.checking && usernameStatus.available === true && (
                    <div style={{ color: '#059669', fontSize: '0.875rem', marginTop: '4px' }}>
                      ✓ {usernameStatus.message}
                    </div>
                  )}
                  {!usernameStatus.checking && usernameStatus.available === false && formData.username && (
                    <div style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '4px' }}>
                      ✗ {usernameStatus.message}
                    </div>
                  )}
                  {errors.username && <div className="error">{errors.username}</div>}
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label htmlFor="dob">
                      <Calendar size={16} style={{ display: 'inline', marginRight: '5px' }} />
                      Date of Birth *
                    </label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />
                    {errors.dob && <div className="error">{errors.dob}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="gender">Gender *</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="error">{errors.gender}</div>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className='contact-info'>
                <h3>
                  <Phone size={24} />
                  Contact Information
                </h3>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label htmlFor="contact">
                      <Phone size={16} style={{ display: 'inline', marginRight: '5px' }} />
                      Phone Number *
                    </label>
                    <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} placeholder="Enter phone number" required />
                    {errors.contact && <div className="error">{errors.contact}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <Mail size={16} style={{ display: 'inline', marginRight: '5px' }} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      required
                    />
                    {errors.email && <div className="error">{errors.email}</div>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">
                    <MapPin size={16} style={{ display: 'inline', marginRight: '5px' }} />
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                    rows="3"
                  />
                </div>
              </div>

              {/* Medical Information */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  color: '#dc2626', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <Heart size={24} />
                  Medical Information
                </h3>

                <div className="form-group">
                  <label htmlFor="bloodGroup">Blood Group *</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your blood group</option>
                    {bloodTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <div className="error">{errors.bloodGroup}</div>}
                </div>
              </div>

              {/* Account Security */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  color: '#dc2626', 
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  🔒 Account Security
                </h3>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter password (min 6 characters)"
                      required
                    />
                    {errors.password && <div className="error">{errors.password}</div>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      required
                    />
                    {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading || usernameStatus.checking || (formData.username && usernameStatus.available === false)}
                  style={{ 
                    width: '100%', 
                    maxWidth: '300px',
                    fontSize: '1.1rem',
                    padding: '15px',
                    opacity: (loading || usernameStatus.checking || (formData.username && usernameStatus.available === false)) ? 0.6 : 1
                  }}
                >
                  {loading ? 'Creating Account...' : 'Register as Donor'}
                </button>
              </div>

              {/* Login Link */}
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ color: '#6b7280' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#dc2626', textDecoration: 'none', fontWeight: '600' }}>
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register