const anzhiyu={debounce:(e,t=0,n=!1)=>{let o;return(...i)=>{const a=n&&!o;clearTimeout(o),o=setTimeout(()=>{o=null,n||e(...i)},t),a&&e(...i)}},throttle:function(e,t,n={}){let o,i,a,s=0;const c=()=>{s=!1===n.leading?0:(new Date).getTime(),o=null,e.apply(i,a),o||(i=a=null)};return(...l)=>{const r=(new Date).getTime();s||!1!==n.leading||(s=r);const u=t-(r-s);i=this,a=l,u<=0||u>t?(o&&(clearTimeout(o),o=null),s=r,e.apply(i,a),o||(i=a=null)):o||!1===n.trailing||(o=setTimeout(c,u))}},sidebarPaddingR:()=>{const e=window.innerWidth,t=document.body.clientWidth,n=e-t;e!==t&&(document.body.style.paddingRight=n+"px")},snackbarShow:(e,t=!1,n=2e3,o=!1)=>{const{position:i,bgLight:a,bgDark:s}=GLOBAL_CONFIG.Snackbar,c="light"===document.documentElement.getAttribute("data-theme")?a:s;document.querySelector(":root").style.setProperty("--anzhiyu-snackbar-time",n+"ms"),Snackbar.show({text:e,backgroundColor:c,onActionClick:t,actionText:o,showAction:o,duration:n,pos:i,customClass:"snackbar-css"})},loadComment:(e,t)=>{if("IntersectionObserver"in window){const n=new IntersectionObserver(e=>{e[0].isIntersecting&&(t(),n.disconnect())},{threshold:[0]});n.observe(e)}else t()},scrollToDest:(e,t=500)=>{const n=window.pageYOffset;if("scrollBehavior"in document.documentElement.style)return void window.scrollTo({top:e,behavior:"smooth"});let o=null;e=+e,window.requestAnimationFrame(function i(a){o=o||a;const s=a-o;n<e?window.scrollTo(0,(e-n)*s/t+n):window.scrollTo(0,n-(n-e)*s/t),s<t?window.requestAnimationFrame(i):window.scrollTo(0,e)})},initJustifiedGallery:function(e){const t=e=>{anzhiyu.isHidden(e)||fjGallery(e,{itemSelector:".fj-gallery-item",rowHeight:e.getAttribute("data-rowHeight"),gutter:4,onJustify:function(){this.$container.style.opacity="1"}})};0===Array.from(e).length?t(e):e.forEach(e=>{t(e)})},animateIn:(e,t)=>{e.style.display="block",e.style.animation=t},animateOut:(e,t)=>{e.addEventListener("animationend",function t(){e.style.display="",e.style.animation="",e.removeEventListener("animationend",t)}),e.style.animation=t},
/**
   * @param {*} selector
   * @param {*} eleType the type of create element
   * @param {*} options object key: value
   */
wrap:(e,t,n)=>{const o=document.createElement(t);for(const[e,t]of Object.entries(n))o.setAttribute(e,t);e.parentNode.insertBefore(o,e),o.appendChild(e)},isHidden:e=>0===e.offsetHeight&&0===e.offsetWidth,getEleTop:e=>{let t=e.offsetTop,n=e.offsetParent;for(;null!==n;)t+=n.offsetTop,n=n.offsetParent;return t},loadLightbox:e=>{const t=GLOBAL_CONFIG.lightbox;if("mediumZoom"===t){const t=mediumZoom(e);t.on("open",e=>{const n="dark"===document.documentElement.getAttribute("data-theme")?"#121212":"#fff";t.update({background:n})})}"fancybox"===t&&(Array.from(e).forEach(e=>{if("A"!==e.parentNode.tagName){const t=e.dataset.lazySrc||e.src,n=e.title||e.alt||"";anzhiyu.wrap(e,"a",{href:t,"data-fancybox":"gallery","data-caption":n,"data-thumb":t})}}),window.fancyboxRun||(Fancybox.bind("[data-fancybox]",{Hash:!1,Thumbs:{autoStart:!1}}),window.fancyboxRun=!0))},setLoading:{add:e=>{e.insertAdjacentHTML("afterend",'\n        <div class="loading-container">\n          <div class="loading-item">\n            <div></div><div></div><div></div><div></div><div></div>\n          </div>\n        </div>\n      ')},remove:e=>{e.nextElementSibling.remove()}},updateAnchor:e=>{if(e!==window.location.hash){e||(e=location.pathname);const t=GLOBAL_CONFIG_SITE.title;window.history.replaceState({url:location.href,title:t},t,e)}},getScrollPercent:(e,t)=>{const n=t.clientHeight,o=document.documentElement.clientHeight,i=(e-t.offsetTop)/(n>o?n-o:document.documentElement.scrollHeight-o),a=Math.round(100*i);return a>100?100:a<=0?0:a},addGlobalFn:(e,t,n=!1,o=window)=>{const i=o.globalFn||{},a=i[e]||{};n&&a[n]||(a[n=n||Object.keys(a).length]=t,i[e]=a,o.globalFn=i)},addEventListenerPjax:(e,t,n,o=!1)=>{e.addEventListener(t,n,o),anzhiyu.addGlobalFn("pjax",()=>{e.removeEventListener(t,n,o)})},removeGlobalFnEvent:(e,t=window)=>{const{globalFn:n={}}=t,o=n[e]||{},i=Object.keys(o);i.length&&(i.forEach(e=>{o[e]()}),delete t.globalFn[e])},
//更改主题色
changeThemeMetaColor:function(e){
// console.info(`%c ${color}`, `font-size:36px;color:${color};`);
null!==themeColorMeta&&themeColorMeta.setAttribute("content",e)},
//顶栏自适应主题色
initThemeColor:function(){let e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-bar-background").trim().replace('"',"").replace('"',"");if((window.scrollY||document.documentElement.scrollTop)>26){if(anzhiyu.is_Post()&&(e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-meta-theme-post-color").trim().replace('"',"").replace('"',"")),themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}else{if(themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}},
//是否是文章页
is_Post:function(){//获取url
return window.location.href.indexOf("/posts/")>=0},
//监测是否在页面开头
addNavBackgroundInit:function(){var e=0,t=0;$bodyWrap&&(e=$bodyWrap.scrollTop),document.documentElement&&(t=document.documentElement.scrollTop),0!=(e-t>0?e:t)&&(pageHeaderEl.classList.add("nav-fixed"),pageHeaderEl.classList.add("nav-visible"))},
// 下载图片
downloadImage:function(e,t){
//下载图片地址和图片名
rm.hideRightMenu(),0==rm.downloadimging?(rm.downloadimging=!0,anzhiyu.snackbarShow("正在下载中，请稍后",!1,1e4),setTimeout(function(){let n=new Image;
// 解决跨域 Canvas 污染问题
n.setAttribute("crossOrigin","anonymous"),n.onload=function(){let e=document.createElement("canvas");e.width=n.width,e.height=n.height,e.getContext("2d").drawImage(n,0,0,n.width,n.height);let o=e.toDataURL("image/png"),i=document.createElement("a"),a=new MouseEvent("click");//得到图片的base64编码数据
// 创建一个单击事件
i.download=t||"photo",// 设置图片名称
i.href=o,// 将生成的URL设置为a.href属性
i.dispatchEvent(a)},n.src=e,anzhiyu.snackbarShow("图片已添加盲水印，请遵守版权协议"),rm.downloadimging=!1},"10000")):anzhiyu.snackbarShow("有正在进行中的下载，请稍后再试")},
//禁止图片右键单击
stopImgRightDrag:function(){for(var e=document.getElementsByTagName("img"),t=0;t<e.length;t++)e[t].addEventListener("dragstart",function(){return!1})},
//滚动到指定id
scrollTo:function(e){var t=document.querySelector(e).offsetTop;window.scrollTo(0,t-80)},
//隐藏侧边栏
hideAsideBtn:()=>{
// Hide aside
const e=document.documentElement.classList;e.contains("hide-aside")?saveToLocal.set("aside-status","show",2):saveToLocal.set("aside-status","hide",2),e.toggle("hide-aside"),e.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},
// 热评切换
switchCommentBarrage:function(){let e=document.querySelector(".comment-barrage");e&&("flex"===window.getComputedStyle(e).display?(e.style.display="none",anzhiyu.snackbarShow("✨ 已关闭评论弹幕"),document.querySelector(".menu-commentBarrage-text").textContent="显示热评",document.querySelector("#consoleCommentBarrage").classList.remove("on"),localStorage.setItem("commentBarrageSwitch","false")):(e.style.display="flex",document.querySelector(".menu-commentBarrage-text").textContent="关闭热评",document.querySelector("#consoleCommentBarrage").classList.add("on"),anzhiyu.snackbarShow("✨ 已开启评论弹幕"),localStorage.removeItem("commentBarrageSwitch"))),rm&&rm.hideRightMenu()},initPaginationObserver:()=>{const e=document.getElementById("post-comment"),t=document.getElementById("pagination");e&&t&&new IntersectionObserver(e=>{const n=document.querySelector(".comment-barrage");e.forEach(e=>{e.isIntersecting?(t.classList.add("show-window"),n&&(n.style.bottom="-200px")):(t.classList.remove("show-window"),n&&(n.style.bottom="0px"))})}).observe(e)},
// 初始化即刻
initIndexEssay:function(){document.getElementById("bbTimeList")&&setTimeout(()=>{let e=new Swiper(".essay_bar_swiper_container",{passiveListeners:!0,direction:"vertical",loop:!0,autoplay:{disableOnInteraction:!0,delay:3e3},mousewheel:!0}),t=document.getElementById("bbtalk");null!==t&&(t.onmouseenter=function(){e.autoplay.stop()},t.onmouseleave=function(){e.autoplay.start()})},100)},scrollByMouseWheel:function(e,t){e.addEventListener("mousewheel",function(t){e.scrollLeft-=t.wheelDelta/2,t.preventDefault()},{passive:!1}),t&&(t.classList.add("selected"),e.scrollLeft=t.offsetLeft-e.offsetLeft-(e.offsetWidth-t.offsetWidth)/2)},
// catalog激活
catalogActive:function(){const e=document.getElementById("catalog-list");if(e){const t=decodeURIComponent(window.location.pathname),n=e.querySelectorAll(".catalog-list-item");let o=null;n.forEach(e=>{t.startsWith(e.id)&&(o=e)}),anzhiyu.scrollByMouseWheel(e,o)}},
// Page Tag 激活
tagsPageActive:function(){const e=document.getElementById("tag-page-tags");if(e){const t=document.getElementById(decodeURIComponent(window.location.pathname));anzhiyu.scrollByMouseWheel(e,t)}},
// 修改时间显示"最近"
diffDate:function(e,t=!1,n=!1){const o=new Date,i=new Date(e),a=o.getTime()-i.getTime(),s=6e4,c=36e5,l=24*c,r=30*l;let u;if(t){const e=a/l,t=a/c,n=a/s;u=a/r>=1?i.toLocaleDateString().replace(/\//g,"-"):e>=1?parseInt(e)+" "+GLOBAL_CONFIG.date_suffix.day:t>=1?parseInt(t)+" "+GLOBAL_CONFIG.date_suffix.hour:n>=1?parseInt(n)+" "+GLOBAL_CONFIG.date_suffix.min:GLOBAL_CONFIG.date_suffix.just}else if(n){const e=a/l,t=a/c,n=a/s;u=a/r>=1?i.toLocaleDateString().replace(/\//g,"-"):e>=1&&e<=3?parseInt(e)+" "+GLOBAL_CONFIG.date_suffix.day:e>3?i.getMonth()+1+"/"+i.getDate():t>=1?parseInt(t)+" "+GLOBAL_CONFIG.date_suffix.hour:n>=1?parseInt(n)+" "+GLOBAL_CONFIG.date_suffix.min:GLOBAL_CONFIG.date_suffix.just}else u=parseInt(a/l);return u},
// 修改即刻中的时间显示
changeTimeInEssay:function(){document.querySelector("#bber")&&document.querySelectorAll("#bber time").forEach(function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,!0),t.style.display="inline"})},
// 修改相册集中的时间
changeTimeInAlbumDetail:function(){document.querySelector("#album_detail")&&document.querySelectorAll("#album_detail time").forEach(function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,!0),t.style.display="inline"})},
// 刷新瀑布流
reflashEssayWaterFall:function(){const e=document.getElementById("waterfall");e&&setTimeout(function(){waterfall(e),e.classList.add("show")},800)},sayhi:function(){const e=document.getElementById("author-info__sayhi");e&&(e.innerHTML=(()=>{const e=(new Date).getHours();let t="";return e>=0&&e<=5?t="睡个好觉，保证精力充沛":e>5&&e<=10?t="一日之计在于晨":e>10&&e<=14?t="吃饱了才有力气干活":e>14&&e<=18?t="集中精力，攻克难关":e>18&&e<=24&&(t="不要太劳累了，早睡更健康"),t})())},
// 友链注入预设评论
addFriendLink(){var e=document.getElementsByClassName("el-textarea__inner")[0];if(!e)return;const t=new Event("input",{cancelable:!0,bubbles:!0});e.value=this.getConfigIfPresent(GLOBAL_CONFIG.linkPageTop,"addFriendPlaceholder","昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n"),e.dispatchEvent(t),e.focus(),e.setSelectionRange(-1,-1)},
// 获取配置，如果为空则返回默认值
getConfigIfPresent:function(e,t,n){return e&&e.hasOwnProperty(t)&&e[t]?e[t]:n},
//切换音乐播放状态
musicToggle:function(e=!0){anzhiyu_musicFirst||(anzhiyu.musicBindEvent(),anzhiyu_musicFirst=!0);anzhiyu_musicPlaying?(navMusicEl.classList.remove("playing"),document.getElementById("menu-music-toggle").innerHTML='<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>',document.getElementById("nav-music-hoverTips").innerHTML="音乐已暂停",document.querySelector("#consoleMusic").classList.remove("on"),anzhiyu_musicPlaying=!1,navMusicEl.classList.remove("stretch")):(navMusicEl.classList.add("playing"),document.getElementById("menu-music-toggle").innerHTML='<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>',document.querySelector("#consoleMusic").classList.add("on"),anzhiyu_musicPlaying=!0,navMusicEl.classList.add("stretch")),e&&document.querySelector("#nav-music meting-js").aplayer.toggle(),rm&&rm.hideRightMenu()},
// 音乐伸缩
musicTelescopic:function(){navMusicEl.classList.contains("stretch")?navMusicEl.classList.remove("stretch"):navMusicEl.classList.add("stretch")},
//音乐上一曲
musicSkipBack:function(){navMusicEl.querySelector("meting-js").aplayer.skipBack(),rm&&rm.hideRightMenu()},
//音乐下一曲
musicSkipForward:function(){navMusicEl.querySelector("meting-js").aplayer.skipForward(),rm&&rm.hideRightMenu()},
//获取音乐中的名称
musicGetName:function(){for(var e=document.querySelectorAll(".aplayer-title"),t=[],n=e.length-1;n>=0;n--)t[n]=e[n].innerText;return t[0]},
//初始化console图标
initConsoleState:function(){document.documentElement.classList.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},
// 显示打赏中控台
rewardShowConsole:function(){
// 判断是否为赞赏打开控制台
consoleEl.classList.add("reward-show"),anzhiyu.initConsoleState()},
// 显示中控台
showConsole:function(){consoleEl.classList.add("show"),anzhiyu.initConsoleState()},
//隐藏中控台
hideConsole:function(){consoleEl.classList.contains("show")?
// 如果是一般控制台，就关闭一般控制台
consoleEl.classList.remove("show"):consoleEl.classList.contains("reward-show")&&
// 如果是打赏控制台，就关闭打赏控制台
consoleEl.classList.remove("reward-show");
// 获取center-console元素
const e=document.getElementById("center-console");
// 检查center-console是否被选中
e.checked&&(
// 取消选中状态
e.checked=!1)},
// 取消加载动画
hideLoading:function(){document.getElementById("loading-box").classList.add("loaded")},
// 将音乐缓存播放
cacheAndPlayMusic(){let e=localStorage.getItem("musicData");if(e){e=JSON.parse(e);if((new Date).getTime()-e.timestamp<864e5)
// 如果缓存的数据没有过期，直接使用
return void anzhiyu.playMusic(e.songs)}
// 否则重新从服务器获取数据
fetch("/json/music.json").then(e=>e.json()).then(e=>{const t={timestamp:(new Date).getTime(),songs:e};localStorage.setItem("musicData",JSON.stringify(t)),anzhiyu.playMusic(e)})},
// 播放音乐
playMusic(e){const t=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,n=e[Math.floor(Math.random()*e.length)],o=t.list.audios;if(selectRandomSong.includes(n.name)){
// 随机到的歌曲已经在播放列表中了
// 直接继续随机直到随机到没有随机过的歌曲，如果全部随机过了就切换到对应的歌曲播放即可
let i=!1;for(;!i;){const n=e[Math.floor(Math.random()*e.length)];
// 如果全部歌曲都已被随机过，跳出循环
if(selectRandomSong.includes(n.name)||(t.list.add([n]),t.list.switch(o.length),selectRandomSong.push(n.name),i=!0),selectRandomSong.length===e.length)break}if(!i){
// 如果全部歌曲都已被随机过，切换到对应的歌曲播放
const e=o.findIndex(e=>e.name===n.name);-1!=e&&t.list.switch(e)}}else
// 如果随机到的歌曲已经未被随机到过，就添加进metingAplayer.list
t.list.add([n]),
// 播放最后一首(因为是添加到了最后)
t.list.switch(o.length),
// 添加到已被随机的歌曲列表
selectRandomSong.push(n.name);console.info("已随机歌曲：",selectRandomSong,"本次随机歌曲：",n.name)},
// 音乐节目切换背景
changeMusicBg:function(e=!0){const t=document.getElementById("an_music_bg");if(e){
// player listswitch 会进入此处
const e=document.querySelector("#anMusic-page .aplayer-pic");t.style.backgroundImage=e.style.backgroundImage}else{
// 第一次进入，绑定事件，改背景
let e=setInterval(()=>{
// 确保player加载完成
document.querySelector("#anMusic-page .aplayer-pic")&&(clearInterval(e),
// 绑定事件
anzhiyu.addEventListenerMusic(),
// 确保第一次能够正确替换背景
anzhiyu.changeMusicBg(),
// 暂停nav的音乐
document.querySelector("#nav-music meting-js").aplayer&&!document.querySelector("#nav-music meting-js").aplayer.audio.paused&&anzhiyu.musicToggle())},100)}},
// 获取自定义播放列表
getCustomPlayList:function(){if(!window.location.pathname.startsWith("/music/"))return;const e=new URLSearchParams(window.location.search),t=document.getElementById("anMusic-page-meting");if(e.get("id")&&e.get("server")){const n=e.get("id"),o=e.get("server");t.innerHTML=`<meting-js id="${n}" server=${o} type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`}else t.innerHTML='<meting-js id="8152976493" server="netease" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>';anzhiyu.changeMusicBg(!1)},
//隐藏今日推荐
hideTodayCard:function(){if(document.getElementById("todayCard")){document.getElementById("todayCard").classList.add("hide");document.querySelector(".topGroup").querySelectorAll(".recent-post-item").forEach(e=>{e.style.display="flex"})}},
// 监听音乐背景改变
addEventListenerMusic:function(){const e=document.getElementById("anMusic-page"),t=e.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu"),n=e.querySelector("#anMusicBtnGetSong"),o=e.querySelector("#anMusicRefreshBtn"),i=e.querySelector("#anMusicSwitching"),a=e.querySelector("meting-js").aplayer;
//初始化音量
a.volume(.8,!0),a.on("loadeddata",function(){anzhiyu.changeMusicBg()}),t.addEventListener("click",function(){document.getElementById("menu-mask").style.display="block",document.getElementById("menu-mask").style.animation="0.5s ease 0s 1 normal none running to_show",e.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"}),document.getElementById("menu-mask").addEventListener("click",function t(){"/music/"==window.location.pathname?e.querySelector(".aplayer-list").classList.remove("aplayer-list-hide"):document.getElementById("menu-mask").removeEventListener("click",t)}),
// 监听增加单曲按钮
n.addEventListener("click",()=>{if(changeMusicListFlag){const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,t=e.list.audios,n=Math.floor(Math.random()*t.length);
// 随机播放一首
e.list.switch(n)}else anzhiyu.cacheAndPlayMusic()}),o.addEventListener("click",()=>{localStorage.removeItem("musicData"),anzhiyu.snackbarShow("已移除相关缓存歌曲")}),i.addEventListener("click",()=>{anzhiyu.changeMusicList()}),
// 默认加载的歌单
"custom"===GLOBAL_CONFIG.music_page_default&&anzhiyu.changeMusicList(),
// 监听键盘事件
//空格控制音乐
document.addEventListener("keydown",function(e){
//暂停开启音乐
"Space"===e.code&&(e.preventDefault(),a.toggle()),
//切换下一曲
39===e.keyCode&&(e.preventDefault(),a.skipForward()),
//切换上一曲
37===e.keyCode&&(e.preventDefault(),a.skipBack()),
//增加音量
38===e.keyCode&&musicVolume<=1&&(musicVolume+=.1,a.volume(musicVolume,!0)),
//减小音量
40===e.keyCode&&musicVolume>=0&&(musicVolume+=-.1,a.volume(musicVolume,!0))})},
// 切换歌单
changeMusicList:async function(){const e=document.getElementById("anMusic-page").querySelector("meting-js").aplayer,t=(new Date).getTime(),n=JSON.parse(localStorage.getItem("musicData"))||{timestamp:0};let o=[];if(changeMusicListFlag)o=defaultPlayMusicList;else
// 如果缓存的数据没有过期，直接使用
if(
// 保存当前默认播放列表，以使下次可以切换回来
defaultPlayMusicList=e.list.audios,t-n.timestamp<864e5)o=n.songs;else{
// 否则重新从服务器获取数据
const e=await fetch("/json/music.json");o=await e.json(),n.timestamp=t,n.songs=o,localStorage.setItem("musicData",JSON.stringify(n))}
// 清除当前播放列表并添加新的歌曲
e.list.clear(),e.list.add(o),
// 切换标志位
changeMusicListFlag=!changeMusicListFlag},
// 控制台音乐列表监听
addEventListenerConsoleMusicList:function(){const e=document.getElementById("nav-music");e&&e.addEventListener("click",t=>{const n=e.querySelector(".aplayer-list"),o=e.querySelector("div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg");t.target!=o&&n.classList.contains("aplayer-list-hide")&&n.classList.remove("aplayer-list-hide")})},
// 监听按键 - 页码跳转
toPage:function(){var e=document.getElementById("toPageText"),t=document.getElementById("toPageButton"),n=document.querySelectorAll(".page-number"),o=Number(e.value),i=1;
// 获取最大页码，确保在分页元素不存在或为空时有默认值
if(n&&n.length>0&&
// 遍历所有分页数字，找出最大值（避免分页显示不完整导致的问题）
n.forEach(function(e){var t=Number(e.textContent);!isNaN(t)&&t>i&&(i=t)}),!isNaN(o)&&o>=1&&Number.isInteger(o)){
// 确保页码不超过最大页码
var a=o>i?i:o,s="/page/"+a+"/#content-inner";t.href=1===a?"/":s}else t.href="javascript:void(0);"},
//删除多余的class
removeBodyPaceClass:function(){document.body.className="pace-done"},
// 修改body的type类型以适配css
setValueToBodyType:function(){const e=document.getElementById("page-type").value;// 获取input元素
// 获取input的value值
document.body.dataset.type=e},
//匿名评论
addRandomCommentInfo:function(){
// 从形容词数组中随机取一个值
const e=`${adjectives[Math.floor(Math.random()*adjectives.length)]}${vegetablesAndFruits[Math.floor(Math.random()*vegetablesAndFruits.length)]}`;
// 从蔬菜水果动物名字数组中随机取一个值
!function(){for(var t=["#author","input[name='comname']","#inpName","input[name='author']","#ds-dialog-name","#name","input[name='nick']","#comment_author"],n=["#mail","#email","input[name='commail']","#inpEmail","input[name='email']","#ds-dialog-email","input[name='mail']","#comment_email"],o=0;o<t.length;o++){var i=document.querySelector(t[o]);if(null!=i){i.value=e,i.dispatchEvent(new Event("input")),i.dispatchEvent(new Event("change"));break}}for(var a=0;a<n.length;a++){var s=document.querySelector(n[a]);if(null!=s){s.value=visitorMail,s.dispatchEvent(new Event("input")),s.dispatchEvent(new Event("change"));break}}}();var t=document.getElementsByClassName("el-textarea__inner")[0];t.focus(),t.setSelectionRange(-1,-1)},
// 跳转开往
totraveling:function(){anzhiyu.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",e=>{e.style.opacity=0,travellingsTimer&&clearTimeout(travellingsTimer)},5e3,"取消"),travellingsTimer=setTimeout(function(){window.open("https://www.travellings.cn/go.html","_blank")},"5000")},
// 工具函数替换字符串
replaceAll:function(e,t,n){return e.split(t).join(n)},
// 音乐绑定事件
musicBindEvent:function(){document.querySelector("#nav-music .aplayer-music").addEventListener("click",function(){anzhiyu.musicTelescopic()}),document.querySelector("#nav-music .aplayer-button").addEventListener("click",function(){anzhiyu.musicToggle(!1)})},
// 判断是否是移动端
hasMobile:function(){let e=!1;return(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||document.body.clientWidth<800)&&(
// 移动端
e=!0),e},
// 创建二维码
qrcodeCreate:function(){if(document.getElementById("qrcode")){document.getElementById("qrcode").innerHTML="";new QRCode(document.getElementById("qrcode"),{text:window.location.href,width:250,height:250,colorDark:"#000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H})}},
// 判断是否在el内
isInViewPortOfOne:function(e){if(!e)return;const t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;return e.offsetTop-document.documentElement.scrollTop<=t},
//添加赞赏蒙版
addRewardMask:function(){document.querySelector(".reward-main")&&(document.querySelector(".reward-main").style.display="flex",document.querySelector(".reward-main").style.zIndex="102",document.getElementById("quit-box").style.display="flex")},
// 移除赞赏蒙版
removeRewardMask:function(){document.querySelector(".reward-main")&&(document.querySelector(".reward-main").style.display="none",document.getElementById("quit-box").style.display="none")},keyboardToggle:function(){const e=anzhiyu_keyboard;if(e){document.querySelector("#consoleKeyboard").classList.remove("on"),anzhiyu_keyboard=!1}else{document.querySelector("#consoleKeyboard").classList.add("on"),anzhiyu_keyboard=!0}localStorage.setItem("keyboardToggle",e?"false":"true")},rightMenuToggle:function(){window.oncontextmenu?window.oncontextmenu=null:!window.oncontextmenu&&oncontextmenuFunction&&(window.oncontextmenu=oncontextmenuFunction)},switchConsole:()=>{
// switch console
const e=document.getElementById("console");
//初始化隐藏边栏
document.documentElement.classList.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on"),e.classList.contains("show")?e.classList.remove("show"):e.classList.add("show");const t=document.querySelector("#consoleKeyboard");t&&("true"===localStorage.getItem("keyboardToggle")?(t.classList.add("on"),anzhiyu_keyboard=!0):(t.classList.remove("on"),anzhiyu_keyboard=!1))},
// 定义 intersectionObserver 函数，并接收两个可选参数
intersectionObserver:function(e,t){let n;return()=>(n?
// 如果 observer 对象已经存在，则先取消对之前元素的观察
n.disconnect():n=new IntersectionObserver(n=>{n.forEach(n=>{n.intersectionRatio>0?e?.():t?.()})}),n)},
// CategoryBar滚动
scrollCategoryBarToRight:function(){
// 获取需要操作的元素
const e=document.getElementById("catalog-list"),t=document.getElementById("category-bar-next");
// 检查元素是否存在
if(e&&t){const n=e.clientWidth;
// 判断是否已经滚动到最右侧
e.scrollLeft+e.clientWidth+1>=e.scrollWidth?(
// 滚动到初始位置并更新按钮内容
e.scroll({left:0,behavior:"smooth"}),t.innerHTML='<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>'):
// 滚动到下一个视图
e.scrollBy({left:n,behavior:"smooth"})}else console.error("Element(s) not found: 'catalog-list' and/or 'category-bar-next'.")},
// 分类条
categoriesBarActive:function(){const e=decodeURIComponent(window.location.pathname),t=document.getElementById("category-bar");if(t)if("/"===e)t.querySelector("#首页").classList.add("select");else{if(!/\/categories\/.*?\//.test(e))return;const n=e.split("/")[2];t.querySelector(`#${n}`).classList.add("select")}},topCategoriesBarScroll:function(){const e=document.getElementById("category-bar-items");e&&e.addEventListener("mousewheel",function(e){const t=-e.wheelDelta/2;this.scrollLeft+=t,e.preventDefault()})},
// 切换菜单显示热评
switchRightClickMenuHotReview:function(){const e=document.getElementById("post-comment"),t=document.getElementById("menu-commentBarrage");t.style.display=e?"flex":"none"},
// 切换作者卡片状态文字
changeSayHelloText:function(){const e=GLOBAL_CONFIG.authorStatus.skills,t=document.getElementById("author-info__sayhi");
// 如果只有一个问候语，设置为默认值
if(1===e.length)return void(t.textContent=e[0]);let n=t.textContent,o=n;for(;o===n;)o=e[Math.floor(Math.random()*e.length)];t.textContent=o}},anzhiyuPopupManager={queue:[],processing:!1,Jump:!1,enqueuePopup(e,t,n,o=3e3){this.queue.push({title:e,tip:t,url:n,duration:o}),this.processing||this.processQueue()},processQueue(){if(this.queue.length>0&&!this.processing){this.processing=!0;const{title:e,tip:t,url:n,duration:o}=this.queue.shift();this.popupShow(e,t,n,o)}},popupShow(e,t,n,o){const i=document.getElementById("popup-window");if(!i)return;const a=i.querySelector(".popup-window-title"),s=i.querySelector(".popup-window-content").querySelector(".popup-tip");i.classList.contains("show-popup-window")&&i.classList.add("popup-hide"),
// 等待上一个弹窗完全消失
setTimeout(()=>{
// 移除之前的点击事件处理程序
i.removeEventListener("click",this.clickEventHandler),n?(window.pjax?(this.clickEventHandler=e=>{e.preventDefault(),pjax.loadUrl(n),i.classList.remove("show-popup-window"),i.classList.remove("popup-hide"),this.Jump=!0,
// 处理队列中的下一个弹出窗口
this.processing=!1,this.processQueue()},i.addEventListener("click",this.clickEventHandler)):(this.clickEventHandler=()=>{window.location.href=n},i.addEventListener("click",this.clickEventHandler)),i.classList.contains("no-url")&&i.classList.remove("no-url")):(i.classList.contains("no-url")||i.classList.add("no-url"),this.clickEventHandler=()=>{i.classList.add("popup-hide"),setTimeout(()=>{i.classList.remove("popup-hide"),i.classList.remove("show-popup-window")},1e3)},i.addEventListener("click",this.clickEventHandler)),i.classList.contains("popup-hide")&&i.classList.remove("popup-hide"),i.classList.add("show-popup-window"),a.textContent=e,s.textContent=t},800),setTimeout(()=>{n&&!this.Jump&&(this.Jump=!1),i.classList.contains("popup-hide")||""==i.className||i.classList.add("popup-hide"),
// 处理队列中的下一个弹出窗口
this.processing=!1,this.processQueue()},o)}};