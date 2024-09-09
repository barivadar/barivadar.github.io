document.addEventListener("DOMContentLoaded", function () {
    // Extract the title from the <title> tag
    let title = document.querySelector("title").innerText;

    // Extract the post date from the <meta name="date"> tag
    let dateContent = document
        .querySelector("meta[name='date']")
        .getAttribute("content");
    let dateParts = dateContent.split("-");
    let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    // Construct the head div
    let headDiv = document.createElement("div");
    headDiv.className = "head";

    let backButton = document.createElement("a");
    backButton.href = "/";
    backButton.innerHTML = "← Back to home";
    headDiv.appendChild(backButton);

    let postTitle = document.createElement("h1");
    postTitle.innerText = title;
    headDiv.appendChild(postTitle);

    let postDate = document.createElement("p");
    postDate.className = "date";
    postDate.innerText = formattedDate;

    headDiv.appendChild(postDate);

    // Insert the head div at the top of the .post-body div
    let postBody = document.querySelector(".post-body");
    postBody.insertBefore(headDiv, postBody.firstChild);
});
