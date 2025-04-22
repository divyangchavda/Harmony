import express from 'express'
import SpotifyWebApi from 'spotify-web-api-node'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
const app=new express()
app.use(bodyParser.json());
app.use(cors({
    origin: "https://harmony-8ds8.onrender.com",
}))
const clientId=process.env.Client_Id
const clientSecret=process.env.Client_Secret
console.log(clientId,clientSecret)
app.post('/login',(req,res)=>{
    const code=req.body.code
    console.log("Code from /login in backend:",code)
    if(!code){
        return res.status(404).json({message:"No Authorization code"})
    }
    const spotifyapi=new SpotifyWebApi({
        
        redirectUri:'https://harmony-8ds8.onrender.com',
        clientId: clientId ,
        clientSecret:clientSecret
    })
    console.log("Code:",code)
    spotifyapi.authorizationCodeGrant(code).then(data=>{
        res.json({
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn:data.body.expires_in,
        })
    }).catch(err=>
    {
        console.error("/login catch block",err)
    })
})

app.post('/refresh',(req,res)=>{
    const refreshToken=req.body.refreshToken
    const spotifyapi=new SpotifyWebApi({
        redirectUri:'https://harmony-8ds8.onrender.com',
        clientId:clientId,
        clientSecret:clientSecret,
        refreshToken
    })
    spotifyapi.refreshAccessToken().then((data)=>{
        res.json({
            accessToken:data.body.access_token,
            expiresIn:data.body.expires_in,
        })
        
    })
    .catch(err=>
        {
            console.error("/refresh catch block",err)
        })
})

app.listen(5000,()=>{
    console.log("Server is Running on Port 5000")
})


// Imports
// import express from 'express'
// import SpotifyWebApi from 'spotify-web-api-node'
// import bodyParser from 'body-parser'
// import cors from 'cors'
// import dotenv from 'dotenv'

// // Load environment variables from .env
// dotenv.config();

// // Create Express app
// const app = express()

// // Middleware
// app.use(bodyParser.json());
// app.use(cors({
//     origin: "https://harmony-8ds8.onrender.com", // frontend URL
// }))

// // Load Spotify credentials from environment variables
// const clientId = process.env.Client_Id
// const clientSecret = process.env.Client_Secret

// console.log("Client ID:", clientId)
// console.log("Client Secret:", clientSecret)

// // --- NEW ROUTE: /callback ---
// // Spotify redirects here after login with the auth code.
// // We forward the code to the frontend.
// app.get('/callback', (req, res) => {
//     const code = req.query.code;
//     console.log("Authorization code:", code);
//     if (!code) {
//         return res.status(400).json({ message: "Missing authorization code" });
//     }
//     // Redirect to frontend with code in query params
//     res.redirect(`https://harmony-backend-b2cx.onrender.com/?code=${code}`);
// });

// // --- LOGIN ROUTE ---
// // This exchanges the code for access & refresh tokens.
// app.post('/login', (req, res) => {
//     const code = req.body.code;
//     if (!code) {
//         return res.status(404).json({ message: "No Authorization code" });
//     }

//     const spotifyapi = new SpotifyWebApi({
//         redirectUri: 'https://harmony-backend-b2cx.onrender.com/callback', // ✅ Updated
//         clientId,
//         clientSecret
//     });

//     spotifyapi.authorizationCodeGrant(code).then(data => {
//         res.json({
//             accessToken: data.body.access_token,
//             refreshToken: data.body.refresh_token,
//             expiresIn: data.body.expires_in,
//         });
//     }).catch(err => {
//         console.error("Spotify Login Error", err);
//         res.sendStatus(500);
//     });
// });

// // --- REFRESH ROUTE ---
// // This refreshes an expired access token using the refresh token.
// app.post('/refresh', (req, res) => {
//     const refreshToken = req.body.refreshToken;

//     const spotifyapi = new SpotifyWebApi({
//         redirectUri: 'https://harmony-backend-b2cx.onrender.com/callback', // ✅ Updated
//         clientId,
//         clientSecret,
//         refreshToken
//     });

//     spotifyapi.refreshAccessToken().then((data) => {
//         res.json({
//             accessToken: data.body.access_token,
//             expiresIn: data.body.expires_in,
//         });
//     }).catch(err => {
//         console.error("Refresh Token Error", err);
//         res.sendStatus(500);
//     });
// });

// // --- SERVER START ---
// app.listen(5000, () => {
//     console.log("Server is Running on Port 5000");
// });

