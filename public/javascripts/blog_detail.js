let data = JSON.parse(localStorage.getItem("blog"));
// console.log(data.id);

// get detail of  a blog

async function GETBLOGDATA(id) {
  let data = await fetch(`/blog/detail/${id}`);
  let res = await data.json();
  console.log(res.data[0]);
  localStorage.setItem("blog", JSON.stringify(res.data[0]));
  window.location.reload();
}

// console.log(data.comment);
document.querySelector("#Blog-image>img").src = `/images/${data.Image}`;
document.querySelector("#blog_title").innerHTML = data.blogName;
document.querySelector("#acctual_Blog").innerHTML = data.blogContent;
document.querySelector("#cate").innerHTML = "Category:" + data.blogCategory;
document.querySelector("#cAt").innerHTML = "CreatedAt :" + data.createAt;
///LOG OUT

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

///ADD COMMENT

document
  .getElementById("Comment_btn")
  .addEventListener("click", Create_Comment);

async function Create_Comment() {
  let c = document.getElementById("comment").value;
  let Comment;
  if (typeof data.comment == "string") {
    Comment = [];
  } else {
    Comment = data.comment;
  }
  Comment.push(c);
  let Data = { comment: Comment };

  let res = await fetch(`/blog/comment/${data.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Data),
  });

  let response = await res.json();
  console.log(response);

  GETBLOGDATA(data.id);
}

function APPEND_COMMENT(data) {
  let container = document.getElementById("Acctual_Comment_Div");
  data.forEach((el) => {
    let p = document.createElement("p");
    p.innerText = el;
    container.append(p);
  });
}

if (typeof data.comment != "string") {
  APPEND_COMMENT(data.comment);
}
