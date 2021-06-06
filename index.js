const express = require('express')
const morgan = require('morgan')
const { WebhookClient } = require('dialogflow-fulfillment')

const { Handlers, IntentNames } = require('./handlers')
const { authentication } = require('./authentication')

process.env.DEBUG = 'dialogflow:debug'

const app = express()
app.use(morgan('combined'))
app.use(express.static('public'))

app.get('/', (req, res) => res.send('online'))
app.post('/dialogflow', express.json(), authentication, (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  const handlers = Handlers(agent)

  const intentMap = new Map()

  intentMap.set(IntentNames.booking_choice, handlers.bookingChoice)
  intentMap.set(IntentNames.booking_choice_confirm_yes, handlers.bookingChoiceConfirmYes)
  intentMap.set(IntentNames.make_menu_choice, handlers.makeMenuChoice)

  agent.handleRequest(intentMap)
})

app.listen(process.env.PORT || 8080)
