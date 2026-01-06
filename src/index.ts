type Post = Awaited<ReturnType<typeof fetchNew>>;
const masterURL = "https://wxn0brp.github.io/paper/";

async function fetchNewsCount() {
    try {
        const res = await fetch(masterURL + "posts.txt");
        const newsCount = await res.text();
        const count = +newsCount;
        localStorage.setItem("newsCount", count.toString());
        return count;
    } catch {
        if (localStorage.getItem("newsCount")) {
            return +localStorage.getItem("newsCount") || 0;
        }
        return 0;
    }
}

async function fetchNew(id: string) {
    let post: string;

    if (localStorage.getItem(`post-${id}`)) {
        post = localStorage.getItem(`post-${id}`) || "";
    } else {
        const res = await fetch(masterURL + `post/${id}.txt`);
        post = await res.text();
        localStorage.setItem(`post-${id}`, post);
    }

    const lines = post.split("\n");
    const title = lines.shift();
    const date = lines.shift();
    const url = lines.shift();
    const icon = lines.shift();
    const content = lines.join("\n");

    return {
        id,
        date,
        title,
        url,
        icon,
        content,
    };
}

function getViewedNews() {
    const store = localStorage.getItem("viewedNews");
    if (!store) return [];
    return store.split(",");
}

function markAsView(...ids: string[]) {
    const viewedNews = getViewedNews();
    const newViewedNews = [...viewedNews, ...ids];
    const set = new Set(newViewedNews);
    store.viewedNews = [...set];
    localStorage.setItem("viewedNews", [...set].join(","));
}

function renderNews(news: Post[], viewedNews: string[]) {
    const list = document.querySelector("#list");
    if (!list) return;
    list.innerHTML = "";

    news.forEach(_new => {
        const newElement = document.createElement("article");
        newElement.className = "news-card";
        newElement.classList.toggle("viewed", viewedNews.includes(_new.id));
        newElement.innerHTML = `
<div class="news-top-section">
    <div class="news-info">
        <h2 class="news-title">${_new.title}</h2>
        <div class="news-meta">
            <span class="news-date">${new Date(_new.date).toLocaleString() || ""}</span>
            ${_new.url ? `<a href="${_new.url}" class="news-source-link" target="_blank" title="Source / Link">Click Me!</a>` : ""}
        </div>
    </div>
    ${_new.icon ? `<div class="news-icon-wrapper"><img class="news-icon" src="${_new.icon}" alt=""></div>` : ""}
</div>
<div class="news-content-section">
    <details class="news-details">
        <summary class="news-summary">Read more</summary>
        <div class="news-text">
            <p>${_new.content}</p>
        </div>
    </details>
</div>
        `;
        newElement.addEventListener("click", () => {
            markAsView(_new.id);
            newElement.classList.toggle("viewed", true);
        });

        newElement.querySelector(".news-source-link")?.addEventListener("click", (e) => {
            window.parent.postMessage({ type: "open-link", url: (e.target as HTMLAnchorElement).href }, "*");
        });

        list.appendChild(newElement);
    });
}

async function fetchNews() {
    const news = [] as Post[];
    for (let i = store.newsCount; i >= 1; i--)
        news.push(await fetchNew(i.toString()));
    return news;
}

const store = {
    newsCount: 0,
    news: [] as Post[],
    viewedNews: [] as string[],
};

async function init() {
    store.newsCount = await fetchNewsCount();
    store.viewedNews = getViewedNews();
    store.news = await fetchNews();

    renderNews(store.news, store.viewedNews);
}

init();

const searchParams = new URLSearchParams(window.location.search);
for (const [key, value] of searchParams.entries()) {
    document.documentElement.style.setProperty("--" + key, value);
}