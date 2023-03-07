import axios from 'axios';

const checkPlayerCount = (players) => {
	if (players.length % 2 !== 0) {
		players.push({
			username: 'dummy',
			wins: 0,
			loses: 0,
			matches: 0,
			points: 0,
			selection: '',
			status: '',
		});
	}
	return players;
};
export const fetchPlayers = async (url) => {
	let players = [];
	try {
		const { data } = await axios.get(url);
		data.map((player, index) => {
			players.push({
				username: player.username || `Anonymous ${index}`,
				wins: 0,
				loses: 0,
				matches: 0,
				points: 0,
				selection: '',
				status: '',
			});
		});
		// players = players.slice(0, 4);
	} catch (error) {
		console.error(error);
	}
	players = checkPlayerCount(players);
	return players;
};

export const prepareTournamentScheme = (players) => {
	const numPlayers = players.length;
	const numRounds = numPlayers - 1;
	const rounds = [];

	for (let i = 0; i < numRounds; i++) {
		const round = [];

		for (let j = 0; j < numPlayers / 2; j++) {
			const player1 = players[j];
			const player2 = players[numPlayers - j - 1];
			round.push([player1, player2]);
		}
		rounds.push(round);
		players.splice(1, 0, players.pop());
	}
	return { rounds };
};


// KROK 3 GAME
const getPoints = (player1, player2) => {
	if (player1 === player2) {
		return { player1: 0, player2: 0 };
	} else if (
		(player1 === 'rock' && player2 === 'scissors') ||
		(player1 === 'scissors' && player2 === 'paper') ||
		(player1 === 'paper' && player2 === 'rock')
	) {
		return { player1: 1, player2: 0 };
	} else {
		return { player1: 0, player2: 1 };
	} 
};
const preparePlayerStats = (player, win) => {
	return {
		...player,
		selection: '',
		points: 0,
		wins: player.wins + win,
		loses: player.loses + !win,
	};
};
export const match = (player1,player2, currentRoundChange, rounds, roundMatches, tournamentRounds) => {
	let winner_username = '';
	let end = false;
	if (player1.username === 'dummy' || player1.username === 'dummy') {
		currentRoundChange.match++;
	} else {
		const points = getPoints(player1.selection, player2.selection);
		player1.points+= points.player1;
		player2.points+= points.player2;
		currentRoundChange.matchRound++;
	
		if (currentRoundChange.matchRound >= rounds) {
			currentRoundChange.match++;
			currentRoundChange.matchRound = 0;

			if (player1.points > player2.points) {
				player1 = preparePlayerStats(player1, true);
				player2 = preparePlayerStats(player2, false);
				winner_username = player1.username;
			} else if (player1.points === player2.points) {
				winner_username = 'DRAW';
			} else {
				player1 = preparePlayerStats(player1, false);
				player2 = preparePlayerStats(player2, true);
				winner_username = player2.username;
			}
		}
	}
	if (currentRoundChange.match >= roundMatches) {
		currentRoundChange.match = 0;
		currentRoundChange.round++;
	}

	if (currentRoundChange.round > tournamentRounds) {
		end = true;
	}
	
	return { player1, player2, currentRoundChange, winner_username, end};
};