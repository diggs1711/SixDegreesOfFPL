/**
 * Six degrees of FPL
 *
 * See how your team is linked to other managers
 *  throught the leagues they are members of
 *
 */

class SixDegreesOfFPL {

    constructor() {
        const searchBtn = document.getElementById("search");
        searchBtn.addEventListener("click", this.onSearchBtnClicked.bind(this));
    }

    /**
     *
     * @param {number} managerId returns an array of leagues the manager is a member of
     */
    async getManagersLeagues(managerId) {
        return await fetch(`https://fantasy.premierleague.com/drf/entry/${managerId}`)
    }

    getManagersIds() {
        const manager1 = document.getElementById("m1").value
        const manager2 = document.getElementById("m2").value
        return [manager1, manager2]
    }

    async onSearchBtnClicked() {
        const [m1, m2] = this.getManagersIds()
        const res1 = await this.getManagersLeagues(1);
        const res2 = await this.getManagersLeagues(65);

        const leagues1 = await res1.json()
        const leagues2 = await res2.json()

        this.searchLeaguesForId(leagues1.leagues.classic, 65);
        this.searchLeaguesForId(leagues2.leagues.classic, 1);
    }

    async searchLeaguesForId(leagues, id) {
        if (leagues == null || leagues.length == 0) return false

        for (const league of leagues) {
            // if they have league in common that is not a global league("s" is symbol for global)
            // global would be too easy to find as it has overall leaderboard
            if (league.league_type !== "s") {
                let members = await this.getLeagueMembers(league.id);
                if (this.isPlayerMemberOfLeague(members, id)) {
                    console.log(league, "hello");
                }
            }
        }
    }

    isPlayerMemberOfLeague(members, id) {
        for (let member of members) {
            if (member.entry === id) {
                return true
            }
        }
        return false;
    }

    async getLeagueMembers(leagueId) {
        const res = await fetch(`https://fantasy.premierleague.com/drf/leagues-classic-standings/${leagueId}`);
        const data = await res.json();
        const members = data.standings.results
        return members;
    }
}

window.SixDegreesOfFPL = new SixDegreesOfFPL()