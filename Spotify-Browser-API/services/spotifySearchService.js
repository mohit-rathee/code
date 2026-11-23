import axios from 'axios';
import { getToken } from './spotifyAuthService.js';

const SEARCH_URL = 'https://api-partner.spotify.com/pathfinder/v2/query';

export const searchSpotifyURI = async (query) => {
    const token = await getToken();

    const payload = {
        variables: {
            query,
            limit: 30,
            numberOfTopResults: 30
        },
        operationName: 'searchSuggestions',
        extensions: {
            persistedQuery: {
                version: 1,
                sha256Hash:
                    '23f33ca50a0f4153dafc5cd1b4d1370db01b72130c2994bd0ffd07d5a7fee8f0'
            }
        }
    };

    const response = await axios.post(
        SEARCH_URL,
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }
    );

    const result =
        response.data?.data?.searchV2?.topResultsV2?.itemsV2 ?? [];

    return result
};
