import React from 'react';
import styled from 'styled-components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

import FirstSkill from './FirstSkill';
import SecondSkill from './SecondSkill';
import ThirdSkill from './ThirdSkill';

const Popup = styled.div`
    display : flex;
    flex-direction : column;
`;

const TobBox = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`;

const Screen = styled.div`
    display : flex;
    justify-content : center;
    align-items : center;
`;

class SkillPopup extends React.Component{
    state = {
        value : "first"
    };

    handleChange = (e) => {
        this.setState({ value : e.target.value });
    };

    showScreen(getSkill, close){
        if(this.state.value === "first"){
            return <FirstSkill getSkill = {() => getSkill()} close = {close} />;
        }else if(this.state.value === "second"){
            return <SecondSkill getSkill = {() => getSkill()} close = {close} />;
        }else if(this.state.value === "third"){
            return <ThirdSkill getSkill = {() => getSkill()} close = {close} />;
        }else{
            console.log("error");
        }
    };

    render(){
        return(
            <Popup>
                <TobBox>
                    <IconButton onClick={this.props.close} style = {{color : "black", position : "absolute", top : "0px", right : "0px"}}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </IconButton>
                    <FormControl component = "fieldset">
                        <FormLabel component = "legend" style = {{ fontSize : "30px", color : "black", marginLeft : "100px"}} >Skill</FormLabel>
                        <RadioGroup
                            aria-label = "Skill"
                            name = "skills"
                            value = {this.state.value}
                            onChange = {this.handleChange}
                            style = {{
                                display : "flex",
                                flexDirection : "row"
                            }}
                        >
                            <FormControlLabel value = "first" control = {<Radio />} label = "First" />
                            <FormControlLabel value = "second" control = {<Radio />} label = "Second" />
                            <FormControlLabel value = "third" control = {<Radio />} label = "Third" />
                        </RadioGroup>
                    </FormControl>
                </TobBox>
                <Screen>
                    {this.showScreen(this.props.getSkill, this.props.close)}
                </Screen>
            </Popup>
        );
    }
}

export default SkillPopup;