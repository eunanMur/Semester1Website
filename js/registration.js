document.getElementById('registration-form').addEventListener('submit', function(event){
  event.preventDefault();

 
  var email = document.getElementById('email').value;
  var confirmEmail = document.getElementById('confirmEmail').value;
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;

  
  if (!validateEmail(email) || email !== confirmEmail) {
      alert('Please check that your emails match and are in the correct format.');
      return false;
  }


  if (password !== confirmPassword) {
      alert('Your passwords do not match.');
      return false;
  }


  alert('Registration successful!');
  localStorage.setItem('registeredEmail', email);
  localStorage.setItem('registeredPassword', password);

  window.location.href = 'account.html';
  
});

function validateEmail(email) {
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(String(email).toLowerCase());
}
