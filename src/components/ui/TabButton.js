import React from "react"
import Button from './Button'
import PropTypes from 'prop-types'

const TabButton = props => (
	<Button borderRight={props.isActive ? 0 : 'solid 1px'} borderLeft={props.isActive ? 0 : 'solid 1px'} borderColor="rgba(0,0,0,.1)" color={props.isActive ? 'gray8' : 'blue'} bg={props.isActive ? 'gray0' : 'blue2'} fontSize={2} borderRadius="0" px={4} py={3} onClick={props.onClick}>{props.children}</Button>
);

TabButton.propTypes = {
	isActive: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default TabButton;
