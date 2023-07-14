import {Link, useLocation, useNavigate} from 'react-router-dom';
import Menu from '../Components/Menu';
import {useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {authContext} from '../userContext';

const Single = () => {
	const navigate = useNavigate();
	const postId = useLocation().pathname.split('/')[2];
	const [posts, setPosts] = useState([]);
	const {currentUser} = useContext(authContext);

	useEffect(() => {
		try {
			fetch(`http://localhost:3001/post/${postId}`).then((res) => {
				if (res.ok) {
					res.json().then((data) => setPosts(data));
				}
			});
		} catch (error) {
			console.log(error);
		}
	}, [postId]);

	const deletePost = async () => {
		try {
			const res = await fetch(`http://localhost:3001/post/${postId}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			if (res.ok) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="single">
				<div className="content">
					{posts?.postImg?.startsWith('http') ? (
						<img src={posts?.postImg} width={'500px'}></img>
					) : (
						<img
							src={`http://localhost:3001/uploads/${posts?.postImg}`}
							width={'500px'}
						></img>
					)}

					<div className="user">
						{posts.userImg ? (
							<img src={posts?.userImg}></img>
						) : (
							<i
								className="fa-regular fa-circle-user"
								style={{fontSize: '1.8rem'}}
							></i>
						)}
						<div className="info">
							<span>{posts?.userName}</span>
							<p>posted {moment(posts.createdAt).fromNow}</p>
						</div>
						{currentUser?.userName === posts?.userName ? (
							<div className="edit">
								<Link className="link" to={'/write?edit=2'} state={posts}>
									<i className="fa-regular fa-pen-to-square"></i>
								</Link>
								<i onClick={deletePost} className="fa-regular fa-trash-can"></i>
							</div>
						) : (
							<></>
						)}
					</div>
					<h1>{posts.title}</h1>
					<p>{posts.description}</p>
				</div>
				<Menu cat={posts.cat} />
			</div>
		</>
	);
};

export default Single;
