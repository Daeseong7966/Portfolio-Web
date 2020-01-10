import React from 'react';
import styled from 'styled-components';
import AwardsComponent from '../components/AwardsComponent';
import AwardsPopup from '../popup/AwardsPopup.cra';
import Popup from 'reactjs-popup';
import axios from 'axios';
import {SERVER} from '../config/config.json';

import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

const SchoolAwardsTab = styled.div`
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

class SchoolAwards extends React.Component{
    state = {
        schoolawards : [],
    }

    SendShowData = () => {
        this.props.changeScreen(false);
    };

    fetchFeeds(){
        axios.get(`${SERVER}/schoolawards`)
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
                schoolawards : response.data
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
            <SchoolAwardsTab>
                <IconButton style = {{position : "absolute", top : "0px", left : "0px", color : "black"}} onClick = {this.SendShowData}>
                    <FontAwesomeIcon icon = {faTrophy} />
                </IconButton>

                <Popup modal trigger={
                    <IconButton style = {{position : "absolute", top : "0px", right : "0px", color : "black"}}>
                        <FontAwesomeIcon icon={faEdit} />
                    </IconButton>
                }>{close => <AwardsPopup close={close} fetchAwards = {() => this.fetchFeeds()} />}</Popup>
                
                <Screen>
                    {
                        this.state.schoolawards.reverse().map(awards => <AwardsComponent data = {awards} fetchAwards = {() => this.fetchFeeds()} /> )
                    }
                </Screen>
                
            </SchoolAwardsTab>
        );
    }
};

export default SchoolAwards;