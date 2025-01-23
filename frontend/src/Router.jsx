import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import App from './App'
import Home from './components/Home'

function Router() {
    return (
        <Router>
            <Routes>
            <Route path="/" element = {<Home/>} />
            </Routes>
        </Router>
    )
}

export default Router;