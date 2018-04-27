const localHost = "localhost";
const root = "root";
const SampleDb = "SampleDb";
const create = "/create";
const show = "/show";
const update = "/update";
const insert = "/insert";
const Delete = "/Delete";

const dbNotConnect = "Not connected with the DB:->";
const connected = "Connected!!";
const tableCreatError = "Error in Table creation, table already exist:-> ";
const tableCreated = "Table Created";
const retriveError = "Not able to retrive the data:-> ";
const updateError = "Error in Update the record:->";
const updateDone = "Update Successfully";
const tableNotFound = "Table not found";
const insertError = "Error in Insert in the Record:->";
const insertDone = "Insert Successfully";
const deleteError = "Not able to Delete the record:->";
const deleteDone = "The record is deleted";

module.exports = {
    localHost, root, SampleDb, create, show, update,
    insert, Delete, dbNotConnect, connected, tableCreatError,
    tableCreated, retriveError, updateError, updateDone, tableNotFound,
    insertError, insertDone, deleteError, deleteDone
};