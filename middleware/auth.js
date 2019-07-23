module.exports = {
    isUser: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next()
        }
        else {
            req.flash('warning', 'You are not logged in')
            res.redirect('/users/login')
        }
    },
    isAdmin: (req, res, next) => {
        if (req.isAuthenticated()) {
            if (req.user.group == 'admin') {
                return next()
            }
            else {
                req.flash('warning', 'Insufficient privileges')
                res.redirect('/')
            }
        }
        else {
            req.flash('warning', 'You are not logged in')
            res.redirect('/users/login')
        }
    }
}

function checkRole(req, res, next, role) {
    if (req.isAuthenticated()) {
        return next()
    }
    else {
        req.flash('warning', 'You are not logged in')
        res.redirect('/users/login')
    }
}
