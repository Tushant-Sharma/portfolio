import React, { Suspense, useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import { LoadingSpinner } from "../utils/svgs";
const Header = () => {


    const [scrollDirection, setScrollDirection] = useState('down');
    const [scrollPosition, setScrollPosition] = useState(0);

    const checkScrollDirection = () => {
        const currentScrollPosition = window.pageYOffset;
        if (currentScrollPosition > scrollPosition) {
            setScrollDirection('down');
        } else {
            setScrollDirection('up');
        }
        setScrollPosition(currentScrollPosition);
    };
    useEffect(() => {
        window.addEventListener('scroll', checkScrollDirection);
        // return () => window.removeEventListener('scroll', checkScrollDirection);
    }, [scrollPosition]);

    const [nav, setNav] = useState<boolean>(false);

    const showNavBar = () => {
        if (nav) { setNav(false) }
        else setNav(true)
    }

    const hideNavBar = () => {
        setNav(false);
    }
    const navLogo: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30%"
    }

    const goBack = useNavigate()
    const location = useLocation()
    const canGoBack = window.history.length > 1 && location.pathname != '/';


    return (
        <>
            <div className={`header-area ${scrollDirection === 'up' ? 'show' : 'hide'}`}>
                <div className="container">
                    <div className="gx-row d-flex align-items-center justify-content-between">
                        <div className="logo" style={navLogo}>
                            {
                                canGoBack && location.pathname !== '/home' ? <><span style={{ color: "#fff", cursor: "pointer", marginTop: "-10px", textDecoration: "overline" }} onClick={() => { goBack(-1) }} >

                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                </span>
                                </> : <></>
                            }

                            <Link to="/">
                                <h1 className="title">TS</h1>
                            </Link>
                            {/* <img src="../src/assets/images/logo.svg" alt="Logo" /> */}
                        </div>

                        <nav className={nav == true ? " navbar active" : "navbar"}>
                            <ul className="menu">
                                <li><NavLink onClick={hideNavBar} className={({ isActive }) => (isActive ? 'active' : '')} to="home">Home</NavLink></li>
                                <li><NavLink onClick={hideNavBar} className={({ isActive }) => (isActive ? 'active' : '')} to="about">About</NavLink></li>
                                <li><NavLink onClick={hideNavBar} className={({ isActive }) => (isActive ? 'active' : '')} to="blogs">Blogs</NavLink></li>
                                <li><NavLink onClick={hideNavBar} className={({ isActive }) => (isActive ? 'active' : '')} to="contact">Contact</NavLink></li>
                            </ul>
                            <Link to="contact" onClick={showNavBar} className="theme-btn">Let's talk</Link>
                        </nav>
                        <Link to="contact" className="theme-btn">Let's talk</Link>
                        <div onClick={showNavBar} className={nav == true ? "show-menu active" : "show-menu"}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Footer = () => {
    return (<>
        <footer className="footer-area">
            <div className="container">
                <div className="footer-content text-center">
                    <Link to="/home" className="logo">
                        <h1 className="title">TS</h1>
                        {/* <img src="../src/assets/images/logo.svg" alt="Logo" /> */}
                    </Link>
                    <ul className="footer-menu">
                        <li><Link to="home">Home</Link></li>
                        <li><Link to="about">About </Link></li>
                        <li><Link to="blogs">Blogs</Link></li>
                        <li><Link to="contact">Contact</Link></li>
                    </ul>
                    <p className="copyright">
                        &copy; All rights reserved by <span>Tushant Sharma</span>
                    </p>
                </div>
            </div>
        </footer>
    </>)
}


const HomeLayout: React.FC = () => {
    return (
        <>
            <Header />
            <section className="about-area">
                <div className="container ">
                    <Suspense fallback={<LoadingSpinner />}>
                        <Outlet />
                    </Suspense>
                </div>
            </section>
            <Footer />
        </>
    )
}


export { Header, Footer, HomeLayout };