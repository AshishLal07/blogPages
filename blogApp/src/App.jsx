import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Write from './pages/Write';
import Single from './pages/Single';
import Layout from './Layout';
import './Style.scss';

function App() {
	return (
		<BrowserRouter>
			<div className="app">
				<div className="container">
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route path="/" element={<Home />}></Route>
							<Route path="/post/:id" element={<Single />}></Route>
							<Route path="/write" element={<Write />}></Route>
						</Route>
						<Route path="/register" element={<Register />}></Route>
						<Route path="/login" element={<Login />}></Route>
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
