import express from 'express'
import { getExchangeRate } from './index.js'
import https from 'https'
import fs from 'fs'
import cors from 'cors'

const PORT = 8443

const app = express()
app.use(cors({
    origin: '*'
}))

const httpsOptions = {
    key: fs.readFileSync('privatekey.pem', 'utf-8'),
    cert: fs.readFileSync('sertificat.pem', 'utf-8')
}
console.log("httpsOptions", httpsOptions)


app.get('/api/rates', async (req, res) => {
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

const server = https.createServer(httpsOptions, app)

server.listen(PORT, () => console.log(`startServer on port ${PORT}!`))