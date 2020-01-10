import React from 'react';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { SERVER } from '../config/config.json';

const PostTab = styled.div`
    display : flex;
    flex-direction : column;
    align-items : center;
    justify-content : center;
`;

const FirstPostTab = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : row;
`;

const SecondPostTab = styled.div`
    display : flex;
    align-items : center;
    justify-content : center;
    flex-direction : row;
    margin-top : 30px;
`;

class FirstSkill extends React.Component{
    state = {
        Skill_Title : "",
        First_Skill_Info : "",
        Second_Skill_Info : "",
        Third_Skill_Info : "",
        Project_Title : "",
        Project_Info : ""
    };

    putSkill(getSkill, close){
        if(this.state.Skill_Title === '' || this.state.First_Skill_Info === '' || this.state.Second_Skill_Info === '' || this.state.Third_Skill_Info === '' || this.state.Project_Title === '' || this.state.Project_Info === ''){
            alert("빈칸을 모두 채워주세요.");
        }else{
            axios.put(`${SERVER}/skill/1`, {
                skillname : this.state.Skill_Title,
                firstskillinfo : this.state.First_Skill_Info,
                secondskillinfo : this.state.Second_Skill_Info,
                thirdskillinfo : this.state.Third_Skill_Info,
                projectname : this.state.Project_Title,
                projectinfo : this.state.Project_Info
            })
            .then((response) => {
                if(response.status === 200){
                    alert("스킬 업데이트에 성공했습니다.");
                    getSkill();
                    close();
                }else{
                    alert("프로필 업데이트에 실패했습니다.");
                }
                
            })
            .catch((err) => {
                alert("스킬 업데이트 중 오류가 발생했습니다.");
                console.log("error : ", err);
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    render(){
        return(
            <PostTab>
                <FirstPostTab>
                    <TextField name = "Skill_Title" onChange = {this.handleChange} label = "SkillTitle" style = {{marginRight : "20px"}} />
                    <TextField name = "First_Skill_Info" onChange = {this.handleChange} label = "FirstSkillInfo" style = {{marginRight : "20px"}} />
                    <TextField name = "Second_Skill_Info" onChange = {this.handleChange} label = "SecondSkillInfo"  />
                </FirstPostTab>

                <SecondPostTab>
                    <TextField name = "Third_Skill_Info" onChange = {this.handleChange} label = "ThirdSkillInfo" style = {{marginRight : "20px"}} />
                    <TextField name = "Project_Title" onChange = {this.handleChange} label = "ProjectTitle" style = {{marginRight : "20px"}} />
                    <TextField name = "Project_Info" onChange = {this.handleChange} label = "ProjectInfo"  />
                </SecondPostTab>

                <IconButton style={{color : "black", marginTop : "10px"}} onClick = {() => this.putSkill(this.props.getSkill, this.props.close)} >
                    <FontAwesomeIcon icon={faCheckCircle} />
                </IconButton>
            </PostTab>
        );
    }
}

export default FirstSkill;