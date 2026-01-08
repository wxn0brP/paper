import { readdir } from "fs/promises";
import { join, extname, basename } from "path";

const masterURL = "https://wxn0brp.github.io/paper/";

interface Post {
    id: string;
    title: string;
    date: string;
    url: string;
    icon: string;
    content: string;
}

async function getPosts(): Promise<Post[]> {
    const postsDir = "public/post";
    const files = await readdir(postsDir);
    const posts: Post[] = [];

    for (const file of files) {
        if (extname(file) === ".txt") {
            const id = basename(file, ".txt");
            const postContent = await Bun.file(join(postsDir, file)).text();
            const lines = postContent.split("\n");
            const [title, date, url, icon, ...contentLines] = lines;
            const content = contentLines.join("\n");
            posts.push({
                id,
                title: title || "",
                date: date || "",
                url: url || "",
                icon: icon || "",
                content
            });
        }
    }
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

async function generateRss() {
    const posts = await getPosts();
    const rssItems = posts.map(post => `
        <item>
            <title>${post.title}</title>
            <link>${post.url || masterURL}</link>
            <guid>${masterURL}post/${post.id}.txt</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <content:encoded><![CDATA[${post.content}]]></content:encoded>
        </item>
    `).join("");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>wxn0brP News Paper</title>
        <link>${masterURL}</link>
        <description>Latest news from wxn0brP</description>
        <language>en</language>
        <atom:link href="${masterURL}rss.xml" rel="self" type="application/rss+xml" />
        ${rssItems}
    </channel>
</rss>`;

    await Bun.write("public/rss.xml", rssFeed);
    console.log("RSS feed generated successfully.");
}

generateRss();
