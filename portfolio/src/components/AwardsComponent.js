import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AwardsPopupupd from '../popup/AwardsPopup.upd';
import Popup from 'reactjs-popup';

import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { SERVER } from '../config/config.json';

const AwardsBox = styled.div`
    width : 800px;
    display : flex;
    flex-direction : column;
    background-color : #fbfbfc;
    border : 1px solid #e4e4e5;
    margin-top : 30px;
    box-shadow : 5px 5px 5px #666;
`;

const Text = styled.span`
    @import url('https://fonts.googleapis.com/css?family=Bebas+Neue|Noto+Sans+KR|Solway&display=swap');
`;

const Title = styled(Text)`
    font-family : 'Noto Sans KR', 'Bebas Neue';
    font-size : 25px;
    margin-left : 25px;
    font-weight : bold;
`;

const Agency = styled(Text)`
    font-family : 'Noto Sans KR', 'Bebas Neue';
    font-size : 20px;
    font-weight : thin;
    margin-left : 25px;
`;

const Day = styled(Text)`
    font-family : 'Noto Sans KR', 'Bebas Neue';
    font-size : 15px;
    font-weight : thin;
    margin-left : 25px;
`;

const Info = styled(Text)`
    font-family : 'Noto Sans KR', 'Bebas Neue';
    font-size : 20px;
    font-weight : thin;
    margin-left : 25px;
`;

class AwardsComponent extends React.Component{
    removeByid(id, fetchAwards){
        // eslint-disable-next-line no-restricted-globals
        if(confirm("게시물을 삭제하시겠습니까?")){
            console.log(id);
            axios.delete(`${SERVER}/schoolawards/${id}`)
            .then((response) => {
                console.log(response);
                alert("게시물을 삭제했습니다.");
                fetchAwards();
            })
            .catch((err) => {
                console.log(err);
                alert("게시물을 삭제하는 중 오류가 발생했습니다.");
            })
        }
    };

    render(){
        const { data } = this.props;
        return(
            <AwardsBox>
                <div>
                    <IconButton style = {{ float : "right", margin : "3px", color : "#3e3e3e"}} size = "small" onClick = {() => this.removeByid(data.id, this.props.fetchAwards)} >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </IconButton>

                    <Popup modal trigger = {
                        <IconButton style = {{float : "right", margin : "3px", color : "#3e3e3e"}} size = "small" >
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </IconButton>
                    }>{close => <AwardsPopupupd close = {close} fetchAwards = {this.props.fetchAwards} id = {data.id} />}</Popup>
                    

                    <Title>{`${data.contest} - ${data.award_name}`}</Title>
                </div>
                <div style = {{display : "flex", flexDirection : "column", marginTop : "15px"}}>
                    <Agency>{`수상기관 - ${data.agency}`}</Agency>
                    <Day>{`${data.date_year}년 ${data.date_month}월 수상`}</Day>
                    <Info>{data.award_info}</Info>
                </div>
            </AwardsBox>
        );
    }
}

export default AwardsComponent;