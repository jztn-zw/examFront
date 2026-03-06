const content = document.querySelector("#content");
const submit = document.querySelector("#add");

//POST API
  submit.addEventListener("click", () => {
    let productname = document.querySelector("#pname").value;
    let category = document.querySelector("#cat").value;
    let stockCount = document.querySelector("#scount").value;
    let locationCode = document.querySelector("#lcd").value;
    
    if(!productname || !category || !stockCount){
      alert("Please fill all required fields!")
      return;
    }
    let formData = { productname, category, stockCount, locationCode };

    fetch("https://exambackend-6fzc.onrender.com/api/product", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((error) => {
      console.log(error);
    });
    alert("Product Added Successfully");
    location.reload();
  });


window.addEventListener("load", () => {
  getUsers()
});

function getUsers() {
  let html = "";
  //FETCH API
  fetch("https://exambackend-6fzc.onrender.com/api/product", { mode: "cors" })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        html += `
    <li> 
        <span class="item-name">${element.productName}</span>
        <div class="stats-grid">
            <div>
                <span class="stat-label">Category</span>
                <span class="stat-val">${element.category}</span>
            </div>
            <div>
                <span class="stat-label">Stock Count</span>
                <span class="stat-val">${element.stockCount}</span>
            </div>
        </div>
        <div class="supplier-footer">
            <span class="stat-label">Location Code</span>
            ${element.locationCode}
        </div>
        <div class="supplier-footer">
            <span class="stat-label">Last Update</span>
            ${element.lastUpdated}
        </div>

    </li>`;
      });
      content.innerHTML = html;
    })
    .catch((error) => {
      console.log(error);
    });
}

