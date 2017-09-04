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
        var choice = res[i].item_id - 1;
        choiceArr.push("" + choice);
    }
//    console.log("CHOICEARR: ", choiceArr);
    inquirer.prompt([
        {
            name: "ID",
            message: "Select the product you wish to purchase:",
            type: "checkbox",
            choices: choiceArr
        }
    ]).then(function(answer) {
        for(var i = 0; i < answer.ID.length; i++) {
//            console.log(answer);
            var customerChoice = res[answer.ID[i]];
            console.log(customerChoice);    
        }
        
        selectQuanity(customerChoice);
    });
};

function selectQuanity(res_db) {
    var quantityMessage = "There are currently " + res_db.stock_quantity + " " + res_db.product_name + "(s) available. How many would you like?"
    inquirer.prompt([
        {
            name: "quantity",
            message: quantityMessage   
        }   
    ]).then(function(answer) {
        if(answer.quantity <= res_db.stock_quantity) {
            
            var updatedQuantity = res_db.stock_quantity - answer.quantity;
            console.log("QUANTITY: ", updatedQuantity);
            
            var totalPrice = res_db.price * answer.quantity;
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                    {
                        stock_quantity: updatedQuantity
                    },
                    {
                        item_id: res_db.item_id
                    }
                ],
                function (err, res) {
                    if(err) {throw err};
                    console.log("Updated sql r", res);
                    console.log("TOTAL PRICE: $", totalPrice);
                    updatedTable();
                }
            );
        } else {
            console.log("Insufficient Quantity!");
            selectQuanity(res_db);
        }
    });
};

function updatedTable() {
    connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
        
        console.log("UPDATED TABLE \n" + "Items for sale:");
        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price + " | " + res[i].stock_quantity);    
        }
        
        connection.end();
    })
};
