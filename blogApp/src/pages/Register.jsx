import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Register = () => {
	const [input, setInput] = useState({userName: '', password: '', email: ''});
	const [res, setRes] = useState('');
	const navigate = useNavigate();

	const submitHandler = async (e) => {
		e.preventDefault();

		const res = await fetch('http://localhost:3001/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		});

		if (res.ok) {
			res.json().then((data) => setRes(data.msg));
			navigate('/login');
			setInput({userName: '', email: '', password: ''});
		}
	};

	return (
		<div className="auth">
			<h1>Register</h1>
			<form>
				<input
					required
					type="text"
					value={input.userName}
					placeholder="userName"
					onChange={(e) => setInput({...input, userName: e.target.value})}
				></input>
				<input
					required
					type="email"
					value={input.email}
					placeholder="abc@email.com"
					onChange={(e) => setInput({...input, email: e.target.value})}
				></input>
				<input
					required
					type="password"
					value={input.password}
					placeholder="password"
					onChange={(e) => setInput({...input, password: e.target.value})}
				></input>
				<button onClick={submitHandler}>Register</button>
				<p>{res}</p>
				<span>
					Already have Account? &nbsp;
					<Link className="link" to={'/login'}>
						<b>login here!</b>
					</Link>
				</span>
			</form>
		</div>
	);
};

export default Register;
