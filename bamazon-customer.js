// npm packages
var mysql = require('mysql');
var inquirer = require('inquirer');
// sql connection
var connection = mysql.createConnection({
    host: 'localHost',
    port: 3306,
    user: 'root',
    database: 'bamazon_db'

});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId); 
    selectAll();
});

function selectAll() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
        
        console.log("Items for sale:");
        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price);    
        }
       
        selectProduct(res);
	});
};

function selectProduct(res) {
    var choiceArr = [];
    for(var i = 0; i < res.length; i++) {
        choiceArr.push("" + res[i].item_id);
    }
    
//    console.log(choiceArr);
    
//    NOTE THE CHOICEARR DOESN'T INCLUDE INDEX 0
    
    inquirer.prompt([
        {
            name: "ID",
            message: "Select the product you wish to purchase:",
            type: "checkbox",
            choices: choiceArr
        }
    ]).then(function(answer) {
//        console.log("ANSWER: ", answer);
//        console.log("ANSWER ID: ", answer.ID[0]);
//        console.log("LENGTH: ", answer.ID.length);
//        console.log("RES ID: ", res[answer.ID]);
//        console.log("RES: ", res)
        for(var i = 0; i < answer.ID.length; i++) {
//            console.log(answer);
            var customerChoice = res[answer.ID];
            console.log(res[answer.ID]);    
        }
        
        selectQuanity(res[answer.ID]);
    });
};

function selectQuanity(res) {
//    console.log("SQ FUNC: ", res);
    var quantityMessage = "There are currently " + res.stock_quantity + " " + res.product_name + "(s) available. How many would you like?"
    inquirer.prompt([
        {
            name: "quantity",
            message: quantityMessage   
        }   
    ]).then(function(answer) {
        if(answer.quantity <= res.stock_quantity) {
            console.log("there are enough of this product");
        } else {
            console.log("There are not enough in stock!");
            selectQuanity(res);
        }
    });
};





//connection.end();








