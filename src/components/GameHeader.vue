<template>
	<div class="gameHeader">
		<div class="headedrGrid">
			<div class="headerGridItem fcr">
				<h2>Rock<span>Paper</span>Scissors</h2>
			</div>	
			<div class="headerGridItem fcr">
				<p>
					<span>Next: </span>
					{{ players[nextPlayers[0]]?.username }}
					<span> vs </span>
					{{ players[nextPlayers[1]]?.username }}
				</p>
			</div>
			<div class="headerGridItem fcr">
				<h1>
					{{ players[currentPlayers[0]]?.username }}
					<span>
						{{ players[currentPlayers[0]]?.points }}
						 : 
						 {{ players[currentPlayers[1]]?.points }}
					</span>
					{{ players[currentPlayers[1]]?.username }}
				</h1>
			</div>
		</div>
	</div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent ({
	name: 'GameHeader',
	props: {
		currentPlayers: Array,
		nextPlayers: Array,
		players: Array,
	},
});
</script>