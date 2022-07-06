let CurrentUser;
const logIn = () => {
  debugger;
  const managerXHR = new XMLHttpRequest();
  managerXHR.open("GET", "http://localhost:3000/manager");
  managerXHR.send();
  managerXHR.onload = () => {
    if (managerXHR.status !== 200) {
      alert(`Error ${managerXHR.status}: ${managerXHR.statusText}`);
    } else {
      let manager = JSON.parse(managerXHR.response);
      console.log(manager);
      let mail = document.getElementById("mailInput").value;
      let pswd = document.getElementById("passwordInput").value;
      if (mail == manager.email && pswd == manager.password) {
        if (window.confirm("welcome")) {
          window.location.href = "src/Manager.html";
        }
      } else {
        const userXHR = new XMLHttpRequest();
        userXHR.open("GET", "http://localhost:3000/users");
        userXHR.send();
        userXHR.onload = () => {
          if (userXHR.status !== 200) {
            alert(`Error ${userXHR.status}: ${userXHR.statusText}`);
          } else {
            let users = JSON.parse(userXHR.responseText);
            console.log(users);
            CurrentUser = users.find((u) => u.email == mail && u.id == pswd);
            if (CurrentUser) {
              localStorage.setItem("cu", JSON.stringify(CurrentUser));//זה רק בנוסף
              debugger;
              window.location.href = `src/User.html?userId=${CurrentUser.id}`;
            } else alert("user not found");
          }
        }
      }
    };
  };
}