import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import { SERVER } from '../config/config.json';

var check_num = /[0-9]/;
var check_eng = /[a-zA-z]/;
var check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

class ForeignAwardsPopup extends React.Component{
    state = {
        section : "",
        prize : "",
        agency : "",
        year : "",
        month : "",
        info : "",
        year_error : false,
        year_error_text : ""
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    NumYearChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if(!check_kor.test(this.state.year) && !check_eng.test(this.state.year) && check_num.test(this.state.year) && !check_spc.test(this.state.year)){
            this.setState({
                year_error : false,
                year_error_text : ""
            })
        }
        else{
            this.setState({
                year_error : true,
                year_error_text : "Only use num!!"
            })
        }
    }

    setMonth = (e) => {
        this.setState({
            month : e.target.value
        });
    };

    upLoadAwards(fetchAwards, close){
        if(this.state.section === "" || this.state.prize === "" || this.state.agency === "" || this.state.year === "" || this.state.month === "" || this.state.info === ""){
            alert("빈칸을 모두 채워주세요.");
        }else{
            axios.post(`${SERVER}/foreignawards`, {
                contest : this.state.section,
                award_name : this.state.prize,
                agency : this.state.agency,
                date_year : this.state.year,
                date_month : this.state.month,
                award_info : this.state.info
            })
            .then((response) => {
                if(response.status === 200){
                    alert("수상 내역을 추가하였습니다.");
                    fetchAwards();
                    close();
                }else{
                    alert("프로필 업데이트에 실패했습니다.");
                }
            })
            .catch((err) => {
                alert("프로필 업데이트 중 서버와의 오류가 발생했습니다.");
                console.log("error : ", err);
            })
        }
    };

    render(){
        return(
                <div>
                    <IconButton onClick={this.props.close} style = {{color : "black", position : "absolute", top : "0px", right : "0px"}}>
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </IconButton>
                    <TextField name = "section" onChange = {this.handleChange} label = "수상부분" variant = "outlined" style = {{margin : "20px"}} />
                    <TextField name = "prize" onChange = {this.handleChange} label = "상" variant = "outlined" style = {{marginTop : "20px"}} />
                    <div style = {{display : "flex", flexDirection : "column"}}>
                        <TextField name = "agency" onChange = {this.handleChange} label = "수상기관" variant = "outlined" style = {{marginLeft : "20px", width : "61%"}} />
                        <div style = {{display : "flex", flexDirection : "row"}}>
                            <TextField name = "year" onChange = {this.NumYearChange} label = "수상년도" variant = "outlined" style = {{margin : "20px", width : "20%"}} error = {this.state.year_error} helperText = {this.state.year_error_text} />
                            <FormControl variant = "outlined" style = {{width : "20%", marginTop : "20px"}} >
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value = {this.state.month}
                                    onChange = {this.setMonth}
                                >
                                    <MenuItem value = {"1"}>1</MenuItem>
                                    <MenuItem value = {"2"}>2</MenuItem>
                                    <MenuItem value = {"3"}>3</MenuItem>
                                    <MenuItem value = {"4"}>4</MenuItem>
                                    <MenuItem value = {"5"}>5</MenuItem>
                                    <MenuItem value = {"6"}>6</MenuItem>
                                    <MenuItem value = {"7"}>7</MenuItem>
                                    <MenuItem value = {"8"}>8</MenuItem>
                                    <MenuItem value = {"9"}>9</MenuItem>
                                    <MenuItem value = {"10"}>10</MenuItem>
                                    <MenuItem value = {"11"}>11</MenuItem>
                                    <MenuItem value = {"12"}>12</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <TextField name = "info" onChange = {this.handleChange} variant = "outlined" style = {{marginLeft : "20px", width : "95%"}} label = "예) 대구소프트웨어고등학교에서 '체육'과목으로 '교과 우수상'을 수상하였습니다." />
                    </div>
                    <div style = {{display : "flex", justifyContent : "center", marginTop : "10px"}}>
                        <IconButton style={{color : "black"}} onClick = {() => this.upLoadAwards(this.props.fetchAwards, this.props.close)} >
                            <FontAwesomeIcon icon={faCheckCircle} />
                        </IconButton>
                    </div>
                </div>
        );
    }
}

export default ForeignAwardsPopup;