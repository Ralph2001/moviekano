import { NextApiRequest, NextApiResponse } from 'next'
import { moviesApi } from '../../../services/tmdbClient'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tmdb } = req.query
    const path = Array.isArray(tmdb) ? tmdb.join('/') : tmdb

    try {
        const page = req.query.page || 1
        switch (path) {
            case 'popular':
                const popularData = await moviesApi.getPopular(Number(page))
                console.log('data', popularData)
                return res.status(200).json(popularData)
            case 'top-rated':
                const topRatedData = await moviesApi.getTopRated(Number(page))
                console.log('data', topRatedData)
                return res.status(200).json(topRatedData)

            default:
                if (path?.startsWith('movie/')) {
                    const id = path.split('/')[1]
                    const data = await moviesApi.getById(id)
                    return res.status(200).json(data)
                }
                return res.status(404).json({ message: 'Endpoint not found' })
        }
    } catch (error) {
        return error
    }
}

export default handler