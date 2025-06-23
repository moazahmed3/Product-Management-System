var productsArr = [];
var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescInput = document.getElementById("productDescInput");
var tBody = document.getElementById("tBody");
var addUpdateProduct = document.getElementById("addUpdateProduct");
var indexUpdate = -1;
// rex expression
var productNameRexExp = /^[A-Z][A-Za-z0-9 ]{2,30}/;
var productPriceRexExp = /^(?:[1-9][0-9]{1,5}|1000000)$/;
var productCategoryRexExp = /^[A-Z][A-Za-z0-9 ]{1,30}/;
var productDescRexExp = /^[A-Z][\w\s.-]{3,300}/;

if (localStorage.getItem("products") != null) {
  productsArr = JSON.parse(localStorage.getItem("products"));
  displayProducts();
}

function isValidInput(name, price, category, desc) {
  if (!productNameRexExp.test(name)) {
    document.getElementById("productNameAlert").classList.remove("d-none");
  } else {
    document.getElementById("productNameAlert").classList.add("d-none");
  }

  if (!productPriceRexExp.test(price)) {
    document.getElementById("productPriceAlert").classList.remove("d-none");
  } else {
    document.getElementById("productPriceAlert").classList.add("d-none");
  }

  if (!productCategoryRexExp.test(category)) {
    document.getElementById("productCategoryAlert").classList.remove("d-none");
  } else {
    document.getElementById("productCategoryAlert").classList.add("d-none");
  }

  if (!productDescRexExp.test(desc)) {
    document.getElementById("productDescAlert").classList.remove("d-none");
  } else {
    document.getElementById("productDescAlert").classList.add("d-none");
  }

  return (
    productNameRexExp.test(name) &&
    productPriceRexExp.test(price) &&
    productCategoryRexExp.test(category) &&
    productDescRexExp.test(desc)
  );
}

function addProduct() {
  if (
    isValidInput(
      productNameInput.value,
      productPriceInput.value,
      productCategoryInput.value,
      productDescInput.value
    )
  ) {
    var product = {
      name: productNameInput.value,
      price: productPriceInput.value,
      category: productCategoryInput.value,
      desorption: productDescInput.value,
    };
    if (indexUpdate != -1) {
      // productsArr[indexUpdate] = product;
      productsArr.splice(indexUpdate, 1, product);
      addUpdateProduct.innerHTML = "Add Product";
    } else {
      productsArr.push(product);
    }
    localStorage.setItem("products", JSON.stringify(productsArr));
    displayProducts();
    clearInputs();
  }
}

function displayProducts() {
  var cartonaa = "";

  for (var i = 0; i < productsArr.length; i++) {
    cartonaa += `          <tr>
            <td>${i}</td>
            <td>${productsArr[i].name}</td>
            <td>${productsArr[i].price}</td>
            <td>${productsArr[i].category}</td>
            <td>${productsArr[i].desorption}</td>
            <td>
              <button class="btn btn-outline-warning" onclick="fillInputOFDate(${i})" >Update</button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="openDialog(${i})" >Delete</button>
            </td>
          </tr>
        `;
  }
  tBody.innerHTML = cartonaa;
}

function deleteProduct(indexProduct) {
  productsArr.splice(indexProduct, 1);
  localStorage.setItem("products", JSON.stringify(productsArr));
  displayProducts();
}

function fillInputOFDate(indexProduct) {
  indexUpdate = indexProduct;
  productNameInput.value = productsArr[indexProduct].name;
  productPriceInput.value = productsArr[indexProduct].price;
  productCategoryInput.value = productsArr[indexProduct].category;
  productDescInput.value = productsArr[indexProduct].desorption;
  addUpdateProduct.innerHTML = "Update Product";
}
function clearInputs() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescInput.value = "";
}

function search() {
  var searchItem = document.getElementById("searchInput").value;
  var cartonaa = "";
  for (var i = 0; i < productsArr.length; i++) {
    if (productsArr[i].name.toLowerCase().includes(searchItem.toLowerCase())) {
      cartonaa += `          <tr>
            <td>${i}</td>
            <td>${productsArr[i].name}</td>
            <td>${productsArr[i].price}</td>
            <td>${productsArr[i].category}</td>
            <td>${productsArr[i].desorption}</td>
            <td>
              <button class="btn btn-outline-warning" onclick="fillInputOFDate(${i})" >Update</button>
            </td>
            <td>
              <button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button>
            </td>
          </tr>
        `;
    }
  }
  tBody.innerHTML = cartonaa;
}

function openDialog(indexProduct) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-1",
      cancelButton: "btn btn-danger mx-1",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        deleteProduct(indexProduct);
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your Product has been deleted.",
          icon: "success",
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary Proudest is safe not deleted :)",
          icon: "error",
        });
      }
    });
}

//!     =======================   ممكن ندمج  search display =================
// function displayProducts() {
//   var searchItem = document.getElementById("searchInput").value;

//   var cartonaa = "";
//   for (var i = 0; i < productsArr.length; i++) {
//     if (productsArr[i].name.toLowerCase().includes(searchItem.toLowerCase())) {
//       cartonaa += `          <tr>
//             <td>${i}</td>
//             <td>${productsArr[i].name}</td>
//             <td>${productsArr[i].price}</td>
//             <td>${productsArr[i].category}</td>
//             <td>${productsArr[i].desorption}</td>
//             <td>
//               <button class="btn btn-outline-warning" onclick="fillInputOFDate(${i})" >Update</button>
//             </td>
//             <td>
//               <button class="btn btn-outline-danger" onclick="deleteProduct(${i})" >Delete</button>
//             </td>
//           </tr>
//         `;
//     }
//   }
//   tBody.innerHTML = cartonaa;
// }

// dark mood
var btnMood = document.getElementById("togle-mood");
var body = document.getElementById("body");
var table = document.getElementById("table");
var mood = false; // default to light

// ⬇️ Apply saved mode when page loads
window.onload = function () {
  let bgBody = localStorage.getItem("bgBody") || "bg-light";
  let bgTable = localStorage.getItem("bgTable") || "table-light";
  let textColor = localStorage.getItem("textColor") || "text-dark";

  body.classList.add(bgBody);
  table.classList.add(bgTable);

  document.querySelectorAll(".text-dark, .text-light").forEach((el) => {
    el.classList.remove("text-dark", "text-light");
    el.classList.add(textColor);
  });

  // set correct icon
  if (bgBody === "bg-dark") {
    btnMood.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
    mood = true;
  } else {
    btnMood.innerHTML = `<i class="bi bi-moon-fill"></i>`;
    mood = false;
  }
};

function changeMood() {
  mood = !mood;

  if (mood) {
    //  Dark Mode
    btnMood.innerHTML = `<i class="bi bi-brightness-high-fill"></i>`;
    body.classList.replace("bg-light", "bg-dark");
    table.classList.replace("table-light", "table-dark");

    document.querySelectorAll(".text-dark").forEach((el) => {
      el.classList.replace("text-dark", "text-light");
    });

    localStorage.setItem("bgBody", "bg-dark");
    localStorage.setItem("bgTable", "table-dark");
    localStorage.setItem("textColor", "text-light");
  } else {
    //  Light Mode
    btnMood.innerHTML = `<i class="bi bi-moon-fill"></i>`;
    body.classList.replace("bg-dark", "bg-light");
    table.classList.replace("table-dark", "table-light");

    document.querySelectorAll(".text-light").forEach((el) => {
      el.classList.replace("text-light", "text-dark");
    });

    localStorage.setItem("bgBody", "bg-light");
    localStorage.setItem("bgTable", "table-light");
    localStorage.setItem("textColor", "text-dark");
  }
}
