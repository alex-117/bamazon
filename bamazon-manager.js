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

// init run
connection.connect(function(err) {
    if (err) {
    console.error('error connecting: ' + err.stack);
    return;
    }

    console.log('connected as id ' + connection.threadId); 
    
    menuOptions();
});

// display user options
function menuOptions() {
    var menuOptions = [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "End Task"
    ];

    inquirer.prompt([
        {
            name: "options",
            message: "What would you like to do?",
            type: "checkbox",
            choices: menuOptions
        }
    ]).then(function(answer) {
        var answer = answer.options[0];
        if(answer === menuOptions[0]) {
           allInventory();
        } else if(answer === menuOptions[1]) {
            lowInventory();
        } else if(answer === menuOptions[2]) {
            addProduct();
        } else if(answer === menuOptions[4]) {
            endTask();
        }
    });
};


// returns list of products
function allInventory() {
	connection.query("SELECT * FROM products", function (err, res) {
		if (err) {throw err};
        
        console.log("Items for sale:");
        for(var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Quantity: " + res[i].stock_quantity + " | Price: $" + res[i].price);    
        }
        // create function to shorten this/make it more user friendly
        console.log("Is there anything else you would like to do?");
        menuOptions();
	});
};

function lowInventory() {
    connection.query("SELECT * FROM products", function(err, res){ 
        if(err) {throw err};
        
        for(var i = 0; i < res.length; i++) {
            if(res[i].stock_quantity < 5) {
                console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | Quantity: " + res[i].stock_quantity + " | Price: $" + res[i].price);  
            }
        }
        
        console.log("Is there anything else you would like to do?");
        menuOptions();
    });
};



//========================================
//========================================
//PROBLEMS
//========================================
//========================================
//========================================
function addProduct() {
    connection.query("SELECT * FROM products", function(err, res){ 
        if(err) {throw err};
        
        var choiceArr = [];
        
        for(var i = 0; i < res.length; i++) {
            var choice = res[i].product_name;
            choiceArr.push("" + choice);
        }
        
        inquirer.prompt([
            {
                name: "product",
                message: "Select product to add stock to:",
                type: "checkbox",
                choices: choiceArr
            }
        ]).then(function(answer) {
            var addStock = [];
            
            res.filter(function(productData) {
                if(productData.product_name === answer.product[0]) {
                    addStock.push(productData);
                }   
            });
            //res necessary?
            addProductStock(addStock);
        });
    });
};


function addProductStock(addStock) {
    console.log("INSIDE ADDPRODUCTSTOCK FUNCTION");
    console.log(addStock[0].stock_quantity);
        
    inquirer.prompt([
        {
            name: "add_stock",
            message: "There are " + addStock[0].stock_quantity + " items in stock. How many would you like to add?",
            type: "input"
        }
    ]).then(function(answer) {
        addStock[0].stock_quantity += parseInt(answer.add_stock[0]);
        var newStock = addStock[0].stock_quantity;
        console.log(addStock);
        
        var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: newStock
            },
            {
                product_name: addStock[0].product_name
            }
        ], function(err, res) {
            if(err) {throw err};
            console.log("UPDATED QUANTITY: ", newStock);
            
            console.log("Is there anything else you would like to do?");
            menuOptions();
        })
    });
};

//===================================
//===================================
//===================================
//===================================
//===================================


// end user task
function endTask() {
    console.log("Goodbye!");
    connection.end();
}
















