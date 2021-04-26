const Users = require('../model/Users');

const showIndex = async (req, res) => {
  const resultArr = await Users.find({});
  res.render('index', { usersArr: resultArr });
};

const addNewUser = async (req, res) => {
  const newUser = new Users(req.body);
  let tempId = '';
  newUser.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) {
      res.send(`not correct data`);
      console.log('ERR>>>>', err);
    } else {
      tempId = data._id;
    }
  });
  const result = await Users.find({});

  res.send({ newUserId: tempId, usersArr: result })
  
};

const showUserById = async (req, res) => {
  const { id } = req.query;
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({
      message: 'missing id in DB'
    });
  } else {
    try {
      const user = await Users.findById(id);
      console.log('user>>>', user);
      if (!user) {
        res.json({
          message: "user not found"
        });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.json({
        message: `id ${err.value} not found`
      });
      console.log('ERROR>>>', err);
    }
  };
};

const delUser = async (req, res) => {
  const { id } = req.body;
  Users.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.json({ message: 'error!'});
      console.log('ERR>>>, err');
    } else {
      console.log('id>>>>', id);
    }
  });
  const result = await Users.find({});

  res.send({deletedId: id, usersArr: result })
  
};

const updateUser = async (req, res) => {
  const { id, name, birth, exp, role, salary } = req.body;
  let tempId = '';
  console.log('id111>>>>', id);

  Users.findByIdAndUpdate(id, { name: `${name}`, birth: `${birth}`, exp: `${exp}`, role: `${role}`, salary: `${salary}`, }, (err, data) => {
    if (err) {
      res.json({ message: 'error!'});
      console.log('ERR>>>, err');
    } else {
      console.log('id>>>>', id);
      tempId = data._id;
      }
  });
  const result = await Users.find({});

  res.send({updatedId: tempId, usersArr: result })
};

module.exports = {
  addNewUser,
  showUserById,
  showIndex,
  delUser,
  updateUser,
};