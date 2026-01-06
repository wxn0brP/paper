(()=>{let e=document.createElement("iframe");e.src="https://wxn0brp.github.io/paper/",e.style.display="none",e.id="small-paper-iframe",document.body.appendChild(e);let t=document.createElement("button");t.id="small-paper-button",t.innerHTML="V",t.title="View News",document.body.appendChild(t),t.addEventListener("click",()=>{e.style.display=e.style.display==="none"?"":"none",e.contentWindow.postMessage({type:"get-count"},"*")}),window.addEventListener("message",(o)=>{let n=o.data;if(n.type==="ready")e.contentWindow.postMessage({type:"get-count"},"*");if(n.type==="count")t.innerHTML="V"+n.count.toString()}),e.addEventListener("load",()=>{setTimeout(()=>{e.contentWindow.postMessage({type:"ready"},"*")},100)})})();

//# debugId=755C8C2C53F9551164756E2164756E21
//# sourceMappingURL=load.js.map
