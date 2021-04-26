const Users = require('../model/Users');

const showIndex = (req, res) => {
  res.render('index');
};

const addNewUser = (req, res) => {

  const newUser = new Users({
    name: 'Иван',
    exp: 30,
    role: 'welder',
    salary: 20000,
    stage: 1,
    transportation: false,
  });

  newUser.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) throw err;
    res.sendStatus(200);
});

};

const showUserById = async (req, res) => {
  const {
    id
  } = req.query;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
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

module.exports = {
  addNewUser,
  showUserById,
  showIndex,
};