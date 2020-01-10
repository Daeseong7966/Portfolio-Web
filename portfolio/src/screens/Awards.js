import React from 'react';
import styled from 'styled-components';
import SchoolAwards from '../container/SchoolAwards';
import ForeignAwards from '../container/ForeignAwards';

const Screen = styled.div`
    display : flex;
`;

class Awards extends React.Component{
    state = {
        show : true,
    }

    changeScreen = (showData) => {
        this.setState({show : showData});
    };

    render(){
        return(
            <Screen>
                {
                    this.state.show === true ? <SchoolAwards changeScreen = {this.changeScreen} /> : <ForeignAwards changeScreen = {this.changeScreen} />
                }
            </Screen>
        );
    }
}

export default Awards;