const User = require("../../database/models/users");

async function find_user(value) {
    const user = await User.findOne({value});
    return !user
};

module.exports = find_user;