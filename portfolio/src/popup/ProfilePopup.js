import React from "react";
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { SERVER } from '../config/config.json';

const Popup = styled.div`
    display : flex;
    flex-direction : column;
`;

const PostTab = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
`;

var check_num = /[0-9]/;
var check_eng = /[a-zA-z]/;
var check_spc = /[~!@#$%^&*()_+|<>?:{}]/;
var check_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

class ProfilePopup extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            Korean_Name : "",
            English_Name : "",
            Client : "",
            Age : "",
            Education : "",
            Phone : "",
            Email : "",
            Facebook : "",
            GitHub : "",
            Rocket : "",
            Blog : "",
            korName_error : false,
            engName_error : false,
            Client_error : false,
            Age_error : false,
            Education_error : false,
            Phone_error : false,
            engName_error_text : "",
            Client_error_text : "",
            korName_error_text : "",
            Age_error_text : "",
            Education_error_text : "",
            Phone_error_text : "* Form : 010-1234-5678",
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    KoreanNameChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if(check_kor.test(this.state.Korean_Name) && !check_eng.test(this.state.Korean_Name) && !check_num.test(this.state.Korean_Name) && !check_spc.test(this.state.Korean_Name)){
            this.setState({
                korName_error : false,
                korName_error_text : ""
            })
        }
        else{
            this.setState({
                korName_error : true,
                korName_error_text : "Only use Korean!!"
            })
        }
    }

    EnglishNameChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });

        if(!check_kor.test(this.state.English_Name) && check_eng.test(this.state.English_Name) && !check_num.test(this.state.English_Name) && !check_spc.test(this.state.English_Name)){
            this.setState({
                engName_error : false,
                engName_error_text : ""
            })
        }
        else{
            this.setState({
                engName_error : true,
                engName_error_text : "Only use English!!"
            })
        }

    }

    ClientChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });

        // eslint-disable-next-line no-mixed-operators
        if(check_kor.test(this.state.Client) || check_eng.test(this.state.Client) && !check_num.test(this.state.Client) && !check_spc.test(this.state.Client)){
            this.setState({
                Client_error : false,
                Client_error_text : ""
            })
        }
        else{
            this.setState({
                Client_error : true,
                Client_error_text : "Only use Korean and English!!"
            })
        }
    }

    AgeChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });

        if(!check_kor.test(this.state.Age) && !check_eng.test(this.state.Age) && check_num.test(this.state.Age) && !check_spc.test(this.state.Age)){
            this.setState({
                Age_error : false,
                Age_error_text : ""
            })
        }
        else{
            this.setState({
                Age_error : true,
                Age_error_text : "Only use num!!"
            })
        }
    }

    EducationChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        });

        // eslint-disable-next-line no-mixed-operators
        if(check_kor.test(this.state.Education) || check_eng.test(this.state.Education) && !check_num.test(this.state.Education) && !check_spc.test(this.state.Education)){
            this.setState({
                Education_error : false,
                Education_error_text : ""
            })
        }
        else{
            this.setState({
                Education_error : true,
                Education_error_text : "Only use Korean and English!!"
            })
        }
    }

    PhoneChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });

        if(!check_kor.test(this.state.Phone) && !check_eng.test(this.state.Phone) && check_num.test(this.state.Phone) || check_spc.test(this.state.Phnoe)){
            this.setState({
                Phone_error : false,
                Phone_error_text : "Good!"
            })
        }
        else{
            this.setState({
                Phone_error : true,
                Phone_error_text : "Follow the Form!!"
            })
        }
    }

    putProfile( close, getProfile ){
        if(this.state.Korean_Name === '' || this.state.English_Name === '' || this.state.Client === '' || this.state.Age === '' || this.state.Education === '' || this.state.Phone === '' || this.state.Email === '' || this.state.Facebook === '' || this.state.GitHub === '' || this.state.Rocket === '' || this.state.Blog === ''){
            alert("빈칸을 모두 채워주세요.");
        }else{
            axios.put(`${SERVER}/profile/1`,{
                korean : this.state.Korean_Name,
                english : this.state.English_Name,
                client : this.state.Client,
                age : this.state.Age,
                education : this.state.Education,
                phone : this.state.Phone,
                email : this.state.Email,
                facebook : this.state.Facebook,
                github : this.state.GitHub,
                rocket : this.state.Rocket,
                blog : this.state.Blog
            })
            .then((response) => {
                console.log("success");
                if(response.status === 200){
                    alert("프로필 업데이트에 성공했습니다.");
                    getProfile();
                    close();
                }else{
                    alert("프로필 업데이트에 실패했습니다.");
                }
            })
            .catch((err) => {
                console.log("error : ", err);
                alert("프로필 업데이트 중 오류가 발생했습니다.");
            })
        }
        
    }

    render(){
        return(
            <Popup>
                <IconButton onClick={this.props.close} style = {{color : "black", position : "absolute", top : "0px", right : "0px"}}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </IconButton>
                <TextField name = "Korean_Name" onChange = {this.KoreanNameChange} label = "Name" style = {{marginTop : "40px"}} error = {this.state.korName_error} helperText = {this.state.korName_error_text} />
                <TextField name = "English_Name" onChange = {this.EnglishNameChange} label = "English Name" style = {{marginTop : "10px"}} error = {this.state.engName_error} helperText = {this.state.engName_error_text} />
                <TextField name = "Client" onChange = {this.ClientChange} label = "Client" style = {{marginTop : "10px"}} error = {this.state.Client_error} helperText = {this.state.Client_error_text} />
                <TextField name = "Age" onChange = {this.AgeChange} label = "Age" style = {{marginTop : "10px"}} error = {this.state.Age_error} helperText = {this.state.Age_error_text} inputProps = {{ maxLength : 2 }} />
                <TextField name = "Education" onChange = {this.EducationChange} label = "Education" style = {{marginTop : "10px"}} error = {this.state.Education_error} helperText = {this.state.Education_error_text} />
                <TextField name = "Phone" onChange = {this.PhoneChange} label = "Phone" style = {{marginTop : "10px"}} error = {this.state.Phone_error} helperText = {this.state.Phone_error_text} inputProps = {{ maxLength : 13 }} />
                <TextField name = "Email" onChange = {this.handleChange} label = "Email" style = {{marginTop : "10px"}} error = {this.state.Blank_error} />
                <TextField name = "Facebook" onChange = {this.handleChange} label = "Facebook Address" style = {{marginTop : "10px"}} />
                <TextField name = "GitHub" onChange = {this.handleChange} label = "Github Address" style = {{marginTop : "10px"}} />
                <TextField name = "Rocket" onChange = {this.handleChange} label = "RocketPunch Address" style = {{marginTop : "10px"}} />
                <TextField name = "Blog" onChange = {this.handleChange} label = "Blog" style = {{marginTop : "10px"}} />
                <PostTab>
                    <IconButton style={{color : "black"}} onClick = {() => this.putProfile(this.props.close, this.props.getProfile)} >
                        <FontAwesomeIcon icon={faCheckCircle} />
                    </IconButton>
                </PostTab>
            </Popup>
        );
    }
}

export default ProfilePopup;