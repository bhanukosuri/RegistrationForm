const myForm = document.querySelector('#my-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const phoneNumberInput = document.querySelector('#phoneNumber');
const msg = document.querySelector('.msg');
const userList = document.querySelector('#users');

myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  if (
    nameInput.value === '' ||
    emailInput.value === '' ||
    phoneNumberInput.value === ''
  ) {
    msg.textContent = 'Enter Valid Details';
  } else {
    msg.textContent = '';

    let myObj = {
      name: nameInput.value,
      email: emailInput.value,
      phonenumber: phoneNumberInput.value,
    };
    let myObj_serialized = JSON.stringify(myObj);
    localStorage.setItem(emailInput.value, myObj_serialized);
    let myObj_deserialized = JSON.parse(localStorage.getItem(emailInput.value));
    userList.textContent = myObj_deserialized;

    const li = document.createElement('li');
    li.appendChild(
      document.createTextNode(
        `${myObj_deserialized.name} : ${myObj_deserialized.email} : ${myObj_deserialized.phonenumber}`
      )
    );
    userList.appendChild(li);

    nameInput.value = '';
    emailInput.value = '';
    phoneNumberInput.value = '';
  }
}
