type ButtonPropsType = {
	title: string
	starter?:()=> void
}

export const Button = ({title, starter}: ButtonPropsType) => {
	return (
		<button onClick={starter}>{title}</button>
	)
}
