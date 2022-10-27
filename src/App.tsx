import React from 'react';
import styled from "styled-components";

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Container = styled.div`
 text-align: center;
`;

function App() {
    return (
        <Container>
            <Header>
                <h1>Thoughtodos!</h1>
            </Header>
        </Container>
    );
}

export default App;
