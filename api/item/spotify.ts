var SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi({
  clientId: "ff815de6acca4c49bbe96f55b4a551a3",
  clientSecret: "44b4cc0abbfe455f9d40467458a9230b",
  redirectUri: "http://localhost:3000/callback",
});
