(() => {
    const iframe = document.createElement("iframe");
    iframe.src = "https://wxn0brp.github.io/paper/";
    iframe.style.display = "none";
    iframe.id = "small-paper-iframe";
    document.body.appendChild(iframe);

    const button = document.createElement("button");
    button.id = "small-paper-button";
    button.innerHTML = "V";
    button.title = "View News";
    document.body.appendChild(button);

    button.addEventListener("click", () => {
        iframe.style.display = iframe.style.display === "none" ? "" : "none";
        iframe.contentWindow.postMessage({ type: "get-count" }, "*");
    });

    window.addEventListener("message", (e) => {
        const data = e.data;
        if (data.type === "ready") {
            iframe.contentWindow.postMessage({ type: "get-count" }, "*");
        }
        if (data.type === "count") {
            button.innerHTML = "V" + data.count.toString();
        }
    });

    iframe.addEventListener("load", () => {
        setTimeout(() => {
            iframe.contentWindow.postMessage({ type: "ready" }, "*");
        }, 100);
    });
})();