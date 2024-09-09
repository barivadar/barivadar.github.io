document.addEventListener("DOMContentLoaded", function () {
    let title = document.querySelector("title").innerText;
    let dateContent = document.querySelector("meta[name='date']").getAttribute("content");
    let dateParts = dateContent.split("-");
    let formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    let headDiv = document.createElement("div");
    headDiv.className = "head";

    let backButton = document.createElement("a");
    backButton.href = "/";
    backButton.innerHTML = "← Back to home";
    headDiv.appendChild(backButton);

    let updateTitle = document.createElement("h1");
    updateTitle.innerText = title;
    headDiv.appendChild(updateTitle);

    let updateDate = document.createElement("p");
    updateDate.className = "date";
    updateDate.innerText = formattedDate;
    headDiv.appendChild( updateDate);

    let  updateBody = document.querySelector(". update-body");
    updateBody.insertBefore(headDiv,  updateBody.firstChild);
});
