async function d(){try{let t=+await(await fetch("/posts.txt")).text();return localStorage.setItem("newsCount",t.toString()),t}catch{if(localStorage.getItem("newsCount"))return+localStorage.getItem("newsCount")||0;return 0}}async function u(e){let s;if(localStorage.getItem(`post-${e}`))s=localStorage.getItem(`post-${e}`)||"";else s=await(await fetch(`/post/${e}.txt`)).text(),localStorage.setItem(`post-${e}`,s);let t=s.split(`
`),n=t.shift(),o=t.shift(),r=t.shift(),w=t.shift(),l=t.join(`
`);return{id:e,date:o,title:n,url:r,icon:w,content:l}}function i(){let e=localStorage.getItem("viewedNews");if(!e)return[];return e.split(",")}function c(...e){let t=[...i(),...e],n=new Set(t);a.viewedNews=[...n],localStorage.setItem("viewedNews",[...n].join(","))}function g(e,s){let t=document.querySelector("#list");if(!t)return;t.innerHTML="",e.forEach((n)=>{let o=document.createElement("article");o.className="news-card",o.classList.toggle("viewed",s.includes(n.id)),o.innerHTML=`
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
        `,o.addEventListener("click",()=>{c(n.id),o.classList.toggle("viewed",!0)}),t.appendChild(o)})}async function p(){let e=[];for(let s=a.newsCount;s>=1;s--)e.push(await u(s.toString()));return e}var a={newsCount:0,news:[],viewedNews:[]};async function f(){a.newsCount=await d(),a.viewedNews=i(),a.news=await p(),g(a.news,a.viewedNews),console.log(a)}var m=f();window.store=a;window.addEventListener("message",async(e)=>{if(e.data.type==="get-count")e.source.postMessage({type:"count",count:a.newsCount-a.viewedNews.length});if(e.data.type==="mark-as-viewed")c(...e.data.ids),e.source.postMessage({type:"viewed-news",news:a.viewedNews});if(e.data.type==="ready")await m,e.source.postMessage({type:"ready"});if(e.data.type==="set-css-var"){let s=e.data.name,t=e.data.value;document.documentElement.style.setProperty("--"+s,t)}if(e.data.type==="get-store")e.source.postMessage({type:"store",store:a})});

//# debugId=AEF0871CABC2AF5364756E2164756E21
//# sourceMappingURL=index.js.map
