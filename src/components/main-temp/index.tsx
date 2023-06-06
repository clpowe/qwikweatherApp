import { component$ } from '@builder.io/qwik'
import styles from './main-temp.module.css'

interface MainTempProps {
	name: string
	region: string
	imgCode: string
	temperature: number
	condition: string
	high: number
	low: number
}

export const MainTemp = component$<MainTempProps>((props) => {
	return (
		<div class={styles.maintemperature}>
			<h1>{props.name}</h1>
			<div class={styles.tempContainer}>
				<img
					class={styles.image}
					src={`https://ik.imagekit.io/cpds/weatherapp/day/${props.imgCode}.png`}
					alt={`${props.condition}`}
				/>
				<p class={styles.temp}>{Math.round(props.temperature)}&deg;</p>
			</div>
			<p>{props.condition}</p>
			<div class='flex'>
				<div class='grid justify-items-center'>
					<p>{props.high}&deg;</p>
					<p>Max temp</p>
				</div>
				<div class='grid justify-items-center'>
					<p>{props.low}&deg;</p>
					<p>Min temp</p>
				</div>
			</div>
		</div>
	)
})
