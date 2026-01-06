async function w(){try{let s=+await(await fetch("https://wxn0brp.github.io/paper/posts.txt")).text();return localStorage.setItem("newsCount",s.toString()),s}catch{if(localStorage.getItem("newsCount"))return+localStorage.getItem("newsCount")||0;return 0}}async function u(e){let t;if(localStorage.getItem(`post-${e}`))t=localStorage.getItem(`post-${e}`)||"";else t=await(await fetch(`https://wxn0brp.github.io/paper/post/${e}.txt`)).text(),localStorage.setItem(`post-${e}`,t);let s=t.split(`
`),n=s.shift(),o=s.shift(),a=s.shift(),r=s.shift(),l=s.join(`
`);return{id:e,date:o,title:n,url:a,icon:r,content:l}}function c(){let e=localStorage.getItem("viewedNews");if(!e)return[];return e.split(",")}function d(...e){let s=[...c(),...e],n=new Set(s);i.viewedNews=[...n],localStorage.setItem("viewedNews",[...n].join(","))}function m(e,t){let s=document.querySelector("#list");if(!s)return;s.innerHTML="",e.forEach((n)=>{let o=document.createElement("article");o.className="news-card",o.classList.toggle("viewed",t.includes(n.id)),o.innerHTML=`
<div class="news-top-section">
    <div class="news-info">
        <h2 class="news-title">${n.title}</h2>
        <div class="news-meta">
            <span class="news-date">${new Date(n.date).toLocaleString()||""}</span>
            ${n.url?`<a href="${n.url}" class="news-source-link" target="_blank" title="Source / Link">Click Me!</a>`:""}
        </div>
    </div>
    ${n.icon?`<div class="news-icon-wrapper"><img class="news-icon" src="${n.icon}" alt=""></div>`:""}
</div>
<div class="news-content-section">
    <details class="news-details">
        <summary class="news-summary">Read more</summary>
        <div class="news-text">
            <p>${n.content}</p>
        </div>
    </details>
</div>
        `,o.addEventListener("click",()=>{d(n.id),o.classList.toggle("viewed",!0)}),o.querySelector(".news-source-link")?.addEventListener("click",(a)=>{window.parent.postMessage({type:"open-link",url:a.target.href},"*")}),s.appendChild(o)})}async function g(){let e=[];for(let t=i.newsCount;t>=1;t--)e.push(await u(t.toString()));return e}var i={newsCount:0,news:[],viewedNews:[]};async function p(){i.newsCount=await w(),i.viewedNews=c(),i.news=await g(),m(i.news,i.viewedNews)}p();var f=new URLSearchParams(window.location.search);for(let[e,t]of f.entries())document.documentElement.style.setProperty("--"+e,t);

//# debugId=D02AD61B5C7AC61864756E2164756E21
//# sourceMappingURL=index.js.map
