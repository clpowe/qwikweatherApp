import { component$ } from '@builder.io/qwik'

interface ForecastProps {
	name: string
	region: string
	imgCode: string
	temperature: number
	condition: string
	high: number
	low: number
}

export const forecast = component$<ForecastProps>(() => {
	return <></>
})
