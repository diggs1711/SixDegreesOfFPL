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
     * @param {number} leagueId get other members of the league
     */
    fetchLeagueMembers(leagueId) {

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
        const res1 = await this.getManagersLeagues(m1);
        const res2 = await this.getManagersLeagues(m2);

        const leagues1 = await res1.json()
        const leagues2 = await res2.json()
    }
}

window.SixDegreesOfFPL = new SixDegreesOfFPL()