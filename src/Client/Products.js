function searchProducts() {
  document.getElementById("load").style.display = "block";
  document.getElementById("resultAutomatic").innerHTML = "";
  document.getElementById("ingredients").innerHTML = "";
  const options = {
    method: "GET",
    headers: {},
  };
  let productname = document.getElementById("productName").value;
  let result = fetch(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=4630",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.result.records;
      console.log(data);
      return data;
    })
    .then((data) => {
      data = data.filter((product) => {
        return product.shmmitzrach.includes(productname);
      });
      return data;
    })
    .then((data) => {
      if (data.length == 0) {
        alert("There is no such product");
        document.getElementById("load").style.display = "none";
      } else {
        document.getElementById("load").style.display = "none";
        console.log(data);

        data.forEach((d) => {
          document.getElementById("ingredients").innerHTML +=
            `<h1>${d.shmmitzrach}</h1>` +
            `<h3>total fat:${d.total_fat}</h3>` +
            `<h3>total sugars :${d.total_sugars}</h3>` +
            `<h3> carbohydrates :${d.carbohydrates}</h3>` +
            `<h3> food energy :${d.food_energy}</h3>` +
            `<h3>poly unsaturated fat :${d.poly_unsaturated_fat}</h3>`;
        });
        document.getElementById("buttonProduct-clear").style.display = "inline";
      }
    })
    .catch((err) => console.log(err));
}

function clearProducts() {
  document.getElementById("ingredients").innerHTML = "";
}
if (true) {
  let arrProductsName = [];
}
function CreateArrayOfAllProductsName() {
  i = 0;
  index = 0;
  debugger;

  const options = {
    method: "GET",
    headers: {},
  };

  let result = fetch(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=4630",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.result.records;
      console.log(data);
      return data;
    })
    .then((data) => {
      data.forEach((d) => {
        arrProductsName.push(d.shmmitzrach);
      });
      debugger;
      console.log(arrProductsName.length);
      debugger;
      localStorage.setItem("arrProductsName", JSON.stringify(arrProductsName));
      document.getElementById("buttonEdit").style.display = "block";
    });
}
async function AutomaticSearchResults() {
  debugger;
  let arrProductsName = [];
  arrProductsName = JSON.parse(localStorage.getItem("arrProductsName"));

  document.getElementById("resultAutomatic").innerHTML = "";
  const inputValue = document.getElementById("productName").value;
  console.log(arrProductsName.length);
  debugger;

  for (i = 0; i < 500; i++) {
    debugger;
    if (arrProductsName[i].includes(inputValue) == true) {
      document.getElementById("resultAutomatic").innerHTML +=
        `<button class="automaticInput" id="b${i}" onclick="valueToInput(this.id)">${arrProductsName[i]}</button>` +
        `<br></br>`;
    }
  }
}

function valueToInput(val) {
  debugger;
  console.log(val);
  debugger;
  document.getElementById("productName").value = "";
  debugger;
  v = document.getElementById(val).innerText;
  document.getElementById("productName").value = v;
  document.getElementById("resultAutomatic").innerHTML = "";
}
function clearProducts() {
  document.getElementById("ingredients").innerHTML = "";
  document.getElementById("buttonProduct-clear").style.display = "none";
}
let arrProductsName = [];
function CreateArrayOfAllProductsName() {
  i = 0;
  index = 0;
  debugger;

  const options = {
    method: "GET",
    headers: {},
  };

  let result = fetch(
    "https://data.gov.il/api/3/action/datastore_search?resource_id=c3cb0630-0650-46c1-a068-82d575c094b2&limit=4630",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      const data = response.result.records;
      console.log(data);
      return data;
    })
    .then((data) => {
      data.forEach((d) => {
  
        arrProductsName=[...arrProductsName,d.shmmitzrach]
      });
      debugger;
      console.log(arrProductsName.length);
      debugger;
      localStorage.setItem("arrProductsName", JSON.stringify(arrProductsName));
      document.getElementById("buttonEdit").style.display = "inline";
    });
}
async function AutomaticSearchResults() {
  arrProductsName = [];
  debugger;
  arrProductsName = JSON.parse(localStorage.getItem("arrProductsName"));

  document.getElementById("ingredients").innerHTML = "";
  document.getElementById("resultAutomatic").innerHTML = "";
  const inputValue = document.getElementById("productName").value;

  console.log(arrProductsName.length);

  debugger;
  let terms = autoComplete(inputValue);
  debugger
  let list = '';
  for (i=0; i<terms.length; i++) {
    list+=`<button class="automaticInput" id="b${i}" onclick="valueToInput(this.id)"> ${terms[i]} </button>`+`<br>`
    
  }
  resultAutomatic.innerHTML = `<ul> ${list} </ul>`;


}

function autoComplete(inputValue) {
  if (inputValue === '') {
    return [];
  }
  let reg = new RegExp(inputValue)
  return arrProductsName.filter(function(term) {
    if (term.match(reg)) {
      return term;
    }
  });
}



function valueToInput(val) {
  debugger;
  console.log(val);
  debugger;
  document.getElementById("productName").value = "";
  debugger;
  v = document.getElementById(val).innerText;
  document.getElementById("productName").value = v;
  document.getElementById("resultAutomatic").innerHTML = "";
}
function clearProducts() {
  document.getElementById("ingredients").innerHTML = "";
  document.getElementById("buttonProduct-clear").style.display = "none";
}
