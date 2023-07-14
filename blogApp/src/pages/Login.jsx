import {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {authContext} from '../userContext';

const Login = () => {
	const [input, setInput] = useState({email: '', password: ''});
	const [res, setRes] = useState('');
	const navigate = useNavigate();
	const {login} = useContext(authContext);

	const submitHandler = async (e) => {
		e.preventDefault();

		const msg = await login(input);
		setRes(msg);
		if (msg === 'Login Successful') {
			navigate('/');
		}
	};

	return (
		<div className="auth">
			<h1>Login</h1>
			<form>
				<input
					required
					type="email"
					value={input.email}
					onChange={(e) => setInput({...input, email: e.target.value})}
					placeholder="Email"
				></input>
				<input
					required
					type="password"
					value={input.password}
					onChange={(e) => setInput({...input, password: e.target.value})}
					placeholder="Password"
				></input>
				<button onClick={submitHandler}>Login</button>
				<p>{res}</p>
				<span>
					Don&apos;t have Account? &nbsp;
					<Link className="link" to={'/register'}>
						<b>Register now!</b>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
