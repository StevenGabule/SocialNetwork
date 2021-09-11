import React, {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import axios from "axios";

function Menu({location, history}) {
  const [logout, setLogout] = useState(false);
  const token = localStorage.getItem('jwt');
  const data = JSON.parse(token);

  React.useEffect(() => {
    if (logout) {
      history.push('/sign-in')
    }
  }, [logout])

  async function handleLogout() {
    try {
      let user = await axios.post('http://localhost:8080/api/v1/sign-out');
      if (user) {
        localStorage.removeItem('jwt')
        setLogout(true)
      }
    } catch(e) {
      console.log(e.message)
    }
  }

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarExample01"
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"/>
          </button>
          <div className="collapse navbar-collapse" id="navbarExample01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className={location.pathname === '/' ? 'nav-item active' : 'nav-item'}>
                <Link to={'/'} className={'nav-link'}>Home</Link>
              </li>
              {data && data.user ? (
                <li className={'nav-item'}>
                  <a href={'javascript:void(0)'} onClick={handleLogout} className={'nav-link'}>Logout</a>
                </li>
              ) : (
                <>
                  <li className={location.pathname === '/sign-up' ? 'nav-item active' : 'nav-item'}>
                    <Link to={'/sign-up'} className={'nav-link'}>Sign Up</Link>
                  </li>
                  <li className={location.pathname === '/sign-in' ? 'nav-item active' : 'nav-item'}>
                    <Link to={'/sign-in'} className={'nav-link'}>Sign In</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default withRouter(Menu);
