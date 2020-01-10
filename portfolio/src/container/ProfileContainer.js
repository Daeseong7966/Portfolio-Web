import React, { Component } from 'react';
import { connect } from 'react-redux';
import MidProfile from '../mid/MidProfile';
import { showprofile, showskill } from '../store/modules/midprofile';

class ProfileContainer extends Component{
    handleShowProfile = () => {
        this.props.showprofile();
    };

    handleShowSkill = () => {
        this.props.showskill();
    };

    render(){
        const { profile } = this.props;
        return(
            <MidProfile
                value = {profile}
                onShowProfile = {this.handleShowProfile}
                onShowSkill = {this.handleShowSkill}
            />
        );
    }
}

const mapStateToProps = ({ midprofile }) => ({
    profile : midprofile.profile
});

const mapDispatchToProps = { showprofile, showskill };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileContainer);