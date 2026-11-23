import { searchSpotifyURI } from '../services/spotifySearchService.js';

export const searchBySongName = async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({
            error: 'Missing q parameter'
        });
    }

    try {
        const result = await searchSpotifyURI(q);

        const topPick = result.find(item => {
            const type = item.item?.__typename;

            return (
                type === 'TrackResponseWrapper' ||
                type === 'AlbumResponseWrapper'
            );
        });

        if (!topPick) {
            return res.status(404).json({
                error: 'No track or album found'
            });
        }

        const response = {
            uri: topPick.item.data.uri
        }

        return res.status(200).json(response);

    } catch (err) {
        console.error(
            'Spotify search error:',
            err.response?.data || err.message
        );

        return res.status(500).json({
            error: 'Failed to search Spotify'
        });
    }
};
