const lodash = require("lodash");
const axios = require("axios");
const influxClient = require("./influxClient");
const TOKEN = process.env.CR_API_TOKEN;

function buildDeck(deck) {
  return deck.map(card => card.name + "::" + card.level).join(";;");
}

function deckLevel(deck) {
	return 0;
}

axios.defaults.headers.get["Authorization"] = "Bearer " + TOKEN;
axios
  .get("https://api.clashroyale.com/v1/clans/%23GGJJV2")
  .then(response => {
    console.log(
      "Fetched clan data (" + response.data.memberList.length + " members)"
    );

    response.data.memberList.forEach(member => {
      console.log("Fetching player data for " + member.tag);
      fetchPlayer(member.tag);
    });
  })
  .catch(error => {
    console.log(error);
  });

function fetchPlayer(tag) {
  axios
    .get("https://api.clashroyale.com/v1/players/" + encodeURIComponent(tag))
    .then(response => {
      console.log("Fetched player data for player: " + response.data.name);

      const playerData = {
        tags: {
          playerTag: response.data.tag,
          name: response.data.name,
          role: response.data.role,
          clanTag: response.data.clan.tag,
          clanName: response.data.clan.name,
          arenaName: response.data.arena.name
        },
        fields: {
          expLevel: response.data.expLevel,
          trophies: response.data.trophies,
          bestTrophies: response.data.bestTrophies,
          wins: response.data.wins,
          losses: response.data.losses,
          battleCount: response.data.battleCount,
          threeCrownWins: response.data.threeCrownWins,
          arenaId: response.data.arena.id,
          challengeCardsWon: response.data.challengeCardsWon,
          challengeMaxWins: response.data.challengeMaxWins,
          tournamentCardsWon: response.data.tournamentCardsWon,
          tournamentBattleCount: response.data.tournamentBattleCount,
          donations: response.data.donations,
          donationsReceived: response.data.donationsReceived,
          totalDonations: response.data.totalDonations,
          warDayWins: response.data.warDayWins,
          clanCardsCollected: response.data.clanCardsCollected,
          leagueCurrentTrophies: lodash.get(
            response.data.leagueStatistics,
            "currentSeason.trophies",
            -1
          ),
          leagueCurrentTrophiesBest: lodash.get(
            response.data.leagueStatistics,
            "currentSeason.bestTrophies",
            -1
          ),
          leaguePreviousId: lodash.get(
            response.data.leagueStatistics,
            "previousSeason.id",
            "none"
          ),
          leaguePreviousTrophies: lodash.get(
            response.data.leagueStatistics,
            "previousSeason.trophies",
            -1
          ),
          leaguePreviousTrophiesBest: lodash.get(
            response.data.leagueStatistics,
            "previousSeason.bestTrophies",
            -1
          ),
          leagueBestId: lodash.get(
            response.data.leagueStatistics,
            "bestSeason.id",
            "none"
          ),
          leagueBestTrophies: lodash.get(
            response.data.leagueStatistics,
            "bestSeason.trophies",
            -1
          ),
          currentDeck: buildDeck(response.data.currentDeck),
		deckLevel: 0
        }
      };

      influxClient.writePlayerStat(playerData);
    })
    .catch(error => {
      console.log(error);
    });
}

console.log("Hello World");
