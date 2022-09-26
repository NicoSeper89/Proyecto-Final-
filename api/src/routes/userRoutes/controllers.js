const { TypeOfUser, User, LoginInfo, UserImage, Publication } = require("../../db");
const {
    Property,
    Service,
    TypeOfProp,
    City,
    PropertyImage,
    Report,
    ContactInfo
  } = require("../../db");
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
const getOneUser = async (id) => {
  return await User.findOne({
    where: { id: id },
      include: [
         { model: TypeOfUser },
         { model: LoginInfo },
         { model: UserImage },
         { model: Publication }
      ]
  })
};
const getPubs = async (id) => {
    return await Publication.findAll({
      where: { userId: id },
      include: [
        {
          model: Property,
          include: [
            {
              model: City,
              attributes: ["name"],
            },
            {
              model: TypeOfProp,
              attributes: ["name"],
            },
            {
              model: Service,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: PropertyImage,
              attributes: ["url", "cloudId"],
            },
          ],
        },
        {
          model: Report,
        },
      ],
    });
  };

  const getPublications= async (id) => {
    return await Publication.findOne({
      where: { id: id },
      include: [
        {
          model: Property,
          include: [
            {
              model: City,
              attributes: ["name"],
            },
            {
              model: TypeOfProp,
              attributes: ["name"],
            },
            {
              model: Service,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
            {
              model: PropertyImage,
              attributes: ["url", "cloudId"],
            },
          ],
        },
        {
          model: Report,
        },
        {
          model: User,
          include:[
            {
              model: ContactInfo,
              attributes: ["mail","whatsapp","telegram","facebook"],
            },
          ]
        }
      ],
    });
  };
module.exports = {getAllUsers,getPubs,getPublications,getOneUser}