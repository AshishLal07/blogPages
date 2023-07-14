/* eslint-disable no-mixed-spaces-and-tabs */
import moment from 'moment';
import {useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useLocation, useNavigate} from 'react-router-dom';

const Write = () => {
	const state = useLocation().state;
	const navigate = useNavigate();

	const [value, setValue] = useState(state?.description || '');
	const [title, setTitle] = useState(state?.title || '');
	const [img, setImg] = useState(null);
	const [cat, setCat] = useState(state?.cat || '');

	const uploadImg = async () => {
		try {
			const formData = new FormData();
			formData.append('file', img);
			const res = await fetch('http://localhost:3001/upload', {
				method: 'POST',
				body: formData,
			});

			const data = res.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};

	const handleCLick = async (e) => {
		// console.log(e.target);
		e.preventDefault();
		const imgUrl = img ? await uploadImg() : '';
		const desc = getText(value);
		console.log(
			title,
			desc,
			cat,
			imgUrl,
			moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
		);

		try {
			state
				? await fetch(`http://localhost:3001/post/${state.id}`, {
						method: 'PATCH',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title,
							desc,
							cat,
							img: img ? imgUrl : '',
							date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
						}),
				  })
				: await fetch('http://localhost:3001/post/add', {
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							title,
							desc,
							cat,
							img: img ? imgUrl : '',
							date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
						}),
				  });
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	const getText = (html) => {
		const doc = new DOMParser().parseFromString(html, 'text/html');
		return doc.body.textContent;
		// setValue(doc.body.textContent);
	};

	return (
		<div className="add">
			<div className="content">
				<input
					type="text"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
				<div className="editorContainer">
					<ReactQuill
						className="editor"
						theme="snow"
						value={value}
						// onChange={(editor) => console.log(editor.getText())}
						onChange={setValue}
					/>
				</div>
			</div>
			<div className="menu">
				<div className="item">
					<h1>Publish</h1>
					<span>
						<b>Status:</b>Draft
					</span>
					<span>
						<b>Visibility:</b>Public
					</span>
					<input
						type="file"
						id="upload"
						style={{display: 'none'}}
						onChange={(e) => setImg(e.target.files[0])}
					></input>
					<label className="file" htmlFor="upload">
						UploadImage
					</label>
					<div className="buttons">
						<button>Save as draft</button>
						<button onClick={handleCLick}>
							{state ? 'Update' : 'Publish'}
						</button>
					</div>
				</div>
				<div className="item" onChange={(e) => setCat(e.target.value)}>
					<h1>Categories</h1>

					<label>
						<input
							type="radio"
							checked={cat === 'art'}
							name="cat"
							value="art"
							id="art"
						/>
						<span>Art</span>
					</label>
					<label>
						<input
							type="radio"
							checked={cat === 'science'}
							name="cat"
							value="science"
							id="science"
						/>
						<span>Science</span>
					</label>
					<label>
						<input
							type="radio"
							checked={cat === 'technology'}
							name="cat"
							value="technology"
							id="technology"
						/>
						<span>Technology</span>
					</label>
					<label>
						<input
							type="radio"
							checked={cat === 'cinema'}
							name="cat"
							value="cinema"
							id="cinema"
						/>
						<span>Cinema</span>
					</label>
					<label>
						<input
							type="radio"
							checked={cat === 'design'}
							name="cat"
							value="design"
							id="design"
						/>
						<span>Design</span>
					</label>
					<label>
						<input
							type="radio"
							checked={cat === 'food'}
							name="cat"
							value="food"
							id="food"
						/>
						<span>Food</span>
					</label>
				</div>
			</div>
		</div>
	);
};

export default Write;
