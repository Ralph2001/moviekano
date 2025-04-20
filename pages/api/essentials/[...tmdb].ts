import { NextApiRequest, NextApiResponse } from 'next'
import { essentialApi, moviesApi } from '../../../services/tmdbClient'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tmdb } = req.query
    const path = Array.isArray(tmdb) ? tmdb.join('/') : tmdb

    try {
        const page = req.query.page || 1
        switch (path) {

            case 'trending-week':
                const trendingWeekData = await essentialApi.getTrendingWeek(Number(page))
                console.log('data', trendingWeekData)
                return res.status(200).json(trendingWeekData)
            case 'trending-day':
                const trendingDayData = await essentialApi.getTrendingDay(Number(page))
                console.log('data', trendingDayData)
                return res.status(200).json(trendingDayData)

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