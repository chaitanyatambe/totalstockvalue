
const apiEndpoint = 'https://crudcrud.com/api/fc1a328107664d08986b9f378580aa73/expencetracker';

let products = [];
let totalAmount = 0;

function addProduct() {
    const productName = document.getElementById('productName').value;
    const sellingPrice = parseFloat(document.getElementById('sellingPrice').value);

    if (!productName || isNaN(sellingPrice)) {
        alert('Please enter valid product information');
        return;
    }

    // Add product to the local array
    products.push({ productName, sellingPrice });

    // Update the UI
    displayProducts();
    updateTotalAmount();

    // Send data to the server using Axios
    axios.post(apiEndpoint, { productName, sellingPrice })
        .then(response => {
            console.log('Data sent to the server:', response.data);
        })
        .catch(error => {
            console.error('Error sending data to the server:', error);
        });
}

function displayProducts() {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    products.forEach(product => {
        outputDiv.innerHTML += `<div>${product.productName} - Rs ${product.sellingPrice.toFixed(2)} <button onclick="deleteProduct('${product.productName}', ${product.sellingPrice})">Delete</button></div>`;
    });
}

function deleteProduct(productName, sellingPrice) {
    // Delete the product from the local array
    products = products.filter(product => product.productName !== productName || product.sellingPrice !== sellingPrice);

    // Update the UI
    displayProducts();
    updateTotalAmount();

    // Send a request to the server to delete the product
    axios.delete(apiEndpoint + `/${productName}`)
        .then(response => {
            console.log('Product deleted from the server:', response.data);
        })
        .catch(error => {
            console.error('Error deleting product from the server:', error);
        });
}

function updateTotalAmount() {
    totalAmount = products.reduce((total, product) => total + product.sellingPrice, 0);
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2);
}