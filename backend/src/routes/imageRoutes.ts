import express, { Request, Response } from 'express';
import axios from 'axios';

type ImageCache = {
    [url: string]: {
        data: Buffer;
        timestamp: number;
        contentType: string;
    };
};

const router = express.Router();
const imageCache: ImageCache = {};
const CACHE_DURATION = 86400000; // 24 hours in ms
const MAX_CACHE_SIZE = 100; // Max number of cached images

/**
 * GET /api/images/proxy?url=ENCODED_URL
 * Proxy and cache images from Google Photos or other sources
 */
router.get('/proxy', async (req: Request, res: Response) => {
    try {
        const { url } = req.query;

        if (!url || typeof url !== 'string') {
            return res.status(400).json({ error: 'URL parameter is required' });
        }

        // Decode the URL
        const decodedUrl = decodeURIComponent(url);

        // Check cache first
        if (imageCache[decodedUrl]) {
            const cached = imageCache[decodedUrl];
            
            // Check if cache is still valid
            if (Date.now() - cached.timestamp < CACHE_DURATION) {
                res.setHeader('Content-Type', cached.contentType);
                res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours browser cache
                return res.send(cached.data);
            } else {
                // Cache expired, delete it
                delete imageCache[decodedUrl];
            }
        }

        // Fetch from source with timeout
        const response = await axios.get(decodedUrl, {
            responseType: 'arraybuffer',
            timeout: 10000, // 10 second timeout
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const buffer = Buffer.from(response.data);
        const contentType = response.headers['content-type'] || 'image/jpeg';

        // Cache the image
        if (Object.keys(imageCache).length >= MAX_CACHE_SIZE) {
            // Remove oldest cache entry if limit reached
            const oldestKey = Object.entries(imageCache).sort(
                (a, b) => a[1].timestamp - b[1].timestamp
            )[0][0];
            delete imageCache[oldestKey];
        }

        imageCache[decodedUrl] = {
            data: buffer,
            timestamp: Date.now(),
            contentType
        };

        // Send with cache headers
        res.setHeader('Content-Type', contentType);
        res.setHeader('Cache-Control', 'public, max-age=86400'); // 24 hours browser cache
        res.send(buffer);

    } catch (error: any) {
        console.error('Image proxy error:', error.message);
        
        // Return 404 for not found or other errors
        if (error.response?.status === 404) {
            return res.status(404).json({ error: 'Image not found' });
        }
        
        // Return placeholder for timeout/rate limit errors
        if (error.code === 'ECONNABORTED' || error.response?.status === 429) {
            return res.status(503).json({ error: 'Service temporarily unavailable' });
        }

        res.status(500).json({ error: 'Failed to fetch image' });
    }
});

export default router;
