import './App.css';
import ApolloClient from 'apollo-boost'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Menu from './components/Menu';
import Profile from './components/Profile';

import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
      <div className="App">
        <Router>
          <Menu/>
          <Profile/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard' element={<Dashboard rendered={false}/>}/>
          </Routes>
        </Router>
        
      </div>
  );
}


export default App;
