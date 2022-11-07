import './header.scss'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import ReactFlagsSelect from 'react-flags-select'
import logo from '../../images/logo.png'
import { useTranslation } from 'react-i18next'
import i18n from '../../translations/i18n'
import '../../translations/i18n'

import { logout } from '../actions/auth'
import { RootState } from '../store'

const Header = (): JSX.Element => {
    const { t } = useTranslation()

    const dispatch = useDispatch()

    const [language, setLanguage] = useState(window.localStorage.getItem('i18nextLng')?.toUpperCase() || 'GB')

    const { isLoggedIn } = useSelector((state: RootState) => state.auth)

    const logOut = () => {
        dispatch(logout())
    }

    useEffect(() => {    
        i18n.changeLanguage(language.toLowerCase())
    }, [])
 
    const handleOnclick=(value: string)=>{
        setLanguage(value);
        i18n.changeLanguage(value.toLowerCase())
    }
    
    return (
        <Navbar sticky="top" bg='light'>
            <Container className="py-2 px-5">
                <a className='header_logo-img' href="/">
                    <img
                        width={70}
                        src={logo}
                        alt="surfaceflow logo"
                    />
                </a>
                <Nav className="me-auto">
                    <a className="header_logo" href="/">SurfaceFlow</a>
                </Nav>
                <ReactFlagsSelect
                    selected={language}
                    onSelect={(code: string) => handleOnclick(code)}
                    countries={["RU", "GB", "FR", "UA", "RS"]}
                    customLabels={{ RU: "RU", GB: "EN", FR: "FR", UA: "UA", RS: "RS" }}
                    placeholder="Select Language"    
                    className="header-flags"        
                />
                <Nav className="header_nav-links">
                    <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/home">{t("home")}</NavLink>
                    <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/ourteam">{t("ourteam")}</NavLink>
                    <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/blog">{t("blog")}</NavLink>
                    <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/ourproducts">{t("ourproducts")}</NavLink>
                    {!isLoggedIn ? 
                    <>
                        <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/login">{t("signin")}</NavLink>
                        {/* <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/registration">{t("signup")}</NavLink> */}
                    </> : 
                    <NavLink className="header_nav-link" activeClassName="header_nav-link-active" to="/login"  onClick={logOut}>{t("logout")}</NavLink>}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header