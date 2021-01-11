import React, {useEffect, useState, useCallback, useMemo} from 'react';
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

const getPlanet = id => {
	return fetch(`https://swapi.dev/api/planets/${id}`)
			.then(res => res.json())
			.then(data => data);

}

const useRequest = request => {

	const initialState = useMemo(() => ({
		data: null, 
		loading: true,
		error: null
	}), []);
	const [dataState, setDataState] = useState(initialState);

	useEffect(() => {
		setDataState(initialState);

		let cancelled = false;

		request()
			.then(data => !cancelled && setDataState({
				data, 
				loading: false,
				error: null
			})) //do not set new state if the effect has been cleared
			.catch(e => !cancelled && setDataState({
				data: null, 
				loading: false,
				error: e
			}));
		return () => cancelled = true; 
	}, [request, initialState]);

	return dataState;
}

const usePlanetInfo = id => {
	const request = useCallback(() => getPlanet(id), [id]);
	
	return useRequest(request);
}

const PlanetInfo = ({id}) => {

	const {data, loading, error} = usePlanetInfo(id);

	if(error) {
		return <div>Something is wrong. Error message: {error}</div>;
	}
	if(loading) {
		return <div>Loading...</div>;
	}
	return (
		<div>{id} - {data && data.name}</div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
);

