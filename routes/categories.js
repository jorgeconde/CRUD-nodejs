
/*
 * GET categories listing.
 */

exports.list = function(req, res){
	
	req.getConnection(function(err,connection){
	       
        var query = connection.query('SELECT * FROM categorias',function(err,rows)
        {     
            if(err) console.log("Error Selecting : %s ",err );
     
            res.render('categories',{title:"Categorías",data:rows});  
         });
         //console.log(query.sql);
    });
};

exports.add = function(req, res){
    res.render('add_category',{title:"Add Category"});
};

exports.save = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	
    req.getConnection(function (err, connection) {
        
        var data = {
            categoria : input.categoria,
            color   : input.color
        };
        
        var query = connection.query("INSERT INTO categorias set ? ",data, function(err, rows)
        {
          if (err) console.log("Error inserting : %s ",err );
         
          res.redirect('/categories');
        });     
       // console.log(query.sql); get raw query
    });
};

exports.delete_category = function(req, res){
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM categorias  WHERE id = ? ",[id], function(err, rows)
       {     
            if(err) console.log("Error deleting : %s ",err );
           
            res.redirect('/categories');   
       });
    });
};

exports.edit = function(req, res){
    
	var id = req.params.id;
	    
	req.getConnection(function(err,connection){
	       
		connection.query('SELECT * FROM categorias WHERE id = ?',[id],function(err,rows)
		{
			if(err) console.log("Error Selecting : %s ",err );
	     
			res.render('edit_category',{title:"Edit Categories",data:rows});                   
		});
	}); 
};