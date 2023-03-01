
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Chat from './Component/Join/Chat';
import LoginPage from './Component/Join/Login';
import Register from './Component/Join/Register';
import Contacts from './Component/Pages/Contacts';
// import LoginPage from './Component/Join/Login';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/chat" element={<Chat />} />
          <Route exact path="/contacts" element={<Contacts/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
