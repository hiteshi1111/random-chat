import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Chat from './templates/chat';
import LoggedIn from './protectedRouting/loggedIn';
import LoggedOut from './protectedRouting/loggedOut';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedIn />}>
          <Route index element={<Home />} />  
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<LoggedOut />}>
          <Route path='/chat' element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;