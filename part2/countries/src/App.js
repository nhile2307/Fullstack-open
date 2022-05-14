import React, { useState, useEffect } from "react"
import axios from "axios"
import "./App.css"

const api_key = process.env.REACT_APP_API_KEY
const App = () => {
	const [countries, setCountries] = useState([])
	const [results, setResults] = useState([])
	const [weather, setWeather] = useState()
	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
			setCountries(response.data)
		})
	}, [])
	const handleFilter = (event) => {
		const searchString = event.target.value.toLowerCase().split(" ")
		const filterCountries = countries.filter((country) => {
			let containsAtLeastOneWord = false
			searchString.forEach((word) => {
				if (country.name.toLowerCase().includes(word))
					containsAtLeastOneWord = true
			})
			if (containsAtLeastOneWord) {
				return country
			} else {
				return null
			}
		})
		setResults(filterCountries)
		if (filterCountries.length === 1) {
			const country = filterCountries.map((country) => country.capital)
			axios
				.get(
					`http://api.weatherstack.com/current?access_key=${api_key}&query=${country}`,
				)
				.then((response) => {
					setWeather(response.data)
					console.log(response.data)
				})
		}
	}
	const toggleDetailsHandler = (event) => {
		const details = event.currentTarget.nextElementSibling
		details.classList.contains("hide")
			? details.classList.remove("hide")
			: details.classList.add("hide")
	}

	return (
		<div>
			<h2>Countries</h2>
			<p>
				filter shown with <input type='text' onChange={handleFilter} />
			</p>
			{results.length <= 10 ? (
				results.length === 1 ? (
					results.map((country, index) => (
						<div key={`country_details_${index}`}>
							<h2>{country.name} </h2>
							<div>
								<p>Capital {country.capital}</p>
								<p>Population {country.population}</p>
								<p>Languages</p>
								<ul>
									{country.languages.map(
										(language, index) => (
											<li key={`language_${index}`}>
												{language.name}
											</li>
										),
									)}
								</ul>
								<p>
									<img
										src={country.flag}
										width={150}
										alt={country.name}
									/>
								</p>
								{weather ? (
									<div>
										<p>
											Weather in {weather.location.name}
										</p>
										<p>
											Temperature:{" "}
											{weather.current.temperature}{" "}
											Celsius
										</p>
										<p>
											<img
												src={
													weather.current
														.weather_icons[0]
												}
												alt={
													weather.current
														.weather_descriptions[0]
												}
											/>
										</p>
										<p>
											Wind: {weather.current.wind_speed}{" "}
											mph direction{" "}
											{weather.current.wind_dir}
										</p>
									</div>
								) : null}
							</div>
						</div>
					))
				) : (
					results.map((country, index) => (
						<div key={`country_details_${index}`}>
							<h2>{country.name} </h2>
							<button onClick={toggleDetailsHandler}>
								Toggle
							</button>

							<div className='hide'>
								<p>Capital {country.capital}</p>
								<p>Population {country.population}</p>
								<p>Languages</p>
								<ul>
									{country.languages.map(
										(language, index) => (
											<li key={`language_${index}`}>
												{language.name}
											</li>
										),
									)}
								</ul>
								<p>
									<img
										src={country.flag}
										width={150}
										alt={country.name}
									/>
								</p>
							</div>
						</div>
					))
				)
			) : (
				<p>Too many matches, specify another filter</p>
			)}
		</div>
	)
}

export default App
