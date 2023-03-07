<template>
	<div
		class="fullScreen scoreBoard fcr"
		style="align-items: flex-start;"
		id="scoreBoard"
	>
		<div class="tableContainer">
			<table>
				<thead class="tableColumn">
					<th
						v-for="(column, index) in columns"
						:key="index"
					>
						{{ column.toUpperCase() }}
					</th>
				</thead>
				<template v-if="sortedPlayers && sortedPlayers.length">
					<tbody>
						<tr
							v-for="(player, pIndex) in sortedPlayers"
							:key="pIndex"
							class="tableColumn"
						>
							<td
								v-for="(column, index) in columns"
								:key="index"
								:class="[
									{'gold': (pIndex === 0)},
									{'silver': (pIndex === 1)},
									{'bronze': (pIndex === 2)}
								]"
							>
								<template v-if="index === 0">
									{{ (pIndex + 1) }}
								</template>
								<template v-else>
									{{ player[column] }}
								</template>
							</td>
						</tr>
					</tbody>
				</template>
				<template v-else>
					{{ 'NO DATA' }}
				</template>
			</table>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';

export default defineComponent ({
	name: 'ScoreBoard',
	props: {
		players: Array,
	},
	setup(props) {
		const columns = ref([
			'rank',
			'username',
			'wins',
			'loses',
		]);

		const sortedPlayers = computed(() => {
			// eslint-disable-next-line vue/no-mutating-props
			const sorting = [...props.players];
			return sorting.sort((a, b) => b.wins - a.wins);
		});

		return {
			columns,
			sortedPlayers: sortedPlayers,
		};
	},
});
</script>