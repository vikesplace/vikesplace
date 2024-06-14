import User from '../models/user_models.js';

export const createUser = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        location: req.body.location,
        items_sold: req.body.items_sold,
        items_bought: req.body.items_bought
    })
    .then((result) => {
        return res.json({
            message: "Created User"
        });
    })
    .catch((error) => {
        console.log(error);
        return res.json({
            message: "Unable to create user"
        });
    });
}