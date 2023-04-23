import Messages from '../components/Messages';


function Dashboard(props) {
    let root = document.querySelector('body')
    root.classList = []
    root.classList.add('dashboard')
  return (
      <div className="App">
        <Messages rendered={props.rendered} />
      </div>
  );
}


export default Dashboard;
