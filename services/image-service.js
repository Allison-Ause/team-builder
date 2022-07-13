import { client, SUPABASE_URL } from './client.js';

export async function uploadTeamEmblem(teamName, imageURL) {

    const ext = imageURL.type.split('/')[1];
    const imageName = `${teamName}-emblem.${ext}`;

    const bucket = client
        .storage
        .from('emblems');

    const { data, error } = await bucket
        .upload(imageName, imageURL, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${data.Key}`;

    return url;

}