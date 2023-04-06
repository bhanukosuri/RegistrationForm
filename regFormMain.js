const submitBtn = document.getElementById("submit-btn")

submitBtn.addEventListener("click", saveToLocalStorage)

function saveToLocalStorage(event){
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
}