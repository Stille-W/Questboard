import '../css/NavRouter.css';
import { Link, Routes, Route } from "react-router-dom";
import Home from "./Home";
import QuestList from "./QuestList";
import AdventurerList from './AdventurerList';
import Adventurer from './Adventurer';
import Login from './Login';
import Permit from './Permit';
import Logout from './Logout';
import RedirectPage from './RedirectPage';
import Register from './Register';
import LoginBtn from './LoginBtn';
import NewQuest from './NewQuest';

function NavRouter() {

    return (
        <div className='content'>
            <div className="header">
                <div className="headerText">
                    <span>Guild</span>
                    <Link className='new' to="/newPost" reloadDocument>New Quest</Link>
                </div>
                <nav>
                    <ul>
                        <li><Link to="/" reloadDocument>Home</Link></li>
                        <li><Link to="/questList" reloadDocument>QuestList</Link></li>
                        <li><Link to="/adventurerList" reloadDocument>AdventurerList</Link></li>
                        <li><Link to="/permit" reloadDocument>Permit</Link></li>
                    </ul>
                </nav>
                <LoginBtn />
            </div>
            <div style={{ display: 'flex', width: '100%', height: '100%', overflow: "scroll", overflowX: "hidden" }}>
                <div className='main'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/questList" element={<QuestList />} />
                        <Route path="/adventurerList" element={<AdventurerList />} />
                        <Route path="/adventurer/:id" element={<Adventurer />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/permit' element={<Permit />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/redirect' element={<RedirectPage />} />
                        <Route path="/editAccount/:id" element={<Register />} />
                        <Route path='/newPost' element={<NewQuest />} />
                    </Routes>
                </div>
            </div>
            <div className="footer">
                <span className="footerText">all rights reserved</span>
            </div>
        </div>
    )
}

export default NavRouter;