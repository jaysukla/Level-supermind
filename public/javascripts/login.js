document
  .getElementById("lform")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    // Retrieve input values
    var email = document.getElementById("inputEmail").value;
    var password = document.getElementById("inputPassword").value;

    let res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    let response = await res.json();
    console.log(response);

    if (response.msg == "login Success") {
      window.location.href = "/";
    }

    document.getElementById("inv").innerText = response.msg;
  });
