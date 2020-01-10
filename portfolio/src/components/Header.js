import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Logo = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Bebas+Neue&display=swap');
    height : 3.5rem;
    width : 100vw;
    color : black;
    text-align : center;
    font-family : 'Bebas Neue', serif;
    font-size : 2.5rem;
    line-height : 3.5rem;
    margin-top : 1rem;
`;

const Menu = styled.div`
    margin-top : 1.5rem;
    width : 100vw;
    height : 3.5rem;
    display : flex;
    justify-content : center;
`;

const Header = () => {
    return(
        <div>
            <Logo>Portfolio</Logo>
            <Menu>
                <Link to="/"><button className = "MenuItem">Profile</button></Link>
                <Link to = "/activities"><button className = "MenuItem">Activities</button></Link>
                <Link to = "/awards"><button className = "MenuItem">Awards</button></Link>
                <Link to = "/other"><button className = "MenuItem">Other</button></Link>
                <Link to = "/project"><button className = "MenuItem">Project</button></Link>
            </Menu>
        </div>
    );
};

export default Header;