(() => {
    const script = document.currentScript as HTMLScriptElement;
    if (!script) return;
    const url = new URL(script.src);
    const params = url.searchParams;

    const iframe = document.createElement("iframe");
    iframe.src = "https://wxn0brp.github.io/paper/?" + params.toString();
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
    });
})();