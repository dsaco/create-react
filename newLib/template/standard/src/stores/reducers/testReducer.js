const testReducer = (state = 'test', action) => {
	switch (action.type) {
		case 'TEST_SET':
			return action.msg;
		default:
			return state;
	}
};

export default testReducer;

export const setTest = (msg) => {
	return (dispatch) => {
		dispatch({
			type: 'TEST_SET',
			msg,
		});
	};
};
