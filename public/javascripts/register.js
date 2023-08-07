console.log(1);
document
  .getElementById("rform")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form submission

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;
    const dob = document.getElementById("dob").value;

    let data = {
      fullname,
      email,
      password,
      dob,
    };
    console.log(data);

    let u = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await u.json();

    document.getElementById("invalid").innerText = res.msg;
    if (res.msg == "Registration successfull") {
      window.location.href = "/login";
    }
  });
