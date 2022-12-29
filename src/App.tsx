import React from "react";
import styled from "styled-components";
import { TaskPage } from "./pages/TaskPage";
import { Provider } from "react-redux";
import store from "./store";
import { HeaderComponent } from "./component/Header";

const Container = styled.div`
  background-color: #b2cef5;
  font-family: "Google Sans", sans-serif;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  text-align: center;
`;

function App() {
  return (
    <Container>
      <Provider store={store}>
        <HeaderComponent />
        <TaskPage />
      </Provider>
    </Container>
  );
}

export default App;
