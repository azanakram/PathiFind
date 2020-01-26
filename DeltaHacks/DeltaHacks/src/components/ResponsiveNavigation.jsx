import React, { useState } from 'react'
import { Link } from '@reach/router'
import firebase from 'firebase'
import { useEffect } from 'react'

import PFlogo from '../pages/images/pf_logo.png'

function ResponsiveNavigation({ navLinks, background, hoverBackground, linkColor, logo }) {

    const [hoverIndex, setHoverIndex] = useState(-1)
    const [navOpen, setNavOpen] = useState(false)

    const signOut = () => {
        firebase.auth().signOut();
        window.location.reload();
    }

    return (
        <nav
            className="responsive-toolbar"
            style={{ background }}
            >
            <ul
                style={{ background }}
                className={navOpen ? 'active' : ''}
            >
                <figure onClick={() => { setNavOpen(!navOpen) }}>
                    <img src={PFlogo} height="40px" width="40px" alt="logo-toggle"
                    style={{paddingLeft: 10}} />
                </figure>
                {navLinks.map((link, index) =>
                    <li
                        onMouseEnter={() => setHoverIndex(index)}
                        onMouseLeave={() => setHoverIndex(-1)}
                        style={{ background: hoverIndex === index ? (hoverBackground || '#999') : '' }}
                    >
                        <Link
                            to={link.path}
                            style={{ color: linkColor }}
                        >
                            {link.text}
                            <i className={link.icon} />
                        </Link>
                    </li>
                )}
                <li>
                    <Link
                        to={'/'}
                        onClick={() => {signOut()}}
                        style={{ color: 'white', float:"right", paddingLeft: 1370}}
                    >
                        {'Sign Out'}
                        <i className={'ion-ios-log-out'}/>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default ResponsiveNavigation;