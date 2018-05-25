import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/* MATERIAL-UI */
import { Toolbar, ToolbarGroup, Card, CardText, CardActions } from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';

import ApiCallLib from '../../libs/apiCallLib';


const callLib = new ApiCallLib();


const mapStateToProps = ({ authentication }) => ({
    authentication: authentication.get('token'),
});


class PostCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            content: "",
            open: false,
            token: props.authentication,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            token: nextProps.authentication,
        });
    }

    handleSubmit() {
        callLib.post('/post', this.state)
            .then(() => this.props.history.push('/'))
            .catch(() => { this.setState({ open: true }); });

    }

    render() {
        return (
            <div>
                <Toolbar className="toolbar">
                    <ToolbarGroup firstChild>
                        <FlatButton
                            icon={
                                <FontIcon className="material-icons">keyboard_backspace</FontIcon>
                            }
                            onClick={() => { this.props.history.goBack(); }}
                        />
                    </ToolbarGroup>
                </Toolbar>
                <div className="new-post-form">
                    <Card
                        style={{
                            marginBottom: '20px',
                        }}
                    >
                        <CardText>
                            <TextField
                                hintText="Post title"
                                floatingLabelText="Title"
                                onChange={(event, newValue) => this.setState({ title: newValue })}
                                className="new-post-form__input"
                            />
                            <br />
                            <TextField
                                hintText="Post description"
                                floatingLabelText="Description"
                                onChange={(event, newValue) => this.setState({ description: newValue })}
                                className="new-post-form__input"
                            />
                            <br />
                            <TextField
                                floatingLabelText="Post content"
                                multiLine={true}
                                fullWidth
                                rows={10}
                                onChange={(event, newValue) => this.setState({ content: newValue })}
                            />

                        </CardText>
                        {
                            this.state.token ?
                            <RaisedButton label="Submit" primary onClick={this.handleSubmit.bind(this)} />
                            :
                            <RaisedButton disabled label="You must be logged in to post" primary onClick={this.handleSubmit.bind(this)} />                            
                        }
                    </Card>
                </div>
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={() => { this.setState({ open: false }); }}
                >
                    <div>
                        title must be at least 8 and at most 32 characters long
                        <br />
                        descrition (while optionnal) must be at least 8 and at most 128 characters long
                        <br />
                        content is mandatory
                    </div>
                </Dialog>
            </div>
        );
    }
}

PostCreate.propTypes = {
    authentication: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(PostCreate);
