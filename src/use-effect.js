import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {
	const [value, setValue] = useState(0);
	const [visible, setVisible] = useState(true);

	if(visible) {
		return (
			<div>
				<button onClick={() => setValue(v=> v+1)}>
					+
				</button>
				<button onClick={() => setVisible(false)}>
					Hide
				</button>
				<ClassCounter value={value}/>
				<HookCounter value={value}/>
				<Notification/>
			</div>
			);
	} else {
		return <button onClick={() => setVisible(true)}>Show</button>
	};
	
}

const HookCounter = ({value}) => {
	
	useEffect(() => {
		console.log('useEffect');
		return () => console.log('clear'); // clears effect
	}, [value]); // only reacts on value change (like componentDidUpdate)

	useEffect(() => {
		console.log('useEffect: mounted');
	}, []); // only executes when component is mounted (like componentDidMount)
	
	useEffect(() => () => console.log('useEffect: UNmounted'), []); // only executes when component is unmounted (like componentWillUnmount)

	return (
		<p>{value}</p>
	);
};

class ClassCounter extends Component {
	componentDidMount() {
		console.log('class: mount');
	}
	componentDidUpdate() {
		console.log('class: update');
	}
	componentWillUnmount() {
		console.log('class: unmount');
	}
	render() {
		return <p>{this.props.value}</p>
	};
};

const Notification = () => {

	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, [])

	return (
		<div>
			{visible &&	<p>Hello</p>}
		</div>
	)
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

