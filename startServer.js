import express from 'express'
import { getExchangeRate } from './index.js'

const app = express()
const port = 3005

app.get('/rates', async (req, res) => {
    try {
        const { value } = req.query

        if(!value) {
            res.send("вы не ввели value")
            return
        }
        const rates = await getExchangeRate(value)

        res.send(rates)
    } catch (e) {
        console.log('Loc error get rates', e)
        res.send('Loc error get rates')
    }
})

app.listen(port, () => console.log(`startServer on port ${port}!`))