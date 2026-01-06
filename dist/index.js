async function d(){try{let e=+await(await fetch("https://wxn0brp.github.io/paper/posts.txt")).text();return localStorage.setItem("newsCount",e.toString()),e}catch{if(localStorage.getItem("newsCount"))return+localStorage.getItem("newsCount")||0;return 0}}async function u(t){let s;if(localStorage.getItem(`post-${t}`))s=localStorage.getItem(`post-${t}`)||"";else s=await(await fetch(`https://wxn0brp.github.io/paper/post/${t}.txt`)).text(),localStorage.setItem(`post-${t}`,s);let e=s.split(`
`),n=e.shift(),o=e.shift(),r=e.shift(),w=e.shift(),l=e.join(`
`);return{id:t,date:o,title:n,url:r,icon:w,content:l}}function i(){let t=localStorage.getItem("viewedNews");if(!t)return[];return t.split(",")}function c(...t){let e=[...i(),...t],n=new Set(e);a.viewedNews=[...n],localStorage.setItem("viewedNews",[...n].join(","))}function p(t,s){let e=document.querySelector("#list");if(!e)return;e.innerHTML="",t.forEach((n)=>{let o=document.createElement("article");o.className="news-card",o.classList.toggle("viewed",s.includes(n.id)),o.innerHTML=`
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
        `,o.addEventListener("click",()=>{c(n.id),o.classList.toggle("viewed",!0)}),e.appendChild(o)})}async function g(){let t=[];for(let s=a.newsCount;s>=1;s--)t.push(await u(s.toString()));return t}var a={newsCount:0,news:[],viewedNews:[]};async function m(){a.newsCount=await d(),a.viewedNews=i(),a.news=await g(),p(a.news,a.viewedNews),console.log(a)}var f=m();window.store=a;window.addEventListener("message",async(t)=>{if(t.data.type==="get-count")t.source.postMessage({type:"count",count:a.newsCount-a.viewedNews.length});if(t.data.type==="mark-as-viewed")c(...t.data.ids),t.source.postMessage({type:"viewed-news",news:a.viewedNews});if(t.data.type==="ready")await f,t.source.postMessage({type:"ready"});if(t.data.type==="set-css-var"){let s=t.data.name,e=t.data.value;document.documentElement.style.setProperty("--"+s,e)}if(t.data.type==="get-store")t.source.postMessage({type:"store",store:a})});

//# debugId=DE7B028306BDC91964756E2164756E21
//# sourceMappingURL=index.js.map
