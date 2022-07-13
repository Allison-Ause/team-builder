import { client, checkResponse } from './client.js';


export async function getTeamsWithPlayers() {
    const response = await client
        .from('teams')
        .select(`
            id,
            name,
            players(
                id,
                name,
                teamId:team_id
            )
        `);

    return checkResponse(response);
}

export async function getTeams() {
    const response = await client
        .from('teams')
        .select(`
            id,
            name
        `);

    return checkResponse(response);
}

export async function getPlayers() {
    const response = await client
        .from('players')
        .select(`
            id,
            name,
            team:teams(
                id,
                name
            )
            `)
        .order('created_at', { ascending: false });

    return checkResponse(response);
}

export async function removePlayer(id) {
    const response = await client
        .from('players')
        .delete()
        .eq('id', id)
        .single();

    return checkResponse(response);
}

export async function addPlayer(playerName, teamId) {
    const response = await client
        .from('players')
        .insert({
            name: playerName,
            team_id: teamId
        })
        .single();
        
    const data = checkResponse(response);

    if (data) {
        data.teamId = data.team_id;
        data.playerName = data.name;
    }

    return response.data;

}

export async function addTeam(teamName, imageURL) {
    const response = await client
        .from('teams')
        .insert({
            name: teamName,
            imageURL
        })
        .single();

    return checkResponse(response);
}
