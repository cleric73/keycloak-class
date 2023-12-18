const jwt = require('jsonwebtoken');

module.exports = function protect(requiredRoles = []){
    return async (req, res, next) => {
        try {
            console.log(requiredRoles);
            // check if token exists
            if(!req.headers.authorization) { 
                res.status(403);
                res.send('403: unauthorized access');
            } else {

                /*
                const time = new Date();
                let seconds = time.getTime();
                console.log(seconds);
                */

                //console.log(req);

                let userRoles = [];
                let token = req.headers.authorization.split(' ')[1];
                let decoded = jwt.decode(token);

                console.log(decoded);

                userRoles = Array.prototype.concat(userRoles, decoded.realm_access.roles);
                userRoles = Array.prototype.concat(userRoles, decoded.resource_access['test_backend'].roles);

                //console.log(requiredRoles);
                //console.log(userRoles);
        
                let existingRoles = userRoles.filter(x => requiredRoles.includes(x));
                if(existingRoles.length <= 0) { res.status(403).send('403: unauthorized access'); } else {
                    next();
                }
                
            }
        }
        catch (error) {
            next(error)
        }
    }
}