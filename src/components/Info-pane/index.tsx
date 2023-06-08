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
				<div class='bg-white/20 border-white/70 border-2 rounded-lg p-4 text-2xl space-y-4 '>
					<div class='flex justify-between'>
						<span>Feels like</span>
						<span>{feelsLike}&deg;</span>
					</div>

					<div class='flex justify-between'>
						<span>Wind</span>
						<span>{wind}</span>
					</div>

					<div class='flex justify-between'>
						<span>Humidity</span>
						<span>{humidity}</span>
					</div>
					<div class='flex justify-between'>
						<span>Chance of rain</span>
						<span>{chanceOfRain}%</span>
					</div>
					<div class='flex justify-between'>
						<span>Sunrise</span>
						<span>{sunrise}</span>
					</div>
					<div class='flex justify-between'>
						<span>Sunset</span>
						<span>{sunset}</span>
					</div>
				</div>
			</>
		)
	}
)
