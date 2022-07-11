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