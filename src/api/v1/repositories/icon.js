const { icon } = require("../models/");
const { getMongooseModelWithSelectedFields } = require("../helpers/");


module.exports = {
    create: async (data, fieldstoReturn = []) => {
        if (fieldstoReturn.length > 0) {
            const createdIcon = await icon.create(data);
            return getMongooseModelWithSelectedFields(createdIcon, fieldstoReturn);
        }
        const createdIcon = await icon.create(data);
        return createdIcon.toObject();
    },
    find: async (query, fieldstoReturn = []) => {
        if (fieldstoReturn.length > 0) {
            const iconRetrieved = await icon.find(query, fieldstoReturn);
            return iconRetrieved;
        }
        const iconRetrieved = await icon.find(query);
        return iconRetrieved;
    },
    findOne: async (query, fieldstoReturn = []) => {
        if (fieldstoReturn.length > 0) {
            const iconRetrieved = await icon.findOne(query, fieldstoReturn);
            return iconRetrieved ? iconRetrieved.toObject() : null;
        }
        const iconRetrieved = await icon.findOne(query);
        return iconRetrieved.toObject();
    },
    findById: async (id, fieldstoReturn = []) => {
        if (fieldstoReturn.length > 0) {
            const iconRetrieved = await icon.findById(id, fieldstoReturn);
            return iconRetrieved ? iconRetrieved.toObject() : null;
        }
        const iconRetrieved = await icon.findById(id);
        return iconRetrieved ? iconRetrieved.toObject() : null;
    },
    updateOne: async (id, data, fieldstoReturn = []) => {
        const result = await icon.updateOne({ _id: id }, data);
        if (result.modifiedCount == 0) {
            return null;
        }
        return this.findById(id, fieldstoReturn);
    },
    updateMany: async (query, data, fieldstoReturn = []) => {
        const result = await icon.updateMany(query, data);
        if (result.modifiedCount == 0) {
            return null;
        }
        return this.find(query, fieldstoReturn);
    }
};