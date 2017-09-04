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
    
    menuOptions();
});

function menuOptions() {
    var menuOptions = [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
    ];
    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to do?",
            type: "checkbox",
            choices: menuOptions
        }
    ]).then(function(answer) {
        if(answer.options[0] === menuOptions[0]) {
            selectAll();
        }
        console.log(answer.options[0]);
    });
};





// returns list of products
function selectAll() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) throw err;
        
        console.log("Items for sale:");
        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Price: $" + res[i].price);    
        }
	});
};
