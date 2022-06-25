//All logic goes here
const mysql =require('mysql');


// connection pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host           : process.env.DB_HOST,
    user           : process.env.DB_USER,
    password       : process.env.DB_PASS,
    database       : process.env.DB_NAME
})

// exports.login = (req, res)=>{
//     pool.getConnection((err, connection)=>{
//         if(err) throw err;
//         console.log('In login Connected as ID' + connection.threadId);
//         userId = req.body.userid;
//         userPwd = req.body.userpwd;
//         connection.query('select * from loginSignup where username =? and password=?',['%' + userId + '%', '%' + userpwd + '%'],(req, res)=>{
//             connection.release();
//             if(!err){
//                 res.render('home')
//             }
//         })
//     })
// }

exports.view = (req, res)=>{
    //connection to DB
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        connection.query('select * from user',(err, rows)=>{
            //when done with the connection , realease it
            connection.release();
            if(!err){
                res.render('home',{rows})
            }else{
                console.log(err);
            }
            console.log("the data from user table: \n", rows);
        })
    })
    //res.render('home');
} 

//Find userby search
exports.find = (req, res)=>{

    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);

        let searchTerm = req.body.search;

        connection.query('select * from user where first_name LIKE ? OR last_name LIKE ?',['%'+searchTerm+'%','%'+searchTerm+'%'],(err, rows)=>{
            //when done with the connection , realease it
            connection.release();
            if(!err){
                res.render('home',{rows})
            }else{
                console.log(err);
            }
            console.log("the data from user table: \n", rows);
        })
    })

}

//add new user
exports.form= (req, res)=>{
    console.log(" user controller form export =================================");
    res.render('add-user');
}

//create new user
exports.create = (req, res)=>{
const {first_name, last_name, email, phone, comments, status } = req.body;

pool.getConnection((err, connection)=>{
    console.log("Helllooooo there....")
    if(err) throw err;
    console.log('Connected as ID ' + connection.threadId);

    //let searchTerm = req.body.search;

    connection.query('insert into user set first_name=?, last_name=?, email=?, phone=?, comments=?, status=?',[first_name,last_name,email,phone,comments,status],(err, rows)=>{
        //when done with the connection , realease it
        connection.release();
        if(!err){
            res.render('add-user',{alert:'user added successfully'});
        }else{
            console.log(err);
        }
        console.log("the data from user table: \n", rows);
    })
})
    
}

//user edit page
exports.edit = (req, res)=>{
    // res.render("edit-user");
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        connection.query('select * from user where id=?',[req.params.id],(err, rows)=>{
            //when done with the connection , realease it
            connection.release();
            if(!err){
                res.render('edit-user',{rows})
            }else{  
                console.log(err);
            }
            console.log("the data from user table: \n", rows);
        })
    })
}

//user update page
exports.update = (req, res)=>{
    // res.render("edit-user");
    const {first_name, last_name, email, phone, comments, status } = req.body;
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        connection.query('update user set first_name=?, last_name=?, email=?, phone=?,comments=?, status=? where id=?',[first_name, last_name,email,phone,comments,status,req.params.id],(err, rows)=>{
            //when done with the connection , realease it
            connection.release();
            if(!err){
                pool.getConnection((err, connection)=>{
                    if(err) throw err;
                    console.log('Connected as ID ' + connection.threadId);
                    connection.query('select * from user where id=?',[req.params.id],(err, rows)=>{
                        //when done with the connection , realease it
                        connection.release();
                        if(!err){
                            res.render('edit-user',{rows, alert:`${first_name} has been updated.`});
                        }else{  
                            console.log(err);
                        }
                        console.log("the data from user table: \n", rows);
                    })
                })
            }else{  
                console.log(err);
            }
            console.log("the data from user table: \n", rows);
        })
    })
}

//user delete and redirect to home page
exports.delete = (req, res)=>{
    // res.render("edit-user");
    pool.getConnection((err, connection)=>{
        if(err) throw err;
        console.log('Connected as ID ' + connection.threadId);
        connection.query('delete from user where id=?',[req.params.id],(err, rows)=>{
            //when done with the connection , realease it
            connection.release();
            if(!err){
                console.log("delete route in the if block")
                res.redirect("/");
            }else{  
                console.log("err on delete route" + err);
            }
            console.log("the data from user table: \n", rows);
        })
    })
}