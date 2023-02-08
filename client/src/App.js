import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Main} from "./components/Main/Main";
import {ChatPage} from "./components/ChatPage/ChatPage";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000")

export const App = () => {
  return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Main socket={socket}/>}></Route>
            <Route path="/chat" element={<ChatPage socket={socket}/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

