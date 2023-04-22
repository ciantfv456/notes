import './App.css';
import ApolloClient from 'apollo-boost'
import Messages from './components/Messages';
import Menu from './components/NewMessage';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

function App() {
  return (
      <div className="App">
        <Messages/>
        <Menu/>
      </div>
  );
}


export default App;
