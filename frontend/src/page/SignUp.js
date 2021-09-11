import React, {useEffect, useState} from 'react'
import axios from "axios";

const INITIAL_VALUE = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
}

function SignUp({history}) {
  const [user, setUser] = useState(INITIAL_VALUE);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState('');

  function handleChangeUser(e) {
    const {name, value} = e.target;
    setUser(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    if (success) {
      history.push('/sign-in')
    }
  }, [success])

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors('');
    setLoading(true);
    try {
      if (user.password !== user.confirm_password) {
        alert('Password mismatched!')
        return;
      }
      let newUser = await axios.post('http://localhost:8080/api/v1/sign-up', user);
      if (newUser) {
        setSuccess(true)
      }
    } catch(e) {
      console.log(e.response.data.errors)
      setErrors(e.response.data.errors)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={'container'}>
      <div className="row">
        <div className="col-md-12">
          <div className="card d-flex flex-column align-items-stretch vh-100 bg-transparent shadow-none"
               style={{width: '400px', margin: 'auto'}}>
            <div className="card-body  align-items-center">
              <form onSubmit={handleSubmit} className={'bg-white p-4'}>
                <h5 className="card-title pb-3">Sign Up</h5>
                {errors && errors.map((error,i ) => (
                  <li key={i} className={'small'}>{error.msg}</li>
                ))}
                <div className="form-outline mb-4">
                  <input type="text"
                         id="formName"
                         onChange={handleChangeUser}
                         className="form-control" name={'name'}
                         value={user.name}/>
                  <label className="form-label"
                         htmlFor="formName">
                    Name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email"
                         id="formEmail"
                         value={user.email}
                         name={'email'}
                         onChange={handleChangeUser}
                         className="form-control"/>
                  <label className="form-label" htmlFor="formEmail">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="formPassword"
                         name={'password'}
                         value={user.password}
                         onChange={handleChangeUser}
                         className="form-control"/>
                  <label className="form-label"
                         htmlFor="formPassword">
                    Password
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input type="password" id="formConfirmPassword"
                         name={'confirm_password'}
                         value={user.confirm_password}
                         onChange={handleChangeUser}
                         className="form-control"/>
                  <label className="form-label"
                         htmlFor="formConfirmPassword">
                    Confirm Password
                  </label>
                </div>
                <button type="submit" disabled={loading} className="btn btn-primary btn-block">
                  {loading ? 'Signing...' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
