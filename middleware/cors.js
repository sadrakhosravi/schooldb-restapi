// Sets the CORS to only allow a specific URL to communicate with the API
module.exports = (req, res, next) => {
  // Only support http://localhost:3000/
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // If the browser is allowed to make the request
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }
};
