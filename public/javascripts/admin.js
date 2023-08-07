document.getElementById("rform").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  var blogCategory = document.getElementById("blogcategory").value;
  var blogName = document.getElementById("Blog_name").value;
  var file = document.getElementById("file");
  var seoTitle = document.getElementById("Seo").value;
  var seoDescription = document.getElementById("Seo_Discription").value;
  var seoKeyword = document.getElementById("Seo_keyword").value;
  var blogContent = document.getElementById("blog").value;
  const formData = new FormData();
  if (file != undefined) {
    formData.append("file", file.files[0]);
  }

  formData.append("blogCategory", blogCategory);
  formData.append("blogName", blogName);
  formData.append("seoTitle", seoTitle);
  formData.append("seoDescription", seoDescription);
  formData.append("seoKeyword", seoKeyword);
  formData.append("blogContent", blogContent);
  axios
    .post(`/admin/create-blog`, formData, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // Handle the response from the API
      console.log(response);
      document.getElementById("invalid").innerText =
        response.data.msg || response.data.details[0].message;
      if (response.data.msg == "blog is created") {
        window.location.reload();
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
});

/// admin Logout Code
document.getElementById("logout").addEventListener("click", Admin_Logout);

async function Admin_Logout() {
  let res = await fetch("/admin/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.reload();
}

// Show create form

document.getElementById("Cpl").addEventListener("click", Show_Create_Form);
function Show_Create_Form() {
  console.log(1);
  document.getElementById("layoutAuthentication").style.display = "block";
}

// Get Blogs

async function GET_BLOGS() {
  let b = await fetch("/admin/blogs");
  let blogs = await b.json();
  console.log(blogs);
  Append_Blogs(blogs.data);
}

GET_BLOGS();

// Append Blogs

function Append_Blogs(data) {
  let tbody = document.getElementById("blogtb");
  data.forEach((el) => {
    let Trow = document.createElement("tr");
    let blogname = document.createElement("td");
    blogname.innerText = el.blogName;
    let blogcategory = document.createElement("td");
    blogcategory.innerText = el.blogCategory;
    let banner = document.createElement("td");

    let img = document.createElement("img");
    banner.append(img);
    img.src = `/images/${el.Image}`;
    let edit = document.createElement("td");
    edit.innerText = "Edit";
    edit.setAttribute("id", "edit");
    edit.addEventListener("click", () => {
      EDIT_BLOG(el);
    });
    let Delete = document.createElement("td");
    Delete.innerText = "Delete";
    Delete.setAttribute("id", "Del");
    Delete.style.backgroundColor = "red";
    Delete.addEventListener("click", () => {
      Blog_DELETE(el);
    });
    let Visible = document.createElement("td");

    if (el.visible == 1) {
      Visible.innerText = "Yes";
      Visible.style.backgroundColor = "yellow";
    } else {
      Visible.innerText = "No";
      Visible.style.backgroundColor = "grey";
    }

    Visible.addEventListener("click", () => {
      BLOG_VISIBILITY(el);
    });
    Trow.append(blogname, blogcategory, banner, edit, Delete, Visible);
    tbody.append(Trow);
  });
}

/// DELETE BLOG

async function Blog_DELETE(el) {
  let res = await fetch(`/admin/blog/delete/${el.id}`, {
    method: "DELETE",
  });
  let response = await res.json();
  window.location.reload();
}

// Vlog Visibility

async function BLOG_VISIBILITY(el) {
  let res = await fetch(`/admin/blog/visibility/${el.id}/${el.visible}`, {
    method: "PUT",
    headers: {
      "Content-Type": "applicatio/json",
    },
  });

  let response = await res.json();
  window.location.reload();
}

// Edit Blog

async function EDIT_BLOG(el) {
  document.getElementById("Updateblog").style.display = "block";
  APPEND_DATA_TO_UPDATE_FORM(el);
}

function APPEND_DATA_TO_UPDATE_FORM(el) {
  const form = document.getElementById("UBform");
  document.getElementById("ub_id").value = +el.id;
  document.getElementById("ub_blogcategory").value = el.blogCategory;
  document.getElementById("ub_Blog_name").value = el.blogName;
  document.getElementById("ub_image").value = el.Image;
  document.getElementById("ub_Seo").value = el.seoTitle;
  document.getElementById("ub_Seo_Discription").value = el.seoDescription;
  document.getElementById("ub_Seo_keyword").value = el.seoKeyword;
  document.getElementById("ub_blog").value = el.blogContent;
  // Set values for each input element based on their IDs
  console.log(el);
}

document.getElementById("UBform").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Retrieve input values
  var id = document.getElementById("ub_id").value;
  var blogCategory = document.getElementById("ub_blogcategory").value;
  var blogName = document.getElementById("ub_Blog_name").value;
  var file = document.getElementById("ub_file"); // Get the first selected file (assuming only one file is selected)
  var seoTitle = document.getElementById("ub_Seo").value;
  var seoDescription = document.getElementById("ub_Seo_Discription").value;
  var seoKeyword = document.getElementById("ub_Seo_keyword").value;
  var blogContent = document.getElementById("ub_blog").value;
  var Image = document.getElementById("ub_image").value;
  const formData = new FormData();

  formData.append("Image", Image);
  formData.append("blogCategory", blogCategory);
  formData.append("blogName", blogName);
  formData.append("seoTitle", seoTitle);
  formData.append("seoDescription", seoDescription);
  formData.append("seoKeyword", seoKeyword);
  formData.append("blogContent", blogContent);
  if (file != undefined) {
    formData.append("file", file.files[0]);
  }

  axios
    .put(`/admin/blog/update/${id}`, formData, {
      headers: {
        "content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      // Handle the response from the API
      console.log(response);
      document.getElementById("ub_invalid").innerText =
        response.data.msg || response.data.details[0].message;
      if (response.data.msg == "blog is updated") {
        window.location.reload();
      }
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
    });
});
