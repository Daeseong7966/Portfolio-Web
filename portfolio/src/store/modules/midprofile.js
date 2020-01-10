const ShowProfile = 'midprofile/ShowProfile';
const ShowSkill = 'midprofile/ShowSkill';

export const showprofile = () => ({ type : ShowProfile });
export const showskill = () => ({ type : ShowSkill });

const initialState = {
    profile : true
};

export default function Show(state=initialState, action){
    
    switch(action.type){
        case ShowProfile:
            return{
                ...state,
                profile : state.profile = true,
            };
        case ShowSkill:
            return{
                ...state,
                profile : state.profile = false,
            };
        default:
            return state;
    }
}