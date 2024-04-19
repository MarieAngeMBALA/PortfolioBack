# Backend Portfolio
Here, it's for all backend request to make some frontend fonctionnalies enabled.
- I use MongoDB for database

## Installation
- Firstly you must have nodejs install in your computer
- Clone this repository in your local : git clone https://github.com/MarieAngeMBALA/PortfolioBack.git
- install dependencies :  npm install  or idealy pnpm install
- Create your own .env file
- Configure the database if you need
- After it, you can run the project

## .env file Structure
Your .env file must contain these informations to ensure consistency with the code

PORT = Port where the app will be listening (If you don't specifie it, by default the port will be 3000)
DB_URL = url of your local mongo database
ACCESS_TOKEN_SECRET = just specifie an access token to your choice
REFRESH_TOKEN_SECRET = just specifie an refresh token to your choice

## Database configuration 
You have to create Mongo database with this structure :
- Create a database with the name by your choice ( Just ensure you that, you've well specifie URL in the .env file) 

### For project
- Create project collection will all this fields if you want
{
  "title":"some title", 
  "description":"some description", 
  "keywords":"some keywords" ,
  "content":"some content" ,
  "images":""
}

### Notice that create collections is not important, you can just create it by the frontend React app

### For the user
- To connect yourself into admin mode, you must create a user profile.
- Register side isn't implement in the frontend side so you must create a user using postman for example
- User collection structure
{
  "username": "your-user-name",
  "password": "your-pass-word",
}
[The route for it should be : http://localhost:your-port/api/users/register]

## Run 
- npm run dev

## Note
- If you have a problem, you can use the frontend contact form to send me an email and I'll get back to you straight away.