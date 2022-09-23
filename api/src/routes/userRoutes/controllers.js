const { TypeOfUser, User, LoginInfo, UserImage, Publication } = require("../../db");

const getAllUsers = async () => {
    return await User.findAll({
        include: [
           { model: TypeOfUser },
           { model: LoginInfo },
           { model: UserImage },
           { model: Publication }
        ]
    })
};

module.exports = {getAllUsers}