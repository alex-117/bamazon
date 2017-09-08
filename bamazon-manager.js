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
            type: "list",
            choices: menuOptions
        }
    ]).then(function(answer) { 
        var answer = answer.options;
        if(answer === menuOptions[0]) {
            console.log("TRUE");
           allInventory();
        } else if(answer === menuOptions[1]) {
            lowInventory();
        } else if(answer === menuOptions[2]) {
            addToProduct();
        } else if(answer === menuOptions[3]) {
            addNewProduct();
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

function addToProduct() {
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
                type: "list",
                choices: choiceArr
            }
        ]).then(function(answer) {
            var addStock = [];
            
            res.filter(function(productData) {
                if(productData.product_name === answer.product) {
                    addStock.push(productData);
                }   
            });

            addProductStock(addStock);
        });
    });
};


function addProductStock(addStock) {
    inquirer.prompt([
        {
            name: "add_stock",
            message: "There are " + addStock[0].stock_quantity + " items in stock. How many would you like to add?",
            type: "input"
        }
    ]).then(function(answer) {
        addStock[0].stock_quantity += parseInt(answer.add_stock);
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

function addNewProduct() {
        
    inquirer.prompt([
        {
            name: "new_product_name",
            message: "What product would you like to add?",
            type: "input"
        }, 
        {
            name: "new_product_department",
            message: "What department does this product belong to?",
            type: "input"
        },
        {
            name: "new_product_price",
            message: "Enter price of product:",
            type: "input"
        },
        {
            name: "new_product_quantity",
            message: "Enter quantity of product:",
            type: "input"
        }
    ]).then(function(answer) {
        var test = answer.new_product_name;

        var query = connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answer.new_product_name + "','" + answer.new_product_department + "','" + answer.new_product_price + "','" + answer.new_product_quantity +"')", function(err, res){ 
            if(err) {throw err};

        });
        allInventory();
    });
}



// end user task
function endTask() {
    console.log("Goodbye!");
    connection.end();
}
















