const Influx = require("influx");

const influx = new Influx.InfluxDB({
  host: process.env.INFLUX_HOST,
  protocol: "https",
  username: process.env.INFLUX_USER,
  password: process.env.INFLUX_PASSWORD,
  port: process.env.INFLUX_PORT,
  database: "clashroyale",
  schema: [
    {
      measurement: "player_stats",
      fields: {
        expLevel: Influx.FieldType.INTEGER,
        trophies: Influx.FieldType.INTEGER,
        bestTrophies: Influx.FieldType.INTEGER,
        wins: Influx.FieldType.INTEGER,
        losses: Influx.FieldType.INTEGER,
        battleCount: Influx.FieldType.INTEGER,
        threeCrownWins: Influx.FieldType.INTEGER,
        arenaId: Influx.FieldType.INTEGER,
        challengeCardsWon: Influx.FieldType.INTEGER,
        challengeMaxWins: Influx.FieldType.INTEGER,
        tournamentCardsWon: Influx.FieldType.INTEGER,
        tournamentBattleCount: Influx.FieldType.INTEGER,
        donations: Influx.FieldType.INTEGER,
        donationsReceived: Influx.FieldType.INTEGER,
        totalDonations: Influx.FieldType.INTEGER,
        warDayWins: Influx.FieldType.INTEGER,
        clanCardsCollected: Influx.FieldType.INTEGER,
        leagueCurrentTrophies: Influx.FieldType.INTEGER,
        leagueCurrentTrophiesBest: Influx.FieldType.INTEGER,
        leaguePreviousId: Influx.FieldType.STRING,
        leaguePreviousTrophies: Influx.FieldType.INTEGER,
        leaguePreviousTrophiesBest: Influx.FieldType.INTEGER,
        leagueBestId: Influx.FieldType.STRING,
        leagueBestTrophies: Influx.FieldType.INTEGER,
        currentDeck: Influx.FieldType.STRING,
	      deckLevel: Influx.FieldType.INTEGER
      },
      tags: ["playerTag", "name", "role", "clanTag", "clanName", "arenaName"]
    }
  ]
});

module.exports.writePlayerStat = function(playerStat) {
  influx
    .writePoints([
      {
        measurement: "player_stats",
        tags: { ...playerStat.tags },
        fields: { ...playerStat.fields }
      }
    ])
    .then(() => {
      console.log("Wrote player stats");
    });
};
