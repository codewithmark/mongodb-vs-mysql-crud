
// create the connection to database
global.db_mysql=  mysql.createPool(
{
    host:'localhost', 
    user: 'root', 
    database: 'my_test_mysql_db',
    multipleStatements: true,
})

//--->add - Start
exports.add = function(req, res)
{ 
   
	var get_rows = req.query['total_rows'];
/*
	var get_rows = req.body.total_rows; 
	
	var u = req.url;

	console.log('get_rows ' , email);
	console.log(' u ', u)
	res.json({ status:"error", get_rows:get_rows });
	return false; 
*/
	var DataArr =  [];
	console.log('  ')
	console.time('DataArr');
	for (var i = 0; i < get_rows; i++) 
	{
		DataArr.push( [i+1, +moment(),chance.string(),chance.paragraph() ]);
	};
	var RowData = DataArr
	console.timeEnd('DataArr');
	//console.log(DataArr)
	//console.log(RowData)


	//res.json({ status:"success", }); 
	//return false; 
 	
 	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");

	console.time(dttm+' >>>mysql_call_add');

	var RowData1 = {
   		id:  1, 
		rec_id: +moment(),			
		code:chance.string(),
		txt: chance.paragraph(),
    }
    db_mysql.query({sql:"INSERT INTO mytbl (id,rec_id,code,txt) VALUES  ? ",timeout: 40000},[DataArr], function (err, results, fields) 
    //db_mysql.query("INSERT INTO mytbl SET ? ",RowData1, function (err, results, fields) 
    {
        if(err)
        {
        	console.log(err);
        	res.json({ status:"error", err:err });
        	throw err; 
        	return false; 


        } 
		console.timeEnd(dttm+' >>>mysql_call_add');
        res.json({ status:"success", last_insert_id:results.insertId }); 
          
    });
 	   
}
//--->add - End
 

//--->Get - Start
exports.get = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
    console.time(dttm+' >>>mysql_call_get');
	
	db_mysql.query('Select * From mytbl',function  (err, result, fields) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>mysql_call_get'); 	 
		res.json({ status:"success", total_rows: result.length  });
	}) 
}
//--->Get - End

//--->Getwhere - Start
exports.getWhere = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");

    console.time(dttm+' >>>mysql_call_getWhere');

	db_mysql.query('Select * From mytbl WHERE id>? and id<?',[5,10],function  (err, result, fields) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>mysql_call_getWhere'); 	 
		res.json({ status:"success", total_rows: result.length  });
	}) 
}
//--->Getwhere - End


//--->update - Start
exports.update = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
    var code = +moment();
 
	console.time(dttm+' >>>mysql_call_update');

	var RowData = {code:code,txt:'dddddd' };
 

	db_mysql.query('Update mytbl  Set ? WHERE id>? and id<?',[RowData,5,10],function  (err, result, fields) 
	{
		if (err) return console.log(err)
		db_mysql.query('Select * From mytbl WHERE id>? and id<?',[5,10],function  (err, result, fields) 
		{
			if (err) return console.log(err)
			console.timeEnd(dttm+' >>>mysql_call_update'); 
			//console.log(' udpate code column to ' + code);	 
			res.json({ status:"success", total_rows: result.length,data:result  });
		}) 
	});
}
//--->update - End
 
 
//--->delete - Start
exports.delete = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
	
	console.time(dttm+' >>>mysql_call_delete');

	db_mysql.query('Delete From mytbl WHERE id>? and id<?',[5,10],function  (err, result, fields) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>mysql_call_delete'); 
		 
		res.json({ status:"success", total_rows: result.length,data:result  });
	}) 
}
//--->delete - End

//--->delete - Start
exports.deleteAll = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
	
	console.time(dttm+' >>>mysql_call_deleteAll');

	db_mysql.query('Delete From mytbl ' ,function  (err, result, fields) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>mysql_call_deleteAll'); 
		 
		res.json({ status:"success", total_rows: result.length,data:result  });
	}) 
}
//--->delete - End



 