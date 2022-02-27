const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
	let checkBearer = 'Bearer ';

	if (token) {
		if (token.startsWith(checkBearer)) {
			token = token.slice(checkBearer.length, token.length);
		}
		console.log('TOKEN:::', token);
		jwt.verify(token, process.env.SECRET, (err, decoded) => {
			if (err) {
				res.json({
					success: false,
					message: 'Failed to authenticate',
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({
			success: false,
			message: 'No token provided',
		});
	}
};
