var gitLabAccess= require('node-gitlab-api').default
var dbOperation=require('./gitDbOperation');
var httpStatus=require('http-status-codes');
const {statusDataTypeString, 
    IssueDataTypeString, fetchSuccessfull, 
    gitURL, gitToken, DataInserted}= require('./gitRoutesConfig');

const api= new gitLabAccess({
    url: gitURL,
    token: gitToken
});
var data=[];

// numberOfPage,perPageIssue
module.exports={ 
    pullIssues: function (request,response){
    var issues = api.Projects.all({ maxPages: 1 })
        .then((projects) => {
            for (let i of projects) {
                var property = {
                    ID: i.id,
                    Name: i.name,
                    Web_URL: i.web_url,
                    SSH_URL: i.ssh_url_to_repo
                }
                data.push(property); 
            }
            response.status(httpStatus.OK).json({IssueDataTypeString:data});
        })

        .catch((err) => {
            console.error("Error" + err);
        })
},
    insertIssuesinDb: function (request, response) {
        console.log("Insert");
        console.log(data.length);
        if ((data.length) !== 5) {      // Validate the length of the object
            response.status(httpStatus.BAD_REQUEST).json(
                { Status: constConfig.insertError }
            );
        }
        for(let i of data){
        dbOperation.insertRecord(i.ID, i.Name, i.Web_URL,i.SSH_URL)
            .then((result)=>{
                console.log(DataInserted);
            })
            .catch((err)=>{
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json({ Status: constConfig.updateError });
            })
        }
        response.status(httpStatus.OK).json({ Status: DataInserted });
    },
    getIssueList: function (request, response) {
        dbOperation.getAllRecord()
            .then((result) => {
                response.status(httpStatus.OK).json(
                    { result }
                );
            })
            .catch((err) => {
                response.status(httpStatus.INTERNAL_SERVER_ERROR).json(
                    { Status: constConfig.retriveError + err.message }
                );
            })
    }
}

// {statusDataTypeString:fetchSuccessfull},