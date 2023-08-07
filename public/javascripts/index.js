document.getElementById("logout").addEventListener("click", LOG_OUT);

async function LOG_OUT() {
  let res = await fetch("/login/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let response = await res.json();
  window.location.reload();
}

/// Get Data

async function GET_BLOGS() {
  let b = await fetch("/admin/blogs");
  let blogs = await b.json();
  console.log(blogs);

  APPEND_BLOGS(blogs.data);
}

GET_BLOGS();

function APPEND_BLOGS(data) {
  let container = document.getElementById("container");
  data.forEach((el) => {
    if (el.visible == 1) {
      let card = document.createElement("div");
      card.setAttribute("id", "card");
      let Image = document.createElement("div");
      Image.setAttribute("id", "image");
      let img = document.createElement("img");
      img.src = `/images/${el.Image}`;
      Image.append(img);
      let Title = document.createElement("h6");
      Title.innerHTML = el.blogName;
      let p = document.createElement("p");
      p.innerText = el.blogContent.slice(0, 50);
      let date = document.createElement("a");
      date.innerText = "createdAt:" + el.createAt.split("T")[0];
      card.append(Image, Title, p, date);

      card.addEventListener("click", () => {
        localStorage.setItem("blog", JSON.stringify(el));
        window.location.href = "/blog";
      });
      container.append(card);
    }
  });
}
