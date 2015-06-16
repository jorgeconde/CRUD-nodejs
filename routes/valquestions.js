/*
 * GET valquestions listing.
 */

exports.list = function(req, res){
	req.getConnection(function(err,connection){
	       
        var query = connection.query('SELECT * FROM tmp_preguntas',function(err,rows)
        {     
            if(err) console.log("Error Selecting : %s ",err );
            var data = rows;
            
            var query2 = connection.query('SELECT id_pregunta, respuesta, verdadera FROM respuestas WHERE activa=0 order by id_pregunta',function(err,rows){
            	res.render('valquestions',{title:"Preguntas por validar", data:data, answers:rows});
            }); 
         });
    });
};

exports.add = function(req, res){
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM categorias', function(err,rows)
		{
			if(err) console.log("Error Selecting : %s ", err);
			
			res.render('add_valquestions',{title:"Add Questions", data:rows});
		});
	});
};

exports.save = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	console.log(input);
	var v1 = 0, v2 = 0, v3 = 0, v4 = 0;
	var active = '0';
	var id_preguntatmp;
	
	if(input.verdadera == 1) v1 = '1';
	if(input.verdadera == 2) v2 = '1';
	if(input.verdadera == 3) v3 = '1';
	if(input.verdadera4 == 4) v4 = '1';
	
    req.getConnection(function (err, connection) {
        
    	var data = {
            id_categoria : input.id_categoria,
            pregunta   : input.pregunta
        };
        
        var query = connection.query("INSERT INTO tmp_preguntas set ? ",data, function(err, rows)
        {
          if (err) console.log("Error inserting : %s ",err );
         
          
        }); 
        var maxid = connection.query("SELECT max(id_preguntatmp) as max_id FROM tmp_preguntas", function(err, rows)
        {
        	if (err) console.log("Error inserting : %s ",err );
        	
        	id_preguntatmp = rows[0].max_id;
        	console.log(rows);
        	console.log(id_preguntatmp);
        	
        	var ans1 = {
                	id_pregunta	: id_preguntatmp,
                	posicion	: "1",
                	respuesta	: input.respuesta1,
                	verdadera	: v1,
                	activa		: active
            };
            var ans2 = {
                	id_pregunta	: id_preguntatmp,
                	posicion	: "2",
                	respuesta	: input.respuesta2,
                	verdadera	: v2,
                	activa		: active
            };
            var ans3 = {
                	id_pregunta	: id_preguntatmp,
                	posicion	: "3",
                	respuesta	: input.respuesta3,
                	verdadera	: v3,
                	activa		: active
            };
            var ans4 = {
                	id_pregunta	: id_preguntatmp,
                	posicion	: "4",
                	respuesta	: input.respuesta4,
                	verdadera	: v4,
                	activa		: active
            };
            
            var query2 = connection.query("INSERT INTO respuestas set ? ", ans1, function()
            {
            	if (err) console.log("Error inserting : %s ",err );
            });
            var query3 = connection.query("INSERT INTO respuestas set ? ", ans2, function()
            {
            	if (err) console.log("Error inserting : %s ",err );
            });
            var query4 = connection.query("INSERT INTO respuestas set ? ", ans3, function()
            {
            	if (err) console.log("Error inserting : %s ",err );

            });
            var query5 = connection.query("INSERT INTO respuestas set ? ", ans4, function()
            {
            	if (err) console.log("Error inserting : %s ",err );

            	res.redirect('/valquestions');
            });
        });
    });
};

exports.delete_valquestion = function(req, res){
    var id = req.params.id;
    
    req.getConnection(function (err, connection) {
       
       connection.query("DELETE FROM tmp_preguntas  WHERE id_preguntatmp = ? ",[id], function(err, rows)
       {     
            if(err) console.log("Error deleting : %s ",err ); 
       });
       connection.query("DELETE FROM respuestas  WHERE id_pregunta = ? and activa=0",[id], function(err, rows)
       {     
    	   if(err) console.log("Error deleting : %s ",err ); 
    	   
    	   res.redirect('/valquestions');
       });
       
         
    });
};

exports.edit = function(req, res){
    
	var id = req.params.id;
	var id_categoria = "";
	var pregunta = "";
	    
	req.getConnection(function(err,connection){
	       
		connection.query('SELECT * FROM tmp_preguntas WHERE id_preguntatmp = ?',[id],function(err,rows)
		{
			if(err) console.log("Error Selecting : %s ",err );
			
			id_categoria = rows[0].id_categoria;
			pregunta = rows[0].pregunta;
			
			connection.query('SELECT posicion, respuesta, verdadera FROM respuestas WHERE id_pregunta = ? and activa=0 order by posicion',[id],function(err,rows)
			{
				if(err) console.log("Error Selecting : %s ",err );
				
				var finaldata = {
					id_categoria: id_categoria,
					id_pregunta	: id,
					pregunta	: pregunta,
					respuesta1	: rows[0].respuesta,
					respuesta2	: rows[1].respuesta,
					respuesta3	: rows[2].respuesta,
					respuesta4	: rows[3].respuesta,
					verdadera1	: rows[0].verdadera,
					verdadera2	: rows[1].verdadera,
					verdadera3	: rows[2].verdadera,
					verdadera4	: rows[3].verdadera
				};
				
				connection.query('SELECT * FROM categorias',[id],function(err,rows)
				{
					
					if(err) console.log("Error Selecting : %s ",err );
					
					console.log(rows);
				     
					res.render('edit_valquestions',{title:"Edit Questions",data:finaldata, categorias:rows}); 
				});
				
                  
			});                   
		});
	}); 
};

exports.save_edit = function(req,res){
    
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    var id = input.id_pregunta;
    var active = '0';
    var v1 = 0, v2 = 0, v3 = 0, v4 = 0;
    
	if(input.verdadera == 1) v1 = '1';
	if(input.verdadera == 2) v2 = '1';
	if(input.verdadera == 3) v3 = '1';
	if(input.verdadera == 4) v4 = '1';
	
	console.log(v1);
	console.log(v2);
	console.log(v3);
	console.log(v4);
    
    req.getConnection(function (err, connection) {
        
        var data = {    
            id_categoria : input.id_categoria,
            pregunta	 : input.pregunta
        };
        
        connection.query("UPDATE tmp_preguntas set ? WHERE id_preguntatmp = ? ",[data,id], function(err, rows)
        {
        	if (err) console.log("Error Updating : %s ",err );
        	

        	var ans1 = {
                	id_pregunta	: id,
                	posicion	: "1",
                	respuesta	: input.respuesta1,
                	verdadera	: v1,
                	activa		: active
            };
            var ans2 = {
                	id_pregunta	: id,
                	posicion	: "2",
                	respuesta	: input.respuesta2,
                	verdadera	: v2,
                	activa		: active
            };
            var ans3 = {
                	id_pregunta	: id,
                	posicion	: "3",
                    respuesta	: input.respuesta3,
                    verdadera	: v3,
                    activa		: active
            };
            var ans4 = {
                    id_pregunta : id,
                    posicion    : "4",
                    respuesta	: input.respuesta4,
                    verdadera	: v4,
                    activa      : active
            };
            
            var query2 = connection.query("UPDATE respuestas set ? WHERE id_pregunta = ? AND posicion=1 AND activa=0", [ans1,id], function()
            {
                if (err){
                    console.log("Error Updating : %s ",err );
                }
            });
            var query3 = connection.query("UPDATE respuestas set ? WHERE id_pregunta = ? AND posicion=2 AND activa=0", [ans2,id], function()
            {
                if (err){
                    console.log("Error Updating : %s ",err );
                }
            });
            var query4 = connection.query("UPDATE respuestas set ? WHERE id_pregunta = ? AND posicion=3 AND activa=0", [ans3,id], function()
            {
                if (err){
                    console.log("Error Updating : %s ",err );
                }
            });
            var query5 = connection.query("UPDATE respuestas set ? WHERE id_pregunta = ? AND posicion=4 AND activa=0", [ans4,id], function()
            {
                if (err){
                    console.log("Error Updating : %s ",err );
                }
                res.redirect('/valquestions');
            });
        });
    });
};

exports.validate = function(req, res){
	
	var id = req.params.id;
	var active = "1";
	var id_pregunta;
	var id_categoria;
	var pregunta;
	
	req.getConnection(function(err,connection){
		var query = connection.query('SELECT * FROM tmp_preguntas WHERE id_preguntatmp = ?',[id], function(err,rows){
			if(err){
				console.log("Error Selecting : %s", err);
			}
			console.log(rows);
			
			var data = {
				id_categoria : rows[0].id_categoria,
				pregunta     : rows[0].pregunta
			};
			
			var query1 = connection.query('INSERT INTO preguntas set ?',[data],function(err,rows){
				if (err){
					console.log("Error inserting : %s ",err );
				}
			});

				
			var query2 = connection.query('SELECT max(id_pregunta) as max_id FROM preguntas',function(err,rows){
					
				id_pregunta = rows[0].max_id;
				console.log(id_pregunta, id);
				
				var query3 = connection.query('UPDATE respuestas SET id_pregunta = ?, activa=1 WHERE id_pregunta = ? and activa=0',
						[id_pregunta, id],function(err,rows){
					if (err){
						console.log("Error Updating : %s", err);
					}
					var query4 = connection.query('DELETE FROM tmp_preguntas WHERE id_preguntatmp = ?',[id],function(err,rows){
						if(err){
							console.log("Error deleting : %s", err);
						}
						res.redirect('/valquestions');
					});
				});
			});
		});
	});
};