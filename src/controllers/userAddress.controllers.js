const { UserAddress, User } = require("../db");
const controller = {};

controller.createUserAddress = async (req, res) => {
  const {
    postalCode,
    state,
    city,
    address,
    annotations,
    email,
  } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [UserAddress]
    });
    if(user.userAddresses[0]){
      console.log("true")
      await UserAddress.update({
        postalCode,
        state,
        city,
        address,
        annotations,
        deleted: false,
      },
      {
        where: {
          id: user.userAddresses[0].id
        }
      })
      res.status(200).send("address created");
    }else{
      await UserAddress.create({
        postalCode,
        state,
        city,
        address,
        annotations,
        deleted: false,
        userId: user.id,
     });
      res.status(200).send("address created");
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

controller.getUserAddress = async (req, res) => {
  const {
    email,
  } = req.params;

  try {
    const user = await User.findOne({
      where: {
        email,
      },
      include: [UserAddress]
    });
    console.log(user.userAddresses[0].postalCode)
    res.status(200).send(user.userAddresses);
  } catch (err) {
    res.status(400).send(err);
  }
};

// controller.editUserAddress = async (req, res) => {
//   const {
//     postalCode,
//     state,
//     city,
//     address,
//     annotations,
//     partment,
//     id,
//   } = req.body;

//   try {
//       await UserAddress.update({
//         postalCode,
//         state,
//         city,
//         address,
//         annotations,
//         partment,
//         deleted: false,
//       },
//       {
//         where: {
//           id: id
//         }
//       }
//       );
//       res.status(200).send("address update");
//   } catch (err) {
//     res.status(400).send(err);
//   }
// };



module.exports = controller;
