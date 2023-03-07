<template>
	<div class="game" :key="layoutKey">
		<game-header
			:players="players"
			:currentPlayers="currentPlayers"
			:nextPlayers="nextPlayers"
		/>
		<game-content
			:players="players"
			:player1="players[currentPlayers[0]]"
			:player2="players[currentPlayers[1]]"
			:winner="winner"
			:end="tournamentEnd"
			@get-round-results="compareSelections"
		/>
		<score-board
			:players="players"
		/>
		<game-scroller/>
	</div>
</template>
<script>
import { onMounted, ref, reactive } from 'vue';
import * as game from '../utils/game';

export default {
	setup() {
		let players = ref([]);
		let tournamentMatches = ref([]);
		const matchRounds= 3;
		let matchesPerRound = 0;
		let currentRound = reactive({
			round: 0,
			match: 0,
			matchRound: 0,
		});
		let currentPlayers = ref([]);
		let nextPlayers = ref([]);
		let layoutKey = ref(0);
		let winner = ref('');
		let tournamentEnd = ref(false);

		onMounted(async () => {
			players.value = await game.fetchPlayers('https://jsonplaceholder.typicode.com/users');
			const listOfPlayers = players.value.map((_, index) => index)
			const { rounds } = game.prepareTournamentScheme(listOfPlayers);
			tournamentMatches.value = rounds;
			getMatchPlayers();
			layoutKey.value++;
		});
		
		const getMatchPlayers = () => {
			const current_players = tournamentMatches.value[currentRound.round][currentRound.match];
			matchesPerRound = tournamentMatches.value[0].length;
			currentPlayers.value = [current_players[0], current_players[1]];
			let next_players = tournamentMatches.value[currentRound.round][currentRound.match +1];
			if (next_players) {
				nextPlayers.value = [next_players[0], next_players[1]];
			} else {
				next_players = tournamentMatches.value[currentRound.round +1][0];
				nextPlayers.value = [next_players[0], next_players[1]];
			}
		};

		const compareSelections = (data) => {
			players.value[currentPlayers.value[0]].selection = data.player1;
			players.value[currentPlayers.value[1]].selection = data.player2;

			const { player1, player2, currentRoundChange, winner_username, end } = game.match(
				players.value[currentPlayers.value[0]],
				players.value[currentPlayers.value[1]],
				currentRound,
				matchRounds,
				matchesPerRound,
				tournamentMatches.value[0].length,
			);

			players.value[currentPlayers.value[0]] = { ...player1 };
			players.value[currentPlayers.value[1]] = { ...player2 };
			currentRound = {...currentRoundChange};
			winner.value = winner_username;
			tournamentEnd.value = end;
			if (winner_username) getMatchPlayers();
		};

		return {
			currentPlayers,
			currentRound,
			layoutKey,
			nextPlayers,
			players,
			tournamentMatches,
			compareSelections,
			getMatchPlayers,
			winner,
			tournamentEnd,
		};
	},
};
</script>
