import React from "react";
import { CardText, CardTitle, Card, CardActions } from 'material-ui';

export default function render(props) {
	if (!props.posts || props.posts.length === 0) {
		return (
			<p>There is no posts yet</p>
		);
	}

	const listPosts = props.posts.map((post, index) =>
		<div key={'post_' + index} className="post">
			<Card>
				<CardTitle
					title={post.name}
					subtitle={post.description}
				/>
				<CardText>
					{post.content}
				</CardText>
			</Card>
			<CardActions>
				
			</CardActions>
		</div>
	);

	return(
		<div>
			{listPosts}
		</div>
	);
}
