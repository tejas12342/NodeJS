var app=require('./gitServer');
var routeOperation=require('./gitRouteOperation');

module.exports=function(app){

    // Fetch issues from the gitLab websites
    app.post('/issue', routeOperation.pullIssues);

    //Inserted in the database
    app.post('/issue/i',routeOperation.insertIssuesinDb);

    //Display all the record
    app.get('/issue',routeOperation.getIssueList);
    

}