import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TodoListItem from './TodoListItem';
import {
	getTodosLoading,
	getCompletedTodos,
	getIncompleteTodos,
} from './selectors';
import NewTodoForm from './NewTodoForm';
import {
	loadTodos,
	removeTodoRequest,
	markTodoAsCompletedRequest,
} from './thunks';

const ListWrapper = styled.div`
	max-width: 700px;
	margin: auto;
`;
// const BigRedText = styled.div`
// 	font-size: 48px;
// 	color: #ff0000;
// `;

const TodoList = ({
	completedTodos,
	incompleteTodos,
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
		<ListWrapper>
			<NewTodoForm />
			<h3>Incomplete:</h3>
			{incompleteTodos.map((todo, index) => (
				<TodoListItem
					key={index}
					todo={todo}
					onRemovePressed={onRemovePressed}
					onCompletedPressed={onCompletedPressed}
				/>
			))}
			<h3>Completed:</h3>
			{completedTodos.map((todo, index) => (
				<TodoListItem
					key={index}
					todo={todo}
					onRemovePressed={onRemovePressed}
					onCompletedPressed={onCompletedPressed}
				/>
			))}
		</ListWrapper>
	);
	return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => ({
	isLoading: getTodosLoading(state),
	completedTodos: getCompletedTodos(state),
	incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
	startLoadingTodos: () => dispatch(loadTodos()),
	onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
	onCompletedPressed: (id) => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
