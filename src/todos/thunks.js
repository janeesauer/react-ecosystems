import {
	loadTodosInProgress,
	loadTodosSucess,
	loadTodosFailure,
} from './actions';

export const loadTodos = () => async (dispatch, getState) => {
	try {
		dispatch(loadTodosInProgress());
		const response = await fetch('http://localhost:8080/todos');
		const todos = await response.jsom();

		dispatch(loadTodosSucess(todos));
	} catch (e) {
		dispatch(loadTodosFailure());
		dispatch(displayalert(e));
	}
};

export const displayAlert = (text) => () => {
	alert(text);
};
