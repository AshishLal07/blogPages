import {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Menu = ({cat}) => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`http://localhost:3001/post/?cat=${cat}`);
				if (res.ok) {
					res.json().then((data) => setPosts(data));
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cat]);

	return (
		<div className="menu">
			<h1>Other post you may like</h1>

			{posts.map((post) => (
				<div className="post" key={post.id}>
					{post?.postImg.startsWith('http') ? (
						<img src={post?.postImg}></img>
					) : (
						<img src={`http://localhost:3001/uploads/${post.postImg}`}></img>
					)}

					<Link className="link" to={`/post/${post.id}`}>
						<h2>{post.title}</h2>
					</Link>
					<p>{post.description}</p>
					<button>Read More</button>
				</div>
			))}
		</div>
	);
};

export default Menu;
