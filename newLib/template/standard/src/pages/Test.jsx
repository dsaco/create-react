import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setTest } from '../stores//reducers/testReducer';

import Button from 'Components/Button';

class Test extends Component {
	set = () => {
		this.props.setTest(Date.now());
	};
	show = () => {
		console.log(this.props.msg);
	};
	render() {
		return (
			<div>
				<h1>test</h1>
				<Button onClick={this.show} text="show" />
				<Button onClick={this.set} text="set" />
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	msg: state.test,
});

const mapDispatchToProps = (dispatch) => ({
	...bindActionCreators({ setTest }, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test);
