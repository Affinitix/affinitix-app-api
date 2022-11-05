const { user } = require("../models/");
const { getMongooseModelWithSelectedFields } = require("../helpers/");


module.exports.create = async (data, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const createdUser = await user.create(data);
        return getMongooseModelWithSelectedFields(createdUser, fieldstoReturn);
    }
    const createdUser = await user.create(data);
    return createdUser.toObject();
};

module.exports.find = async (query, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const usersRetrieved = await user.find(query, fieldstoReturn);
        return usersRetrieved;
    }
    const usersRetrieved = await user.find(query);
    return usersRetrieved;
};

module.exports.findOne = async (query, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const userRetrieved = await user.findOne(query, fieldstoReturn);
        return userRetrieved ? userRetrieved.toObject() : null;
    }
    const userRetrieved = await user.findOne(query);
    return userRetrieved ? userRetrieved.toObject() : null;
};

module.exports.findById = async (id, fieldstoReturn = []) => {
    if (fieldstoReturn.length > 0) {
        const userRetrieved = await user.findById(id, fieldstoReturn);
        return userRetrieved.toObject();
    }
    const userRetrieved = await user.findById(id);
    return userRetrieved.toObject();
};

module.exports.updateOne = async (id, data, fieldstoReturn = []) => {
    const result = await user.updateOne({ _id: id }, data);
    if (result.modifiedCount == 0) {
        return null;
    }

    const updateUser = await this.findById(id, fieldstoReturn);
    return updateUser;
};


module.exports.updateMany = async (query, data, fieldstoReturn = []) => {
    const result = await user.updateMany(query, data);
    if (result.modifiedCount == 0) {
        return null;
    }
    const updateUsers = await this.find(query, fieldstoReturn);
    return updateUsers;
};
