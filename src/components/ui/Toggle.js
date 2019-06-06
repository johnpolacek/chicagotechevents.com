import React from "react"
import { Div, Span, Input } from 'styled-system-html'
import PropTypes from 'prop-types'

const Toggle = props => (
	<Div
		display="inline-block"
		textAlign="center"
		fontWeight="300" 
		fontSize={0}
		css={{userSelect:'none' }}
	>
		<Span onClick={() => { props.selectedOption !== props.option1 && props.onToggle() }} px={2} color={props.selectedOption === props.label1 ? props.selectedColor : 'gray8'}>{props.label1}</Span>
        <Div display="inline-block" aria-hidden="true">
			<Span
				bg={props.colorSelectedBg}
				fontSize={props.size || 2}
				borderRadius="4px"
				pl={props.selectedOption === props.option2 ? 3 : 0}
				pr={props.selectedOption === props.option2 ? 0 : 3}
				onClick={() => { props.onToggle() }}
				css={{ transition: 'padding .25s', cursor: 'pointer' }}
			>
				<Span
					px={1}
					py={1}
					bg={props.colorSelected}
					color="white"
					borderRadius="4px"
					width="32px"
    				display="inline-block"
    				textAlign="center"
				>&nbsp;</Span>
			</Span>
		</Div>
		<Span id={props.id} onClick={() => { props.selectedOption !== props.option2 && props.onToggle() }} px={2} color={props.selectedOption === props.label2 ? props.selectedColor : 'gray8'}>{props.label2}</Span>
		{
			[props.option1,props.option2].map((option) => (
				<Input
					name={props.name || props.id}
					type="radio"
					aria-label={props.label}
					css={{
						position: "absolute",
						height: "1px",
						width: "1px",
						overflow: "hidden",
						clip: "rect(1px, 1px, 1px, 1px)"
					}}
					value={option}
					selected={props.selectedOption === option}
				/>
			))
		}
  </Div>
);

Toggle.propTypes = {
	id: PropTypes.string.isRequired,
	onToggle: PropTypes.func.isRequired,
	option1: PropTypes.string.isRequired,
	option2: PropTypes.string.isRequired,
	label1: PropTypes.string.isRequired,
	label2: PropTypes.string.isRequired,
	selectedOption: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	name: PropTypes.string,
	size: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
	colorSelected: PropTypes.string,
	colorSelectedBg: PropTypes.string
};

export default Toggle;
