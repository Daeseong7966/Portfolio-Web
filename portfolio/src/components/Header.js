import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import '../styles/Header.css';

const Logo = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');
    height : 3.5rem;
    width : 100vw;
    background-color : #212529;
    color : white;
    text-align : center;
    font-family : 'Roboto Slab', serif;
    font-size : 2rem;
    line-height : 3.5rem;
`;

const Menu = styled.div`
    width : 100vw;
    height : 3.5rem;
    background-color : #343a40;
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