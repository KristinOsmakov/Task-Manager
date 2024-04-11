import {FilterValuesType} from "./App";

type ButtonPropsType = {
	title: string
	changeTodoListFilter: () => void
}
const onClickHandler = (props: ButtonPropsType) => {
	if(props.changeTodoListFilter) {
		props.changeTodoListFilter()
	}
}
export const Button = (props: ButtonPropsType) => {
	return (
		<button onClick={props.changeTodoListFilter}>{props.title}</button>

	)
}
