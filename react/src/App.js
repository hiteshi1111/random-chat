import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Register from './pages/register';
import Chat from './templates/chat';
import LoggedIn from './protectedRouting/loggedIn';
import LoggedOut from './protectedRouting/loggedOut';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;