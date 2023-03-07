<template>
	<button
		class="scroller fcr"
		@click.stop="scrollToElement()"
	>
		<template  v-if="!topScrollPosition">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				fill="currentColor"
				class="bi bi-arrow-down-circle-fill"
				viewBox="0 0 16 16"
				style="margin-right: 10px;"
			>
  				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"/>
			</svg>
			<h3>
				SCOREBOARD
			</h3>
		</template>
		<template v-if="topScrollPosition">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				fill="currentColor"
				class="bi bi-arrow-down-circle-fill"
				viewBox="0 0 16 16"
				style="margin-right: 10px;"
			>
  				<path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
			</svg>
			<h3 v-if="topScrollPosition">
				GAME
			</h3>
		</template>
	</button>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
	setup() {
		const topScrollPosition = ref(false);
		onMounted(() => {
			topScrollPosition.value = false;
		});

		function scrollToElement() {
			if (topScrollPosition.value) {
				topScrollPosition.value = !topScrollPosition.value;
				const element = document.querySelector('#gameContent');
				element.scrollIntoView({behavior: 'smooth'});
			} else {
				topScrollPosition.value = !topScrollPosition.value;
				const element = document.querySelector('#scoreBoard');
				element.scrollIntoView({behavior: 'smooth'});
			}
		};

		return {
			topScrollPosition,
			scrollToElement
		}
	}
}
</script>