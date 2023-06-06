import { component$ } from '@builder.io/qwik'

interface InfoPaneProps {
	feelsLike: string
	wind: string
	humidity: number
	chanceOfRain: number
	sunrise: string
	sunset: string
}

export const InfoPane = component$<InfoPaneProps>(
	({ feelsLike, wind, humidity, chanceOfRain, sunrise, sunset }) => {
		return (
			<>
				<div>
					<div>Feels like {feelsLike}&deg;</div>
					<div>Wind {wind}</div>
					<div>Humidity {humidity}</div>
					<div>Chance of rain {chanceOfRain}%</div>
					<div>Sunrise {sunrise}</div>
					<div>Sunset {sunset}</div>
				</div>
			</>
		)
	}
)
