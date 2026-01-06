async function w(){try{let s=+await(await fetch("https://wxn0brp.github.io/paper/posts.txt")).text();return localStorage.setItem("newsCount",s.toString()),s}catch{if(localStorage.getItem("newsCount"))return+localStorage.getItem("newsCount")||0;return 0}}async function u(t){let e;if(localStorage.getItem(`post-${t}`))e=localStorage.getItem(`post-${t}`)||"";else e=await(await fetch(`https://wxn0brp.github.io/paper/post/${t}.txt`)).text(),localStorage.setItem(`post-${t}`,e);let s=e.split(`
`),n=s.shift(),o=s.shift(),i=s.shift(),r=s.shift(),l=s.join(`
`);return{id:t,date:o,title:n,url:i,icon:r,content:l}}function c(){let t=localStorage.getItem("viewedNews");if(!t)return[];return t.split(",")}function d(...t){let s=[...c(),...t],n=new Set(s);a.viewedNews=[...n],localStorage.setItem("viewedNews",[...n].join(","))}function m(t,e){let s=document.querySelector("#list");if(!s)return;s.innerHTML="",t.forEach((n)=>{let o=document.createElement("article");o.className="news-card",o.classList.toggle("viewed",e.includes(n.id)),o.innerHTML=`
<div class="news-top-section">
    <div class="news-info">
        <h2 class="news-title">${n.title}</h2>
        <div class="news-meta">
            <span class="news-date">${new Date(n.date).toLocaleString()||""}</span>
            ${n.url?`<a href="${n.url}" class="news-source-link" target="_blank">Source</a>`:""}
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
        `,o.addEventListener("click",()=>{d(n.id),o.classList.toggle("viewed",!0)}),s.appendChild(o)})}async function g(){let t=[];for(let e=a.newsCount;e>=1;e--)t.push(await u(e.toString()));return t}var a={newsCount:0,news:[],viewedNews:[]};async function f(){a.newsCount=await w(),a.viewedNews=c(),a.news=await g(),m(a.news,a.viewedNews)}f();var p=new URLSearchParams(window.location.search);for(let[t,e]of p.entries())document.documentElement.style.setProperty("--"+t,e);

//# debugId=BD1DFC28B2C2F83A64756E2164756E21
//# sourceMappingURL=index.js.map
