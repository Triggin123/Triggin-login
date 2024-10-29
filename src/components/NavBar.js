import React from 'react';
import { Col, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserName, isSuperAdmin } from '../utils';

const NavBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const objName = {
    "/home": "Dashboard",
    "/groups": "Groups",
    "/questions": "Questions",
    "/users": "Users",
  }
  return (
    <Row>
      <Col className='col-2'>
        <Nav className='side-nav flex-column'>
          <span className='nav-title text-center'>Triggin</span>
          <Nav.Link>
            <Link to={"/home"}>
              <i className="bi bi-house-door"></i>
              <span className='ml-1'>
                Home
              </span>
            </Link>
          </Nav.Link>
          {isSuperAdmin() &&
          <Nav.Link>
            <Link to='/users'><i className="bi bi-box"></i>
              <span className='ml-1'>Users</span>
            </Link>
          </Nav.Link>}
        </Nav>
      </Col>
      <Col>
        <header className='d-flex justify-content-between align-items-center'>
          <div className="headline-2">
            <span>
              Home . {objName[location.pathname]}
            </span>
          </div>
          <div className='d-flex align-items-center'>
            <span className='mr-3'>
              <i className="bi bi-bell"></i>
            </span>
            <Navbar.Collapse className='show' id="basic-nav-dropdown">
              <Nav className="me-auto">
                <NavDropdown title={<>
                  <span className='mr-1'>
                    <img src="https://flatlogic.github.io/sofia-react-template/static/media/user.13df436f.svg" width={50} alt="User" />
                  </span>
                  <span className='mr-1'>{getUserName()}</span>
                </>
                } id="collasible-nav-dropdown">

                  <NavDropdown.Item onClick={() => {
                    localStorage.clear();
                    navigate("/")
                  }}>Logout</NavDropdown.Item>
                  {/* <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item> */}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </Col>
    </Row >
  );
};

export default NavBar;