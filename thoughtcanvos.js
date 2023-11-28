window.onload = function() {
    loadEntries();
    
  };
  
function saveEntry() {
    var entry = document.getElementById('diaryEntry').value;
    if (entry.trim() === '') {
      alert('Please write something before saving.');
      return;
    }
    var currentDate = new Date();
    var dateString = currentDate.toLocaleString();

    var listItem = document.createElement('li');
      listItem.textContent = dateString + ': ' + entry;

      listItem.style.fontSize="30px";
      listItem.style.color="rgb(254, 0, 140)";
 
    var entryList = document.getElementById('entryList');
    entryList.appendChild(listItem);
    


    saveToLocalStorage(dateString, entry);
    
    document.getElementById('diaryEntry').value = '';
  }
  function saveToLocalStorage(date, entry) {
    
    var existingEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    
    existingEntries.push({ date: date, entry: entry });

    
    localStorage.setItem('diaryEntries', JSON.stringify(existingEntries));
  }

  function loadEntries() {
    var entryList = document.getElementById('entryList');
    entryList.innerHTML = ''; 
    var existingEntries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    

    existingEntries.forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.textContent = item.date + ': ' + item.entry;
      entryList.appendChild(listItem);
    });
  }
  function clearEntries() {
    // Clear entries from local storage
    localStorage.removeItem('diaryEntries');
    var entryList = document.getElementById('entryList');
      entryList.innerHTML = '';

  }



  //for creating User//
  function authenticate() {
    var username = document.getElementById('loginUsername').value;
    var password = document.getElementById('loginPassword').value;

    // Retrieve user credentials from local storage
    var storedCredentials = JSON.parse(localStorage.getItem('userCredentials')) || {};

    // Check if the entered username exists and the password is correct
    if (storedCredentials.hasOwnProperty(username) && storedCredentials[username] === password) {
        window.location.href='thoughtcanvos.html'
        // Redirect or perform other actions as needed
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function register() {
    var username = document.getElementById('registerUsername').value;
    var password = document.getElementById('registerPassword').value;

    // Retrieve existing user credentials from local storage
    var storedCredentials = JSON.parse(localStorage.getItem('userCredentials')) || {};

    // Check if the username is already taken
    if (storedCredentials.hasOwnProperty(username)) {
        alert('Username already taken. Please choose a different username.');
    } else {
        // Register the new user by storing their credentials in local storage
        storedCredentials[username] = password;
        localStorage.setItem('userCredentials', JSON.stringify(storedCredentials));

        alert('Registration successful! You can now log in.');
        // Redirect or perform other actions as needed

        // Toggle to the login form after successful registration
        toggleForms();
    }
}

function toggleForms() {
    var loginContainer = document.getElementById('loginContainer');
    var registerContainer = document.getElementById('registerContainer');

    // Toggle the display of login and register forms
    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
    }
}
