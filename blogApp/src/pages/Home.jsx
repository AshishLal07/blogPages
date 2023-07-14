import {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';

const Home = () => {
	const [posts, setPosts] = useState([]);

	const cat = useLocation().search;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`http://localhost:3001/post${cat}`);
				if (res.ok) {
					res.json().then((data) => setPosts(data));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, [cat]);

	return (
		<div className="home">
			<div className="posts">
				{posts?.map((post) => (
					<div className="post" key={post.id}>
						<div className="img">
							{post?.postImg.startsWith('http') ? (
								<img src={post?.postImg}></img>
							) : (
								<img
									src={`http://localhost:3001/uploads/${post.postImg}`}
								></img>
							)}
						</div>
						<div className="content">
							<Link className="link" to={`/post/${post.id}`}>
								<h1>{post.title}</h1>
							</Link>
							<p>{post.description}</p>
							<button>Read More</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Home;
