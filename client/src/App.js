import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import {BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import Home from "./components/Home/Home"
import Container from '@mui/material/Container';


function App() {
  return <BrowserRouter>
    <Header/>
    <Container maxWidth="lg">
      <Routes>
          <Route path= "/" element = {<Home/>}/>
        </Routes>
    </Container>

  </BrowserRouter>
}

export default App;
