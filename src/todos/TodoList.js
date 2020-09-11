import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { loadTodos } from './thunks';
import { removeTodo, markTodoAsCompleted } from './actions';
import './TodoList.css';

const TodoList = ({
	todos = [],
	onRemovePressed,
	onCompletedPressed,
	isLoading,
	startLoadingTodos,
}) => {
	useEffect(() => {
		startLoadingTodos();
	}, []);

	const loadingMessage = <div>Loading todos...</div>;
	const content = (
		<div className='list-wrapper'>
			<NewTodoForm />
			{todos.map((todo) => (
				<TodoListItem
					key={Number.toString()}
					todo={todo}
					onRemovePressed={onRemovePressed}
					onCompletedPressed={onCompletedPressed}
				/>
			))}
		</div>
	);
	return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
	isLoading: state.isLoading,
	todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
	startLoadingTodos: () => dispatch(loadTodos()),
	onRemovePressed: (text) => dispatch(removeTodo(text)),
	onCompletedPressed: (text) => dispatch(markTodoAsCompleted(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
