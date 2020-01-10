import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit } from '@fortawesome/free-regular-svg-icons';
import Popup from 'reactjs-popup';
import SkillPopup from '../popup/SkillPopup';
import { SERVER } from '../config/config.json';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
    body{
        background : linear-gradient(180deg, #fff 50%, #efefef 50%);
    }
`;

const SkillTab = styled.div`
    width : 960px;
    height : 550px;
    background-color : white;
    display : flex;
    flex-direction : column; 
    outline : #d7d7d7 solid 1px;
    box-shadow : 2px 2px 2px 2px gray;
`;

const TobBox = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Do+Hyeon|Noto+Sans+KR|Solway&display=swap');
    display : flex;
    flex : 1;
    background-color : #343a40;
    color : white;
    font-size : 35px;
    font-family : 'Bebas Neue', 'Solway';
    align-items : center;
    padding-left : 20px;
`;

const BottomBox = styled.div`
    display : flex;
    flex : 9;
    flex-direction : row;
`;

const Tab = styled.div`
    display : flex;
    flex : 3;
    flex-direction : column;
    margin-top : 30px;
`;

const MenuItem = styled.li`
    list-style-type : none;
    margin-bottom : 10px;
`;

const Text = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Do+Hyeon|Noto+Sans+KR|Solway&display=swap');
`;

const Title = styled(Text)`
    font-family : 'Bebas Neue', 'Do Hyeon';
    font-size : 35px;
    margin-left : 10px;
`;

const Project = styled(Title)`
    margin-top : 40px;
`;

const ProjectTitle = styled(Title)`
    font-size : 25px;
`;

const Info = styled(Title)`
    font-size : 23px;
`;

const UnderLine = styled.hr`
    background-color : black;
    width : 90%;
    height : 3px;
    margin-left : 0;
`;

class Skill extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstskill : [],
            secondskill : [],
            thirdskill : []
        };
    }

    getSkill = () => {
        axios.get(`${SERVER}/skill`)
        .then((response) => {
            this.setState({
                firstskill : response.data[0],
                secondskill : response.data[1],
                thirdskill : response.data[2]
            });
        })
        .catch((error) => {
            console.log("Load fail");
        })
    }

    componentWillMount(){
        this.getSkill();
    }

    render(){
        return(
            <Fragment>
                <GlobalStyle />
                <SkillTab>
                    <IconButton onClick = {this.props.onShowProfile} style = {{position : "absolute", top : "0px", left : "0px", color : "black"}}>
                        <FontAwesomeIcon icon={faUser} />
                    </IconButton>

                    <Popup modal trigger={
                        <IconButton style = {{position : "absolute", top : "0px", right : "0px", color : "black"}}>
                            <FontAwesomeIcon icon={faEdit} />
                        </IconButton>
                    }>{close => <SkillPopup close={close} getSkill = {() => this.getSkill()} />}</Popup>
                    <TobBox>Skill</TobBox>
                    <BottomBox>
                        <Tab>
                            <Title>{this.state.firstskill.skillname}</Title>
                            <UnderLine />
                            <ul style = {{ paddingLeft : "0", marginLeft : "10px"}}>
                            <MenuItem><Info>{this.state.firstskill.firstskillinfo}</Info></MenuItem>
                            <MenuItem><Info>{this.state.firstskill.secondskillinfo}</Info></MenuItem>
                            <MenuItem><Info>{this.state.firstskill.thirdskillinfo}</Info></MenuItem>
                            </ul>
                            <Project>Project</Project>
                            <ProjectTitle>{this.state.firstskill.projectname}</ProjectTitle>
                            <Info>{`(${this.state.firstskill.projectinfo})`}</Info>
                        </Tab>

                        <Tab>
                            <Title>{this.state.secondskill.skillname}</Title>
                            <UnderLine />
                            <ul style = {{ paddingLeft : "0", marginLeft : "10px"}}>
                                <MenuItem><Info>{this.state.secondskill.firstskillinfo}</Info></MenuItem>
                                <MenuItem><Info>{this.state.secondskill.secondskillinfo}</Info></MenuItem>
                                <MenuItem><Info>{this.state.secondskill.thirdskillinfo}</Info></MenuItem>
                            </ul>
                            <Project>Project</Project>
                            <ProjectTitle>{this.state.secondskill.projectname}</ProjectTitle>
                            <Info>{`(${this.state.secondskill.projectinfo})`}</Info>
                        </Tab>

                        <Tab>
                            <Title>{this.state.thirdskill.skillname}</Title>
                            <UnderLine />
                            <ul style = {{ paddingLeft : "0", marginLeft : "10px"}}>
                                <MenuItem><Info>{this.state.thirdskill.firstskillinfo}</Info></MenuItem>
                                <MenuItem><Info>{this.state.thirdskill.secondskillinfo}</Info></MenuItem>
                                <MenuItem><Info>{this.state.thirdskill.thirdskillinfo}</Info></MenuItem>
                            </ul>
                            <Project>Project</Project>
                            <ProjectTitle>{this.state.thirdskill.projectname}</ProjectTitle>
                            <Info>{`(${this.state.thirdskill.projectinfo})`}</Info>
                        </Tab>
                    </BottomBox>
                </SkillTab>
            </Fragment>
        );
    }
}

export default Skill;