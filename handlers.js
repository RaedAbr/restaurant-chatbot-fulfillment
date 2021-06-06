const IntentNames = {
  booking_choice: 'booking_choice',
  booking_choice_confirm_yes: 'booking_choice_confirm_yes',
  make_menu_choice: "make_menu_choice",
}

function Handlers (agent) {

  function bookingRequestResponse () {
    console.log('parameters: ', agent.parameters)

    const params = agent.parameters
    agent.add(`Perfect! I'll note your reservation: ${params["booking-date-time"].date_time}, table ${params["table"]}. Can you confirm?`)
  }

  function bookingChoiceConfirmYesResponse () {
    const booking = agent.context.get('booking')
    const bookingDateTime = booking.parameters["booking-date-time"].date_time
    const table = booking.parameters["table"]

    const reservationContext = {
      name: 'reservation',
      lifespan: '50',
      parameters: {}
    }

    let reservationItems = []
    if (agent.context.get('reservation')) {
      reservationItems = agent.context.get('reservation').parameters.reservationItems
    }
    reservationItems.push({
      "booking-date-time": bookingDateTime,
      table: table,
    })

    console.log('reservationItems: ', reservationItems)

    reservationContext.parameters.reservationItems = reservationItems
    agent.context.set(reservationContext)

    agent.add("Great, I've added this to your reservations. You can ask for the manu now.")
  }

  function makeMenuChoiceResponse () {
    const booking = agent.context.get('booking')
    const bookingDateTime = booking.parameters["booking-date-time"].date_time
    const table = booking.parameters["table"]
    const food = booking.parameters["food"]

    agent.end(`Great! Here is your reservation: ${bookingDateTime}, table ${table}, food: ${food}.`)

  }

  return {
    bookingChoice: () => {
      console.log(`==> "${IntentNames.booking_choice}" intent`)
      bookingRequestResponse()
    },

    bookingChoiceConfirmYes: () => {
      console.log(`==> "${IntentNames.booking_choice_confirm_yes}" intent`)
      bookingChoiceConfirmYesResponse()
    },

    makeMenuChoice: () => {
      console.log(`==> "${IntentNames.make_menu_choice}" intent`)
      makeMenuChoiceResponse()
    }
  }
}

module.exports = { Handlers, IntentNames }
