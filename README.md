# Hookeai Poke
Welcome to our food ordering experience for the fictitious restaurant 'Hookeai Poke'.

Hungry clients of Hookeai Poke can visit this website, select one or more dishes and place an order for pick-up. The restaurant will receive a text to start the order, which then they can text 'Confirmed' to send a message to the customer that they have received the order and it is being prepared.  When the order is ready for pick up, they can then text 'Ready', which then will notify the customer they can now go pick up the order.

This project was our first stab at a group project, brought together by: Chris Arsenault, Ivana Lee, Ryan Kendrick and Azusa Shimazaki.

## Getting Started

1. Clone this repo
2. Install dependencies using 'npm install'
3. Start the web server using 'npm run local'.
4. Visit `http://localhost:8080/`

Unfortunately to get the texting part functional, you will need to set up an account at www.twilio.com (a telecomm API service), as well as register for a twilio phone number and register any numbers you want on account.  You will also need to download ngrok and set up an account with them as well to run the webhook intergration, as well as connect it to your Twilo account.

## Dependencies

- Node: 5.10.x or above
- NPM: 3.8.x or above
- BodyParser: ^1.15.2
- Cookie-session: ^2.0.0-beta.3
- Dotenv: ^2.0.0
- Ejs: ^2.4.1
- Express: ^4.13.4
- Knex: ^0.11.7
- Knex-logger: ^0.1.0
- Morgan: ^1.11.7
- Node-sass-middleware: ^0.9.8
- Pg: ^6.0.2
- Twilio: ^3.23.2

## Screenshots
!["Landing page1"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-main1.png?raw=true)
!["Landing page2"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-main2.png?raw=true)
!["Menu page1"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-menu1.png?raw=true)
!["Menu page2"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-menu2.png?raw=true)
!["Checkout page"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-checkout.png?raw=true)
!["Confirmation page"](https://github.com/chrisstanarsenault/hookeai-poke/blob/master/docs/hookeai-poke-ss-confirmation.png?raw=true)

