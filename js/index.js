document.addEventListener("DOMContentLoaded", function () {
    const USER = "barivadar";
    const REPO = "barivadar.github.io";
    const DIR = "posts";
    const API_ENDPOINT = `https://api.github.com/repos/${USER}/${REPO}/contents/${DIR}`;

    fetch(API_ENDPOINT)
        .then((response) => response.json())
        .then((directories) => {
            const postsList = document.getElementById("posts-list");

            directories = directories.map(async (directory) => {
                let directoryName = directory.name;
                let file = `../posts/${directoryName}/index.html`;

                let data = await fetch(file);
                let html = await data.text();

                let parser = new DOMParser();
                let doc = parser.parseFromString(html, "text/html");
                let title = doc.querySelector("title").innerText;

                let date = doc.querySelector("meta[name='date']").content;

                return {
                    title: title,
                    date: date,
                    name: directoryName,
                };
            });

            Promise.all(directories).then((directories) => {
                directories
                    .sort(function (a, b) {
                        return new Date(b.date) - new Date(a.date);
                    })
                    .forEach((item) => {
                        const listItem = document.createElement("li");
                        const postLink = document.createElement("a");
                        const span = document.createElement("span");

                        postLink.href = `/${DIR}/${item.name}/`;
                        postLink.innerText = `${item.title}`;

                        span.classList.add("date");
                        span.innerText = ` ${new Date(
                            item.date
                        ).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}`;

                        listItem.appendChild(postLink);
                        listItem.appendChild(span);
                        postsList.appendChild(listItem);
                    });
            });
        })
        .catch((error) => console.error("Error fetching posts:", error));
});
