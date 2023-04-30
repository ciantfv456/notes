import { ChakraProvider } from '@chakra-ui/react'

import Messages from '../components/Messages';


function Dashboard(props) {
    const styleProp = {
      background: "radial-gradient(circle at center, black 9%, white 10%)",
      width: "100%",
      backgroundColor: "#fff",
      backgroundSize: "60px 50px",
      backgroundRepeat: "repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "20vh",
      ".dark": {
          background: "radial-gradient(circle at center, white 9%, black 10%)",
          backgroundSize: "60px 50px",
          backgroundColor: "#000",
          color: "darkslateblue"
      }
    
    }
    let root = document.querySelector('body')
    root.classList = []
    root.classList.add('dashboard')
  return (
    <ChakraProvider>
      <div sx={styleProp} className="App">
        <Messages rendered={props.rendered} />
      </div>
    </ChakraProvider>

  );
}


export default Dashboard;
