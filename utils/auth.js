// need 'withAuth' to limit usage when not signed in
// can view comments, but not add, update, or delete
// also needed to restrict links - only homepage when not logged in
const withAuth = (req, res, next) => {
    if (!req.session.user_id) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;