document.addEventListener("DOMContentLoaded", function () {
    const USER = "barivadar";  // My GitHub username
    const REPO = "barivadar.github.io";  // My repository name
    const DIR = "updates";  // Folder containing my updates
    const API_ENDPOINT = `https://api.github.com/repos/${USER}/${REPO}/contents/${DIR}`;

    const updatesList = document.querySelector("#updates-list");

    fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then((directories) => {
            directories = directories.map(async (directory) => {
                let directoryName = directory.name;
                let file = `/updates/${directoryName}/index.html`;

                let data = await fetch(file);
                let html = await data.text();

                let parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html");
                let title = doc.querySelector("title").innerText;
                let date = doc.querySelector("meta[name='date']").getAttribute("content");

                return {
                    title: title,
                    date: date,
                    name: directoryName,
                };
            });

            return Promise.all(directories);
        })
        .then((directories) => {
            directories.sort((a, b) => new Date(b.date) - new Date(a.date));  // Sort by date

            directories.forEach((update) => {
                const listItem = document.createElement("li");
                const postLink = document.createElement("a");
                const postDate = document.createElement("span");

                postLink.href = `/${DIR}/${update.name}/`;
                postLink.innerText = update.title;

                postDate.classList.add("date");
                postDate.innerText = ` (${new Date(update.date).toLocaleDateString()})`;

                listItem.appendChild(updateLink);
                listItem.appendChild(updateDate);
                postsList.appendChild(listItem);
            });
        })
        .catch((error) => console.error("Error fetching updates:", error));
});
