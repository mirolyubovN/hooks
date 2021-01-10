import React, {Component, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';


const App = () => {
	const [value, setValue] = useState(1);
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
				<PlanetInfo id={value}/>
			</div>
			);
	} else {
		return <button onClick={() => setVisible(true)}>Show</button>
	};
	
}

const PlanetInfo = ({id}) => {

	const [name, setName] = useState(null);

	useEffect(() => {
		let cancelled = false;
		fetch(`https://swapi.dev/api/planets/${id}`)
			.then(res => res.json())
			.then(data => !cancelled && setName(data.name)) //do not set new state if the effect has been cleared
			.catch(() => console.log('network error'));
		return () => cancelled = true; 
	}, [id]);


	return (
		<div>{id} - {name}</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

