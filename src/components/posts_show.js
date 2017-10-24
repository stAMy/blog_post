import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; // provided directly by react-router
        this.props.fetchPost(id);
    }

    onDeleteClick() {
        const { id } = this.props.match.params;

        this.props.deletePost(id, () => {
            this.props.history.push('/');
        });
    }

    render() {
        // this.props = ownProps; <- same as down below
        const { post } = this.props;

        if (!post) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <Link to = "/">Back To Index</Link>
                <button
                className = "btn btn-danger pull-xs-right"
                onClick = {this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h5>Categories: {post.categories}</h5>
                <p>{post.content}</p>
            </div>
        );
    }
}


function mapStateToProps({ posts }, ownProps) {     
    return { post: posts[ownProps.match.params.id] }; // larger projects, this could be in its own file
}


export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);