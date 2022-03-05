async function loginFormHandler(event) {
    event.preventDefault();
  // username and password obtained from form
    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  // form values passed to login POST method 
    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({
          username,
          password
        }),
        headers: { "Content-Type": "application/json" },
      });
  // user is taken to dashboard once logged in
      if (response.ok) {
        document.location.replace("/dashboard/");
      } else {
        alert(response.statusText);
      }
    }
  }
  
  // same functionality as above but through the users api
  async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (username && password) {
      const response = await fetch("/api/users", {
        method: "post",
        body: JSON.stringify({
          username,
          password
        }),
        headers: { "Content-Type": "application/json" },
      });
      // check the response status
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  