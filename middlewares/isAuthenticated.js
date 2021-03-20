export async function isAuthenticated(req, res, next) {
	if (req.session.userId) {
		return next();
	}

	next(new Error('Not authenticated'));
}