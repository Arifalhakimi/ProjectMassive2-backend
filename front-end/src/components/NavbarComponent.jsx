import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Dropdown } from "react-bootstrap";
import axios from "axios";
import { navLinks } from "./../data/index";
import { NavLink, useNavigate, useLocation } from "react-router-dom";


const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);
  const location = useLocation();
  const isMitraPage = location.pathname.includes("/mitra/");
  const isLoginPage = location.pathname.includes("/login");
  const isRegisterPage = location.pathname.includes("/register");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const changeBackgroundColor = () => {
      if (window.scrollY > 10) {
        setChangeColor(true);
      } else {
        setChangeColor(false);
      }
    };
    const getSessionData = async () => {
      try {
        const response = await axios.get('http://localhost:7730/api/v1/session-data');
        console.log('Response from server:', response.data);
        if (response.data) {
          setLoggedIn(true);
          setUserName(response.data.nama);
          // setUserData(response.data);

        }
      } catch (error) {
        console.error('Error getting session data:', error);
      }
    };
    getSessionData();

    const storedUserData = sessionStorage.getItem('user');
    if (storedUserData) {
      // Parse data JSON yang disimpan di sessionStorage
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }

    // Pasang event listener scroll dan bersihkan saat komponen di-unmount
    window.addEventListener("scroll", changeBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []); // Pastikan parameter dependencies array kosong jika hanya ingin menjalankan efek ini sekali



  let Navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    setLoggedIn(false);
    setUserName('');
    Navigate("/login");
  };
  return (
    <div>
      <Navbar expand="lg" className={changeColor ? "color-active" : ""}>
        <Container>
          <Navbar.Brand href="/" className="logo-navbar fs-3 fw-bold">
            {isMitraPage ? "Bengkel.In" : null}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {isMitraPage ? (
              // Tampilkan sesuatu jika di halaman mitra
              <div className="icon-mitra">
                <div className="icon-navbar-mitra d-flex">
                  <i className="fas fa-bell"></i>
                  <i className="fas fa-mail-bulk"></i>
                  <i className="fas fa-flag"></i>
                  <i className="fas fa-user-alt"></i>
                  <p>{userData.nama}</p>
                </div>
              </div>
            ) : isLoginPage || isRegisterPage ? (
              // Tampilkan sesuatu jika di halaman login atau register
              <Navbar.Brand href="/" className="logo-navbar fs-3 fw-bold">
                Bengkel.In
              </Navbar.Brand>
            ) : (
              // Tampilkan NavLinks dan dropdown/tombol Login/Register sesuai status login
              <>
                <Navbar.Brand href="/" className="logo-navbar fs-3 fw-bold">
                  Bengkel.In
                </Navbar.Brand>
                <Nav className="mx-auto text-center">
                  {navLinks.map((Links) => (
                    <div className="nav-link" key={Links.id}>
                      <NavLink
                        to={Links.path}
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                        end
                      >
                        {Links.text}
                      </NavLink>
                    </div>
                  ))}
                </Nav>
                {userData ? (
                  // Tampilkan dropdown jika pengguna sudah login
                  <Dropdown>
                    <Dropdown.Toggle className="dropdown" id="dropdown-basic">
                      <i className="fas fa-user-alt"></i>
                      {userData.nama}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => Navigate("/profile")}>
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                ) : (
                  <>
                    <div className="text-center">
                      <button
                        className="btn btn-danger rounded-4 mx-3"
                        onClick={() => Navigate("/login")}
                      >
                        Masuk
                      </button>
                    </div>
                    <div className="text-center">
                      <button
                        className="btn btn-danger rounded-4 "
                        onClick={() => Navigate("/register")}
                      >
                        Daftar
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarComponent;
