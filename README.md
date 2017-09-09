# bamazon

Bamazon is a small, simple 'shopping cart' type application (think Amazon or Ebay) where you can retrieve and add data (such as store items) to a database. It is a node.js application that uses the 'mysql' and 'inquirer' npm packages to give it the functionality that it has (i.e. accessing the database information or prompting the user with questions.)



Bamazon-Customer:

When ran, this bamazon-customer.js file will create circumstances where the user is treated as if they were a 'customer' looking to make a purchase.

- Upon running, the user will have a table displayed to them that contains all of the information regarding the items that the 'store' contains.
![image]
(/images/customer-purchase.png?raw=true)
- The user is then allowed to select a single product (NOTE: this application will only allow for users to select one product at a time. It is not built for multi-item processing) from the table to begin the 'purchase'.
- After the user selects the product, they are prompted with a question that states how much of the product they have in stock and asks how many they would like to purchase.
- Once the user inputs a quantity, the program will check to see if they have enough of the product in stock to meet the customer demands (this handles errors if user accidentally enters a quantity too large.)
  - If the 'store' does have enough of the product, the program will total cost of the purchase, display it to the customer and then display an updated table of all the products, showing their new quantities. The program will then exit.
  - If the 'store' does not have enouugh product, a message will appear saying "Insufficient Quantity" and will automatically exit the program.


Bamazon-Manager:

The bamazon-manager.js file will treat the user as if they were a manager at the store, giving them extra options and the ability to manipulate some items (data) in the database. 

- Upon running, the user will be prompted with a question and a list of options to choose from. These options consist of viewing the entire inventory, viewing only low inventory, adding stock to a current product or even adding an entirely new product. Also, the user has the abliity to exit the program if they didn't mean to access it.
  - If "View Products For Sale" is ran, the program will display all of the inventory in the store. This is similar to the bamazon-customer functionality, however now the program will repeat the initial prompt asking the user if they would like to do perform another task.
  - If "View Low Inventory" is selected, the program will return to the user any of the items that have an inventory stock of less than 5. The user will then be prompted for additional tasks.
  - If "Add to Inventory" is selected, the user will be given a list of current items in the store. They will be allowed to choose a single item (NOTE: Again this isn't built to handle more than 1 item at a time) of which they would like to add stock to.
    - Once an item is selected, the program will inform the user of how many items are in stock for that product and ask how much stock they would like to add.
    - After a quantity is passed into the program, the application will return raw data of the product which will show updated information for it.
    - The user can then select to perform another task within the program.
- If "Add New Product" is selected, the user will be prompted with a series of questions that the program will use to generate information about a new product.
    - Afterwards the program will display a table consisting of all the inventory in the store (including the newly added product). The user will then be asked to perform anymore tasks.
- If "End Task" is selected, the program will display a message saying "Goodbye" and will end the program.




