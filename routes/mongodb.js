global.db
global.CollectionName = 'mytbl';

MongoClient.connect('mongodb://localhost/my_test_monog_db', (err, database) => {
	if (err) return console.log(err)	 
	db = database 
	console.log('my_test_monog_db running on '+ port)	
})


//--->add - Start
exports.add = function(req, res)
{ 
	//var get_rows = req.body.toatl_rows; 
	var get_rows = req.query['total_rows'];

	var DataArr =  [];
	console.log('  ')
	console.time('DataArr');
	for (var i = 0; i < get_rows; i++) 
	{
		var row =  {
			id: i+1, 
			rec_id: +moment(),			
			code:chance.string(),
			txt: chance.paragraph(),
			
		} ;
		DataArr.push(row);
 
	};
	console.timeEnd('DataArr');
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");

	console.time(dttm+' >>>monogdb_call_add')

	db.collection(CollectionName).insertMany(DataArr , function(err, result){
		if (err) return console.log(err)
		 
		res.json({ status:"success", total_rows: result.length  });

		console.timeEnd(dttm+' >>>monogdb_call_add')
	})
}
//--->add - End

//--->Get - Start
exports.get = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
    console.time(dttm+' >>>monogdb_call_get');
	
	db.collection(CollectionName).find().toArray(function(err, result) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>monogdb_call_get'); 	 
		res.json({ status:"success", total_rows: result.length  });
	}) 
}
//--->Get - End

//--->Getwhere - Start
exports.getWhere = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
    console.time(dttm+' >>>monogdb_call_getWhere');
	var where =  { id:{$gte:5,$lt:10}  };
	db.collection(CollectionName).find(where).toArray(function(err, result) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>monogdb_call_getWhere'); 	 
		res.json({ status:"success", total_rows: result.length  });
	}) 
}
//--->Getwhere - End



//--->update - Start
exports.update = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");
    var code = +moment();

	var updateto = { $set: { code:code,txt:'dddddd'}};
	var where =  { id:{$gte:5,$lt:10}  };
	
	console.time(dttm+' >>>monogdb_call_update');

	db.collection(CollectionName).updateMany(where,updateto,function(err, result) 
	{
		if (err) return console.log(err)
		db.collection(CollectionName).find(where).toArray(function(err, result) 
		{
			if (err) return console.log(err)
			console.timeEnd(dttm+' >>>monogdb_call_update'); 
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
    
    var where =  { id:{$gte:5,$lt:10}  };
	
	console.time(dttm+' >>>monogdb_call_delete');

	db.collection(CollectionName).deleteMany(where,function(err, result) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>monogdb_call_delete');
		res.json({ status:"success", total_rows: result.length,data:result  }); 

	});
}
//--->delete - End

//--->delete - Start
exports.deleteAll = function(req, res)
{ 
	var dttm = moment().format("YYYY-MM-DD h:mm:ss a");    
   
	console.time(dttm+' >>>monogdb_call_deleteAll');

	db.collection(CollectionName).deleteMany({},function(err, result) 
	{
		if (err) return console.log(err)
		console.timeEnd(dttm+' >>>monogdb_call_deleteAll');
		res.json({ status:"success", total_rows: result.length,data:result  }); 

	});
}
//--->deleteAll - End


 
