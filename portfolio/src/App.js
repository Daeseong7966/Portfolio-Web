import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';

import { Activities, Awards, Other, Project } from './screens';
import ProfileContainer from './container/ProfileContainer';
import GlobalStyle from './styles/GlobalStyle';
import Header from './components/Header';
import Container from './styles/Container';

const Nav = styled.div`
  display : flex;
  flex : 1;
`;

const Screen = styled.div`
  display : flex;
  flex : 9;
  justify-content : center;
`;

class App extends Component{
  render(){
    return(
      <Fragment>
        <GlobalStyle />
        <Container>
          <Nav>
            <Header />
          </Nav>

          <Screen>
            <Route exact path="/" component = { ProfileContainer } />
            <Route path="/activities" component = { Activities } />
            <Route path="/awards" component = { Awards } />
            <Route path="/other" component = { Other } />
            <Route path="/project" component = { Project } />
          </Screen>
        </Container>
      </Fragment>
    );
  }
}

export default App;