import './App.css';
import React from "react";
import { Container } from "semantic-ui-react";
import Secrets from "./Secrets";

function App() {
  return (
    <div className="App">
      <Container>
        {/* Loads Secrets.js */}
        <Secrets />
      </Container>
    </div>
  );
}

export default App;
