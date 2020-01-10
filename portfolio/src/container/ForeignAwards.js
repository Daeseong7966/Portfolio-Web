import React from 'react';
import styled from 'styled-components';
import AwardsComponent from '../components/ForeignAwardsComponent';
import ForeignAwardsPopup from '../popup/ForeignAwardsPopup.cra';
import Popup from 'reactjs-popup';
import axios from 'axios';
import {SERVER} from '../config/config.json';

import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSchool } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const ForeignAwardsTab = styled.div`
    display : flex;
`;

const Screen = styled.div`
    display : flex;
    width : 830px;
    height : 750px;
    flex-direction : column;
    overflow-y : scroll;
    position : relative;
`;

class ForeignAwards extends React.Component{
    state = {
        foreignawards : [],
    }

    SendShowData = () => {
        this.props.changeScreen(true);
    };

    fetchFeeds(){
        axios.get(`${SERVER}/foreignawards`)
        .then((response) => {
            response.data.sort(function(a, b){
                if(a.date_year > b.date_year){
                    return 1;
                }
                if(a.date_year < b.date_year){
                    return -1;
                }
                if(a.date_month > b.date_month){
                    return 1;
                }

                if(a.date_month < b.date_month){
                    return -1;
                }
                return 0;
            });

            this.setState({
                foreignawards : response.data
            });
        })
        .catch((error) => {
            console.log("error : ", error);
            alert("수상내역을 불러오는 데 실패하였습니다.");
        })
    };

    componentWillMount(){
        this.fetchFeeds();
    }

    render(){
        return(
            <ForeignAwardsTab>
                <IconButton style = {{position : "absolute", top : "0px", left : "0px", color : "black"}} onClick = {this.SendShowData}>
                    <FontAwesomeIcon icon = {faSchool} />
                </IconButton>

                <Popup modal trigger={
                    <IconButton style = {{position : "absolute", top : "0px", right : "0px", color : "black"}}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                }>{close => <ForeignAwardsPopup close={close} fetchAwards = {() => this.fetchFeeds()} />}</Popup>
                
                <Screen>
                    {
                        this.state.foreignawards.reverse().map(awards => <AwardsComponent data = {awards} fetchAwards = {() => this.fetchFeeds()} /> )
                    }
                </Screen>
                
            </ForeignAwardsTab>
        );
    }
};

export default ForeignAwards;