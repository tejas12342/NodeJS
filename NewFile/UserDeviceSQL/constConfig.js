const create = "/create";
const show = "/show";
const update = "/update";
const insert = "/insert";
const Delete = "/Delete";
const result="result";
const Name="Name";
const Address="Address";
const ID="ID";
const Status="Status";

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
const patchDone= "All CRUD function executed!!";
const patchError="Error occured in the CRUD operation";
const serverStarted="Server successfully started";

module.exports = {
    create, show, update,insert, Delete, tableCreatError,
    tableCreated, retriveError, updateError, updateDone, tableNotFound,
    insertError, insertDone, deleteError, deleteDone,patchDone,patchError,result,
    Name, Address, ID, Status
};