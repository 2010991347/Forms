const element = document.querySelector('form');
element.addEventListener('submit', event => {
  var name = document.getElementById("name").value;
  var password = document.getElementById("password").value;
  var phno = document.getElementById("phno").value;
  console.log(name);
  console.log(password);
  console.log(phno);
 
  function onlyLettersAndSpaces(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  function containsSpecialChars(str) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  if (name == null || name == "" ) {
    alert("Name can't be blank")
    event.preventDefault();
    // return false;
  }
   else if(!onlyLettersAndSpaces(name)){
    alert("Name can only have alphabets or space");
    event.preventDefault();
   } 
  else if(!containsSpecialChars(password)){
    alert("use some special characters to make your password strong");
    event.preventDefault();
  }
  else if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    event.preventDefault();
    // return false;  
  }
  else if (phno.length < 10 || phno.length > 10) {
    alert("Phone number can have only 10 digits.");
    // return false;
    event.preventDefault();
  }
  // actual logic, e.g. validate the form
  console.log('Form submission cancelled.');
});


// function formcheck(event) {
  
// }