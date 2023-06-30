const submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener("click", saveToCloudStorage)

window.onload = loadUsersOnScreenFromCloud

function saveToCloudStorage(event) {
  event.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("emailId").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const obj = {
    name,
    email,
    phoneNumber
  }

  axios.post("https://crudcrud.com/api/022adf4858a944dd9fb4e2e494109339/appointmentData", obj)
    .then((response) => showUserOnScreen(response.data))
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    })

  // localStorage.setItem(email, JSON.stringify(obj));
  // showUserOnScreen(obj)

  document.getElementById("userName").value = ""
  document.getElementById("emailId").value = ""
  document.getElementById("phoneNumber").value = ""
}

function loadUsersOnScreenFromCloud(obj) {
  axios.get("https://crudcrud.com/api/022adf4858a944dd9fb4e2e494109339/appointmentData")
    .then((response) => {
      // console.log(response.data)
      for (const key in response.data) {
        name = response.data[key].name
        email = response.data[key].email
        phoneNumber = response.data[key].phoneNumber

        const obj = {
          name,
          email,
          phoneNumber
        }
        showUserOnScreen(obj)
      }
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + "<h4> Something went wrong </h4>"
    })
}




function saveToLocalStorage(event) {
  event.preventDefault();
  const name = document.getElementById("userName").value;
  const email = document.getElementById("emailId").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  const obj = {
    name,
    email,
    phoneNumber
  }

  localStorage.setItem(email, JSON.stringify(obj));
  showUserOnScreen(obj)

  document.getElementById("userName").value = ""
  document.getElementById("emailId").value = ""
  document.getElementById("phoneNumber").value = ""
}

function showUserOnScreen(obj) {

  const parentElement = document.getElementById("listOfItems");
  const childElement = document.createElement("li");
  childElement.textContent = obj.name + " - " + obj.email + " - " + obj.phoneNumber;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete";
  deleteButton.onclick = () => {
    localStorage.removeItem(obj.email);
    parentElement.removeChild(childElement);
  };
  childElement.appendChild(deleteButton);
  parentElement.appendChild(childElement);

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";

  editButton.onclick = () => {
    document.getElementById("userName").value = obj.name
    document.getElementById("emailId").value = obj.email
    document.getElementById("phoneNumber").value = obj.phoneNumber
    localStorage.removeItem(obj.email);
    parentElement.removeChild(childElement);
  };
  childElement.appendChild(editButton);
  parentElement.appendChild(childElement);
}