
/*
 * GET answers listing.
 */

exports.list = function(req, res){
	req.getConnection(function(err,connection){
	       
        var query = connection.query('SELECT * FROM respuestas',function(err,rows)
        {
            
            if(err)
                console.log("Error Selecting : %s ",err );
     
            res.render('answers',{title:"Respuestas",data:rows});
                
           
         });
         
         //console.log(query.sql);
    });
};

exports.add = function(req, res){
    res.render('add_answers',{title:"Add Answers"});
};

exports.save = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	
    req.getConnection(function (err, connection) {
        
        var data = {
            id_pregunta : input.id_pregunta,
            posicion   	: input.posicion,
            respuesta	: input.respuesta,
            verdadera	: input.verdadera,
            activa		: input.activa
        };
        
        var query = connection.query("INSERT INTO respuestas set ? ",data, function(err, rows)
        {
          if (err) console.log("Error inserting : %s ",err );
         
          res.redirect('/answers');
        });     
       // console.log(query.sql); get raw query
    });
};

exports.delete_answer = function(req, res){
    var id = req.params.id;
    var posicion = req.params.posicion;
    var respuesta = req.params.respuesta;
    var sql = "DELETE FROM respuestas " +
    		"WHERE id_pregunta =" + id +" AND posicion = " + posicion + " AND respuesta ='" + respuesta +"'";
    
    req.getConnection(function (err, connection) {
       
       connection.query(sql, function(err, rows)
       {     
            if(err) console.log("Error deleting : %s ",err );
           
            res.redirect('/answers');   
       }); 
    });
};