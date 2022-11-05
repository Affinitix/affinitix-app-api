
module.exports.getMongooseModelWithSelectedFields = (model, selectedFieldsArray) => {
    const modelToJsObject = model.toObject();
    let modelWithSelectedFields = {};
    selectedFieldsArray.forEach((fieldName) => modelWithSelectedFields[fieldName] = modelToJsObject[fieldName]);
    return modelWithSelectedFields;
};


module.exports.randomNumberGenerator = (lenght) => {
    return Math.random().toFixed(lenght).split('.')[1];
};