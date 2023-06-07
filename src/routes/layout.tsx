import { component$, Slot } from '@builder.io/qwik'

export default component$(() => {
	return (
		<div class='container mx-auto px-4'>
			<Slot />
		</div>
	)
})
