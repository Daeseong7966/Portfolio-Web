import React from 'react';
import Profile from '../screens/Profile';
import styled from 'styled-components';
import Skill from '../screens/Skill';

const Container = styled.div`
    width : 100%;
    height : 100%;
    display : flex;
    justify-content : center;
    align-items : center;
`;

function MidProfile({value, onShowSkill, onShowProfile }) {
    console.log(value);
        return(
            <Container>
                {
                    value === true ? <Profile onShowSkill = {onShowSkill} /> : <Skill onShowProfile = {onShowProfile} />
                }
            </Container>
        );
}

export default MidProfile;