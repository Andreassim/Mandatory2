export function requireUser(req, res, next) {
    if(req.session.user){
        next();
    }
    else {
        res.status(401).send({message: "Unathorized"});
    }
};

export function requireAdmin(req, res, next){
    if(req.session.user.is_admin){
        next();
    }
    else {
        res.status(401).send({message: "Unathorized"});
    }
};