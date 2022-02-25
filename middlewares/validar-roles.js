/**
 * @description Role must be 'ADMIN_ROLE'
 */
const isAdminRole = (req, res, next) => {
    if (!req.userAuthenticated) return res.status(500).json({ msg: 'req.user is undefined' })

    const { rol, nombre } = req.userAuthenticated

    if (rol != 'ADMIN_ROLE') return res.status(400).json({ msg: 'Solo los admin pueden borrar.' })

    next()
}

const hasRole = (...roles) => {
    console.log('ROLES', roles)
    return (req, res, next) => {
        next()

    }
}


module.exports = {
    isAdminRole,
    hasRole
}