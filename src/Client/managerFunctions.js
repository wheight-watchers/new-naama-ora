let start = 0;
const configUrl = "http://localhost:3000/users";
function getParams() {
  debugger;
  const params = new URLSearchParams(window.location.search);
  const id = params.get("userId");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", configUrl);
  xhr.send();
  xhr.onload = () => {
    let users = JSON.parse(xhr.responseText);
    CurrentUser = users.find((u) => u.id == id);
    document.getElementById(
      "userDetails"
    ).innerHTML += `<h1>${CurrentUser.firstName} details</h1>`;
    document.getElementById(
      "userDetails"
    ).innerHTML += `<h4>firstName: ${CurrentUser.firstName}</h4> 
      <h4>lastName: ${CurrentUser.lastName}</h4>
      <h4>email: ${CurrentUser.email}</h4>
    <h4>address : 
      ${CurrentUser.address.street}
      ${CurrentUser.address.building},
      ${CurrentUser.address.city}
      </h4>
      <h4>age: ${CurrentUser.age}</h4> 
      <h4>height: ${CurrentUser.height}</h4>
      <h4>start Weight: ${CurrentUser.Weights.startWeight}</h4> 
    <h3>meetings:</h3>`;
    const meet = CurrentUser.Weights.meetings;
    let table = `<table>
    <tr>
    <th>Date  </th>
    <th>Weight  </th>
    </tr></br>`;
    table.id = "userMeetingsTable";
    meet.forEach((m) => {
      table += `<tr>
         <td>${m.date + "   "}</td>
        <td>${m.weight}</td>
        </tr></br>`;
    });
    table += `</table>`;
    document.getElementById("userDetails").innerHTML += table;
  };
}
function getUsersForManager() {
  if (start == 0) {
    debugger;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", configUrl);
    xhr.send();
    xhr.onload = () => {
      if (xhr.status != 200) {
        alert(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        debugger;
        let jsonusers = JSON.parse(xhr.responseText);
        let userMeetings = jsonusers[0].Weights.meetings;
        numOfmeetings = Object.keys(userMeetings).length;
        console.log(jsonusers);
        let cities = [];
        let ind = 0;
        jsonusers.forEach((u, i) => {
          debugger;
          let CITY = JSON.stringify(u.address.city).replace(/"/g, "");
          // alert(`${i} -> ${CITY}`);
          let found = cities.indexOf(CITY) > -1;
          if (!found) {
            cities[ind] = CITY;
            ind += 1;
          }
        });
        const city = document.getElementById("citySelect");
        const street = document.getElementById("streetSelect");
        let index = 1;
        city.options[0] = new Option("city", 0);
        street.options[0] = new Option("street", 0);
        cities.forEach((c, i) => {
          debugger;
          // alert(`${i} -> ${c}`);
          city.options[i + 1] = new Option(c, i + 1);
          jsonusers.forEach((j, ind) => {
            debugger;
            if (j.address.city == c) {
              debugger;
              let STREET = JSON.stringify(j.address.street).replace(/"/g, "");
              street.options[index] = new Option(STREET, index);
              index += 1;
            }
          });
        });
        start += 1;
        document.getElementById("allUsers").innerHTML = "";
        // document
        //   .getElementById("allUsers")
        //   .append(
        showUsers(jsonusers, numOfmeetings);
        // );
      }
    };
  }
}
function showUsers(jsonusers, numOfmeetings) {
  debugger;
  // let container = document.createElement("div");
  // container.id="container"
  let i = 0;
  let bmi;
  if (jsonusers == [])
    document.getElementById(
      "allUsers"
    ).innerHTML += `<p>no suitable users found</p>`;
  jsonusers?.forEach((user) => {
    debugger;
    bmi = user.Weights.meetings[numOfmeetings - 1].weight / user.height ** 2;
    lastBmi =
      user.Weights.meetings[numOfmeetings - 2].weight / user.height ** 2;
    let containerUser = document.createElement("div");
    // containerUser.id="containerUser";
    containerUser.innerHTML = "";
    const para = document.createElement("p");
    const buttons = document.createElement("button");
    const txt = document.createElement("txt");
    txt.id = "textForUser";
    buttons.innerText = "details";
    buttons.id = "b" + i;
    buttons.className = "btn btn-outline-info";

    i = i + 1;
    if (bmi < lastBmi) para.style.color = "green";
    else para.style.color = "red";
    txt.innerHTML = `<h3>${user.firstName + " " + user.lastName}</h3>`;
    // container.append(`${user.firstName + " " + user.lastName}`);
    para.innerHTML = "CURRENT BMI : " + bmi;
    containerUser.appendChild(txt);
    containerUser.appendChild(para);
    // document.getElementById("allUsers").innerHTML += "START BMI : " + (user.Weights.startWeight / (user.height * user.height)) + `</br>`
    containerUser.appendChild(buttons);
    let allUsers = document.getElementById("allUsers");
    allUsers.appendChild(containerUser);
  });
  i = 0;
  jsonusers?.forEach((user) => {
    debugger;
    let elem = document.getElementById("b" + i);
    i = i + 1;
    elem.addEventListener(
      "click",
      function () {
        debugger;
        directMyDetails(user);
      },
      false
    );
  });
  start += 1;
  // return container;
}
function directMyDetails(user) {
  debugger;
  // let url = new URL("localHost:8080/Details.html");
  // url.searchParams.set("id", user.id);
  // window.location.href =url.href;

  window.location.href = `Details.html?userId=${user.id}`;
}
function filterUsers() {
  debugger;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", configUrl);
  xhr.send();
  xhr.onloadend = () => {
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      // alert(JSON.parse(xhr.responseText));
      const text = document.getElementById("searchByFreeTextInput").value;
      let biggerThanWeight =
        document.getElementById("biggerThanWeight").valueAsNumber;
      let lowerThanWeight =
        document.getElementById("lowerThanWeight").valueAsNumber;
      const lostOrGained = document.getElementById("select_lost/gained").value;
      const from = document.getElementById("select_from").value;
      let lowerThanBMI = document.getElementById("lowerThanBMI").valueAsNumber;
      let biggerThanBMI =
        document.getElementById("biggerThanBMI").valueAsNumber;
      const s = document.getElementById("streetSelect");
      const streetSelect = s.options[s.selectedIndex].outerText;
      const c = document.getElementById("citySelect");
      const citySelect = c.options[c.selectedIndex].outerText;
      let users = JSON.parse(xhr.responseText);
      let userMeetings = users[0].Weights.meetings;
      numOfmeetings = Object.keys(userMeetings).length;
      debugger;
      if (text != "") {
        users = filterByText(users, text);
      }
      if (biggerThanWeight || lowerThanWeight) {
        if (!biggerThanWeight) biggerThanWeight = 0;
        if (!lowerThanWeight) lowerThanWeight = 200;
        users = filterByWeight(users, biggerThanWeight, lowerThanWeight);
      }
      if (lostOrGained != "lost/gained" && from != "from") {
        users = filterByGainedOrLost(users, lostOrGained, from, numOfmeetings);
      }
      if (lowerThanBMI != "" || biggerThanBMI != "") {
        debugger;
        if (!lowerThanBMI) lowerThanBMI = 200;
        if (!biggerThanBMI) biggerThanBMI = 0;
        users = filterByBMI(users, biggerThanBMI, lowerThanBMI, numOfmeetings);
      }
      if (streetSelect != "street" || citySelect != "city") {
        users = filterByAddress(users, citySelect, streetSelect);
      }

      document.getElementById("allUsers").innerHTML = "";
      // document
      //   .getElementById("allUsers")
      //   .append(
      showUsers(users, numOfmeetings);
      // );
    }
  };
}
function filterByText(users, text) {
  users = users.filter((u) => {
    return (
      u.firstName.toLowerCase().includes(text.toLowerCase()) ||
      u.lastName.toLowerCase().includes(text.toLowerCase()) ||
      u.address.street.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      u.address.city.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      u.email.toLowerCase().includes(text.toLowerCase()) ||
      u.id.toString().indexOf(text) > -1 ||
      u.age.toString().indexOf(text) > -1 ||
      u.height.toString().indexOf(text) > -1
    );
  });
  return users;
}
function filterByWeight(users, biggerThanWeight, lowerThanWeight) {
  users = users.filter((u) => {
    debugger;
    let userWheight = u.Weights.meetings[numOfmeetings - 1].weight;
    return userWheight > biggerThanWeight && userWheight < lowerThanWeight;
  });
  return users;
}
function filterByGainedOrLost(users, lostOrGained, from, numOfmeetings) {
  if (lostOrGained == "lost_weight") {
    if (from == "from_the_last_week") {
      users = users.filter((u) => {
        let currentWheight = u.Weights.meetings[numOfmeetings - 1].weight;
        let lastWheight = u.Weights.meetings[numOfmeetings - 2].weight;
        return currentWheight < lastWheight;
      });
    } else {
      users = users.filter((u) => {
        return (
          u.Weights.meetings[numOfmeetings - 1].weight < u.Weights.startWeight
        );
      });
    }
  } else {
    if (from == "from_the_last_week") {
      users = users.filter((u) => {
        return (
          u.Weights.meetings[numOfmeetings - 1].weight >
          u.Weights.meetings[numOfmeetings - 2].weight
        );
      });
    } else {
      users = users.filter((u) => {
        return (
          u.Weights.meetings[numOfmeetings - 1].weight > u.Weights.startWeight
        );
      });
    }
  }
  return users;
}
function filterByBMI(users, biggerThanBMI, lowerThanBMI, numOfmeetings) {
  debugger;
  let bmi;
  users = users.filter((u) => {
    bmi = u.Weights.meetings[numOfmeetings - 1].weight / u.height ** 2;
    return bmi < lowerThanBMI && bmi > biggerThanBMI;
  });
  return users;
}
function filterByAddress(users, citySelect, streetSelect) {
  users = users.filter((u) => {
    return u.address.city == citySelect;
  });
  if (streetSelect != "street") {
    users = users.filter((u) => {
      return u.address.street == streetSelect;
    });
  }
  return users;
}

function newMeeting() {}
// window.onload=getUsersForManager();

function directToMeetings() {
  debugger;
  window.location.href = `Meetings.html`;
}
