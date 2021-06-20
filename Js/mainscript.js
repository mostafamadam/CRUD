var products = [];
var productName = document.getElementById("productName");
var productCategory = document.getElementById("productCategory");
var productPrice = document.getElementById("productPrice");
var productDescription = document.getElementById("productDescription");
var addProduct = document.getElementById("addProductBTN");
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("searchInput");
if (JSON.parse(localStorage.getItem("Products"))) {
    products = JSON.parse(localStorage.getItem("Products"));
    displayProducts();
}

addProduct.onclick = function() {
    if (
        productName.value != "" &&
        productCategory.value != "" &&
        productPrice.value != "" &&
        productDescription.value != ""
    ) {
        add();
        displayProducts();
        resetInputs();
    }
};

function add() {
    var product = {
        productName: productName.value,
        productCategory: productCategory.value,
        productPrice: productPrice.value,
        productDescription: productDescription.value,
    };
    products.push(product);
    localStorage.setItem("Products", JSON.stringify(products));
}

function displayProducts() {
    var tableBody = "";
    for (let i = 0; i < products.length; i++) {
        tableBody += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].productName}</td>
        <td>${products[i].productCategory}</td>
        <td>${products[i].productPrice}</td>
        <td>${products[i].productDescription}</td>
        <td><button onclick=(editProduct(${i})) class="btn btn-primary">update</button></td>
        <td><button onclick=(deleteProduct(${i})) class="btn btn-danger">delete</button></td>
        </tr>
        `;
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}

function resetInputs() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }
}

function deleteProduct(index) {
    products.splice(index, 1);
    displayProducts();
    localStorage.setItem("Products", JSON.stringify(products));
}

searchInput.onkeyup = function() {
    var tableBody = "";
    for (let i = 0; i < products.length; i++) {
        if (products[i].productName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            tableBody += `
        <tr>
        <td>${i + 1}</td>
        <td>${products[i].productName}</td>
        <td>${products[i].productCategory}</td>
        <td>${products[i].productPrice}</td>
        <td>${products[i].productDescription}</td>
        <td><button onclick=(editProduct(${i})) class="btn btn-primary">update</button></td>
        <td><button onclick=(deleteProduct(${i})) class="btn btn-danger">delete</button></td>
        </tr>
        `;
        }
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}

function editProduct(index) {
    var tableBody = "";
    searchInput.value = products[index].productName;
    for (let i = 0; i < products.length; i++) {
        if (i == index) {
            tableBody += `
        <tr>
        <td>${i + 1}</td>
        <td><input id="editName" class="form-control" value="${products[i].productName}"></td>
        <td><input id="editCategory" class="form-control" value="${
          products[i].productCategory
        }"></td>
        <td><input id="editPrice" class="form-control" value="${
          products[i].productPrice
        }"></td>
        <td><input id="editDescription" class="form-control" value="${
          products[i].productDescription
        }"></td>
        <td><button onclick=(updateProduct(${index})) class="btn btn-primary">update</button></td>
        <td><button onclick=(deleteProduct(${index})) class="btn btn-danger">delete</button></td>
        </tr>
        `;
        }
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}

function updateProduct(index) {
    products[index].productName = document.getElementById("editName").value;
    products[index].productCategory = document.getElementById("editCategory").value;
    products[index].productPrice = document.getElementById("editPrice").value;
    products[index].productDescription = document.getElementById("editDescription").value;
    displayProducts();
    localStorage.setItem("Products", JSON.stringify(products));
    searchInput.value = "";
}