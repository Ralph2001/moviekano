import { NextApiRequest, NextApiResponse } from 'next'
import { moviesApi, tvApi } from '../../../services/tmdbClient'

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
            case 'similar':
                const similarData = await tvApi.getSimilarTvShow(Number(page))
                console.log('data', similarData)
                return res.status(200).json(similarData)

            default:
                if (path?.startsWith('movie/')) {
                    const id = path.split('/')[1]
                    const data = await moviesApi.getById(Number(id))
                    return res.status(200).json(data)
                }
                return res.status(404).json({ message: 'Endpoint not found' })
        }
    } catch (error) {
        return error
    }
}

export default handler