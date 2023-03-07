<template>
	<div
		class="fullScreen gameContent fcc"
		style="justify-content: flex-start;"
		id="gameContent"
	>
		<div class="content">
			<!-- PLAYER 1 -->
			<div class="playerBody">
				<div class="playerBodySlot fcc" style="font-weight: 600; font-size: 24px;">
					{{(winner && roundEnded) ? '-' : player1?.username }}
				</div>
				<div class="playerBodySlot fcc">
					{{(winner && roundEnded) ? '-' : player_1.status }}
				</div>
				<div
					v-if="roundEnded && !winner"
					class="playerBodySlot fcc"
					style="font-weight: 700; font-size: 40px;"
				>
					{{ player_1.selection }}
				</div>
			</div>
			<!-- MIDDLE PANEL -->
			<div class="middlePanel fcc">
				<template v-if="!roundEnded">
					<h2 style="margin-bottom: 10px; font-weight: 700; font-size: 40px;">
						ROUND: <span style="color: red">{{ round }}</span>
					</h2>
	
					<h2 style="margin-bottom: 10px; font-weight: 700;">
						{{ isFirstPLayer ? player1?.username : player2?.username }}
					</h2>

					<h3 style="margin-bottom: 20px; font-size: 25px; color: orange;">
						choosing
					</h3>

					<select
						style="width: 100px; margin-bottom: 20px;"
						v-model="chosenSelection"
						:disabled="roundEnded"
					>
						<option v-for="(option, index) in selectOptions" :key="index">
							{{ option }}
						</option>
					</select>
				</template>

				<button
					v-if="!roundEnded"
					class="btn btn-danger"
					type="button"
					@click.stop="handlePlayerSelection()"
				>
					CHOOSE!
				</button>

				<h3 v-if="winner && roundEnded && !end" style="color: red; margin: 20px;">
					{{ `WINNER \n ${winner}` }}
				</h3>
				<h3 v-if="end" style="color: red; margin: 20px;">
					{{ `END OF TOURNAMENT, THANK YOU` }}
				</h3>
				<button
					v-if="roundEnded && !end"
					class="btn btn-warning"
					type="button"
					@click.stop="startNewRound()"
				>
					START
				</button>
			</div>
			<!-- PLAYER 2 -->
			<div class="playerBody">
				<div class="playerBodySlot fcc" style="font-weight: 600; font-size: 24px;">
					{{(winner && roundEnded) ? '-' : player2?.username }}
				</div>
				<div class="playerBodySlot fcc">
					{{(winner && roundEnded) ? '-' : player_2.status }}
				</div>
				<div
					v-if="roundEnded && !winner"
					class="playerBodySlot fcc"
					style="font-weight: 700; font-size: 40px;"
				>
					{{ player_2.selection }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent ({
	name: 'GameContent',
	props: {
		player1: Object,
		player2: Object,
		players: Array,
		winner: String,
		end: Boolean,
	},
	setup(props, context) {
		let chosenSelection = ref('rock');
		const selectOptions = ref([
			'rock',
			'scissors',
			'paper',
		]);
		let player_1 = ref({});
		let player_2 = ref({});
		let isFirstPLayer = ref(true);
		let round = ref(1);
		let roundEnded = ref(false);

		onMounted(() => {
			player_1.value = { ...props.player1 };
			player_2.value = { ...props.player2 };
			if (isFirstPLayer.value) {
				player_1.value.status = 'CHOOSING';
				player_2.value.status = 'WAITING';
			}
		});

		const handlePlayerSelection = () => {
			if (isFirstPLayer.value) {
				player_1.value.selection = chosenSelection.value;
				player_1.value.status = 'READY';
				isFirstPLayer.value = false;
				player_2.value.status = 'CHOOSING';
				chosenSelection.value = 'rock';
			} else {
				player_2.value.selection = chosenSelection.value;
				player_2.value.status = 'READY';
				roundEnded.value = true;
				chosenSelection.value = 'rock';
				context.emit('get-round-results', {
					player1: player_1.value.selection,
					player2: player_2.value.selection,
				});
			}
		};
		const startNewRound = () => {
			round.value = props.winner ? 0 : round.value+=1;
			roundEnded.value = false;
			isFirstPLayer.value = true;
			chosenSelection.value = 'rock';
			player_1.value.status = 'CHOOSING';
			player_2.value.status = 'WAITING';
		};

		return {
			chosenSelection,
			isFirstPLayer,
			player_1,
			player_2,
			round,
			roundEnded,
			selectOptions,
			handlePlayerSelection,
			startNewRound,
		};
	},
});
</script>
