/* eslint-disable react/jsx-pascal-case */
import React, { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Popup from 'reactjs-popup';
import axios from 'axios';
import { SERVER } from '../config/config.json';

import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faBold, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import Profile_img from '../images/profile2.jpg';
import ProfilePopup from '../popup/ProfilePopup';

const GlobalStyle = createGlobalStyle`
    body{
        background : linear-gradient(180deg, #fff 50%, #efefef 50%);
    }
`;

const Profile_Tab = styled.div`
    width : 960px;
    height : 550px;
    background-color : white;
    display : flex;
    flex-direction : column; 
    outline : #d7d7d7 solid 1px;
    box-shadow : 2px 2px 2px 2px gray;
`;

const Top_Box = styled.div`
    display : flex;
    flex : 8;
    border-bottom : 1px solid #d7d7d7;
`;

const Bottom_Box = styled.div`
    display : flex;
    flex : 2;
    background-color : #343a40;
    justify-content : center;
    align-items : center;
`;

const Left_Box = styled.div`
    display : flex;
    flex : 3.5;
    align-items : center;
    justify-content : center;
`;

const Right_Box = styled.div`
    display : flex;
    flex-direction : column;
    flex : 6.5;
    justify-content : center;
`;

const Img_Box = styled.div`
    width : 70%;
    height : 70%;
`;

const Text = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Noto+Sans+KR|Solway&display=swap');
`;

const NameText = styled(Text)`
    font-family : 'Solway', 'Noto Sans KR';
    font-weight : Bold;
    font-size : 30px;
`;

const TitleText = styled(Text)`
    display : block;
    float : left;
    font-family : 'Bebas Neue', cursive;
    margin-right : 30px;
    font-size : 20px;
    width : 120px;
    line-height : 20px;
`;

const InforText = styled.span`
    font-size : 20px;
    font-family : 'Noto Sans KR', 'Solway';
    line-height : 20px;
`;

const MenuItem = styled.li`
    list-style-type : none;
    margin-bottom : 20px;
`;

class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profile : [],
        }
    }

    getProfile(){
        axios.get(`${SERVER}/profile`)
        .then((response) => {
            this.setState({
                profile : response.data[0],
            });
        })
        .catch((error) => {
            console.log("fail");
        })
    };

    componentWillMount(){
        this.getProfile();
    }

    render(){
        return(
            <Fragment>
                <GlobalStyle />
                <Profile_Tab>
                    <Top_Box>
                        <Popup modal trigger={
                            <IconButton style = {{position : "absolute", top : "0px", right : "0px", color : "black"}} >
                                <FontAwesomeIcon icon={faEdit} />
                            </IconButton>
                        }>{close => <ProfilePopup close={close} getProfile = {() => this.getProfile()} />}</Popup>
                        <IconButton onClick = {this.props.onShowSkill} style = {{position : "absolute", top : "0px", left : "0px", color : "black"}}>
                            <FontAwesomeIcon icon = {faChartLine} />
                        </IconButton>
                        <Left_Box>
                            <Img_Box><img src = { Profile_img } alt = "Profile Image" style = {{ width : "100%", height : "100%" }} /></Img_Box>
                        </Left_Box>

                        <Right_Box>
                            <NameText>{`${this.state.profile.korean}(${this.state.profile.english})`}</NameText>
                            <span style = {{fontSize : "20px"}}>{`${this.state.profile.client}`}</span>
                            <hr style={{ backgroundColor : "black", width : "90%", height : "1px", marginLeft : "0"}} />
                            <ul style = {{ paddingLeft : "0"}}>
                                <MenuItem><TitleText>Age</TitleText><InforText>{`${this.state.profile.age}`}</InforText></MenuItem>
                                <MenuItem><TitleText>Education</TitleText><InforText>{`${this.state.profile.education}`}</InforText></MenuItem>
                                <MenuItem><TitleText>Phone</TitleText><InforText>{`${this.state.profile.phone}`}</InforText></MenuItem>
                                <MenuItem><TitleText>E-mail</TitleText><InforText>{`${this.state.profile.email}`}</InforText></MenuItem>
                            </ul>
                        </Right_Box>
                    </Top_Box>
                    <Bottom_Box>
                        <a href = {`${this.state.profile.facebook}`} target = "_blank" rel = "noopener noreferrer">
                            <IconButton>
                                <FontAwesomeIcon icon = {faFacebook} style = {{color : "white"}} />
                            </IconButton>
                        </a>

                        <a href = {`${this.state.profile.github}`} target = "_blank" rel = "noopener noreferrer">
                            <IconButton>
                                <FontAwesomeIcon icon = {faGithub} style = {{color : "white"}} />
                            </IconButton>
                        </a>

                        <a href = {`${this.state.profile.rocket}`} target = "_blank" rel = "noopener noreferrer">
                            <IconButton>
                                <FontAwesomeIcon icon={faRocket} style = {{color : "white"}} />
                            </IconButton>
                        </a>

                        <a href = {`${this.state.profile.blog}`} target = "_blank" rel = "noopener noreferrer">
                            <IconButton>
                                <FontAwesomeIcon icon = {faBold} style = {{color : "white"}} />
                            </IconButton>
                        </a>
                    </Bottom_Box>
                </Profile_Tab>
            </Fragment>
       );
    }
}

export default Profile;