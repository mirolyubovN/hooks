import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
	return (
		<HookSwitcher/>
	)
}

const HookSwitcher = () => {

	const [color, setColor] = useState('white');
	const [fontSize, setSize] = useState(14);


	return (
		<div style = {{padding: '10px', backgroundColor: color, fontSize: `${fontSize}px`}}>
			Hello world
			<br/>
			<button onClick={() => setColor('gray')}>Dark</button>
			<button onClick={() => setColor('white')}>Light</button>
			<br/>
			<button onClick={() => setSize(size => size + 2)}>Larger</button>
		</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

