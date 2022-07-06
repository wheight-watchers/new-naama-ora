function displayUsersForEnterWeight() {
  const dateInput = document.getElementById("dateInput");
  dateInput.value = new Date().toLocaleDateString();
  debugger;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/users");
  xhr.send();
  xhr.onload = () => {
    debugger;
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${managerXHR.statusText}`);
    } else {
      let users = JSON.parse(xhr.responseText);
      const usersContainer = document.getElementById("usersWeightsForMeet");
      users.forEach((u) => {
        debugger;
        usersContainer.innerHTML += `
            <lable>${u.firstName + " " + u.lastName}</lable>
            <input type="number" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
             id=${u.id + "Weight"} placeHolder="enter ${u.firstName} weight">`;
      });
    }
  };
}
function newMeeting() {
  debugger;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/users");
  xhr.send();
  xhr.onload = () => {
    debugger;
    if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${managerXHR.statusText}`);
    } else {
      let users = JSON.parse(xhr.responseText);
      const meetDate = document.forms.meet.date.value;
      const weights=[]
      users.forEach((u)=>{
          let w=document.getElementById(u.id + "Weight").value;
          weights.push({name:u.firstName+" "+u.lastName,weight:w})
      })
      
      meetings[meetings.length] = {
        date: meetDate,
        usersWeight: weights
      };
    }
  };
  // usersWeights:{
  //     ${u.firstName+" "+u.lastName}:${document.forms.meet.${u.id+"Weight"}.}
  //   }
  // let formData = new FormData(document.forms.meet);
  // let data={"date":document.forms.meet.date.value,"weight":document.forms.meet.weight.value}
  // add one more field
  // formData.append("middle", "Lee");

  // send it out
  // let xhr = new XMLHttpRequest();
  // xhr.open("POST", "../db-1655750686617.json");
  // xhr.send(formData);

  // xhr.onload = () =>{
  //   debugger;
  //  alert(xhr.response);
  // }
}
meetings = [];
onload = displayUsersForEnterWeight();
