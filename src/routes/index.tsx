import {
	Resource,
	component$,
	useResource$,
	useSignal,
	useStore
} from '@builder.io/qwik'
import { server$, type DocumentHead } from '@builder.io/qwik-city'
import { InfoPane } from '~/components/Info-pane'
import { MainTemp } from '~/components/main-temp'

export type LocationData = {
	country: string
	id: number
	lat: number
	lon: number
	name: string
	region: string
	url: string
}

export const getLocationData = server$(async (search: string) => {
	const url = `http://api.weatherapi.com/v1/search.json?key=${
		import.meta.env.VITE_WEATHER_API_KEY
	}&q=${search}&aqi=no`

	const response = await fetch(url)
	const data = response.json()
	return data
})

export const getCityData = server$(async (search: string) => {
	const url = `http://api.weatherapi.com/v1/forecast.json?key=${
		import.meta.env.VITE_WEATHER_API_KEY
	}&q=${search}&days=7&aqi=no&alerts=no`

	const res = await fetch(url)
	const data = await res.json()

	return data
})

export default component$(() => {
	const searchTerm = useSignal<string>('')
	const activeCity = useSignal<string>('')

	const searchResults = useStore<Record<string, LocationData[]>>({ value: [] })

	const weatherResource = useResource$<LocationData[]>(({ track }) => {
		track(() => searchTerm.value)

		return getLocationData(searchTerm.value)
	})

	const cityResource = useResource$(({ track }) => {
		track(() => activeCity.value)
		if (activeCity.value === '') {
			return
		}
		return getCityData(activeCity.value)
	})

	return (
		<div class='grid gap-8'>
			<header>
				<h1 class='app-name'>Weather App</h1>
				<div class='search'>
					<input
						id='search'
						class=' bg-slate-100 '
						value={searchTerm.value}
						placeholder='enter city name'
						onInput$={(e: Event) =>
							(searchTerm.value = (e.target as HTMLInputElement).value)
						}
					/>
					<Resource
						value={weatherResource}
						onPending={() => <div class='dropdown'>Loading...</div>}
						onRejected={() => (
							<div class='dropdown'>Failed to load weather</div>
						)}
						onResolved={(locations: any) => {
							if (locations.length === 0) {
								return <div class='dropdown'>No Locations found</div>
							}
							searchResults.value = locations
							return (
								<>
									{searchTerm.value != '' && (
										<div class='dropdown  '>
											{locations.length > 0 &&
												locations?.map((item: any) => (
													<p key={item.id}>
														<button
															onClick$={() => {
																activeCity.value = item.url
																searchTerm.value = ''
															}}
														>
															{item.name},{item.country}
														</button>
													</p>
												))}
										</div>
									)}
								</>
							)
						}}
					/>
				</div>
			</header>
			<div class='overflow-auto space-y-14 mb-10'>
				{activeCity.value ? (
					<Resource
						value={cityResource}
						onPending={() => <div>Loading...</div>}
						onRejected={() => <div>Failed to load weather</div>}
						onResolved={(local) => {
							return (
								<>
									<MainTemp
										name={local.location.name}
										region={local.location.region}
										imgCode={local.current.condition.code}
										temperature={local.current.temp_f}
										condition={local.current.condition.text}
										high={local.forecast.forecastday[0].day.maxtemp_f}
										low={local.forecast.forecastday[0].day.mintemp_f}
									/>
									<InfoPane
										feelsLike={local.current.feelslike_f}
										wind={local.current.wind_mph}
										humidity={local.current.humidity}
										chanceOfRain={
											local.forecast.forecastday[0].day.daily_chance_of_rain
										}
										sunrise={local.forecast.forecastday[0].astro.sunrise}
										sunset={local.forecast.forecastday[0].astro.sunrise}
									/>
									<div class='grid grid-flow-col gap-4 overflow-x-auto overscroll-x-contain'>
										{local.forecast?.forecastday &&
											local.forecast.forecastday.map((day: any) => (
												<div
													key={day.date}
													class='grid w-32 justify-items-center  '
												>
													<div class='text-center'>
														{new Date(day.date).toLocaleDateString('en-US', {
															weekday: 'short',
															month: 'short',
															day: 'numeric'
														})}
													</div>
													<img
														width='84'
														height='66'
														class='row-start-2 col-start-1 z-10 translate-x-[-6%]'
														src={`https://ik.imagekit.io/cpds/weatherapp/day/${day.day.condition.code}.png`}
														alt={`${day.day.condition.text}`}
													/>
													<div class='text-4xl font-bold text-center row-start-2 col-start-1 mt-14'>
														{Math.round(day.day.avgtemp_f)}&deg;
													</div>
												</div>
											))}
									</div>
								</>
							)
						}}
					/>
				) : (
					'Please select a city'
				)}
			</div>
		</div>
	)
})

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description'
		}
	]
}
