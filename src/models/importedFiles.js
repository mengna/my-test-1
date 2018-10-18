const mongoose = require('mongoose');
const keyConversionUtil = require('../utilities/keyConvertionUtil');

const Schema = mongoose.Schema;

const importedFilesSchema = new Schema({
    file_path: {
        type:     String,
        required: true
    }
}, { versionKey: false });

importedFilesSchema.pre('validate', function(next) {
    keyConversionUtil.camelCaseToSnakeCase(this);
    next();
});

importedFilesSchema.post('findOne', function(doc) {
    doc._doc = keyConversionUtil.snakeCaseToCamelCase(doc._doc);
});

module.exports = mongoose.model('imported_files', importedFilesSchema);
