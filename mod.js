(()=>{function w(n,e,r){r/=100;let s=e*Math.min(r,1-r)/100,t=l=>{let i=(l+n/30)%12,a=r-s*Math.max(Math.min(i-3,9-i,1),-1);return Math.round(255*a)};return[t(0),t(8),t(4)]}function o(n,e={}){let r=`${e.b?"1;":""}${e.it?"3;":""}${e.ul?"4;":""}${e.fg?`38;2;${e.fg}`:""}${e.bg?`48;2;${e.bg};`:""}`;for(;r.endsWith(";");)r=r.slice(0,-1);return`\x1B[${r}m${n}\x1B[0m\x1B[0m`}function c(n,e,r,s,{b:t=!1,it:l=!1,ul:i=!1}={}){let a=[];for(let u=0;u<n.length;u++)a.push(o(n[u],{fg:w(e-12*u,r,s).join(";")+";",b:t,it:l,ul:i}));return a.join("")}var m=class{name;constructor(e){this.name=c(`[${e}]`,300,100,70,{b:!0})}nameMap={DEBUG:o("DEBUG",{it:!0,fg:"200;200;200;"}),INFO:o("INFO",{it:!0,fg:"50;255;160;"}),SUCCESS:o("SUCCESS",{it:!0,fg:"10;255;10;"}),WARN:o("WARN",{it:!0,b:!0,fg:"255;150;0;"}),ERROR:o("ERROR",{it:!0,b:!0,ul:!0,fg:"255;20;0;"}),FATAL:o("    FATAL    ",{it:!0,bg:"255;20;0;",b:!0})};write(e,r,s,t,l){let i=this.nameMap[s];if(!i){console.log(t,this.name,...l);return}console.log(t,this.name,i,...l)}},f=class n{constructor(e="aLog",r=n.LevelInfo){this.name=e;this.level=r;this.writer=new m(e)}static LevelDebug=0;static LevelInfo=100;static LevelWarn=200;static LevelError=300;static LevelFatal=400;writer;debug(...e){this.level<=n.LevelDebug&&this.writer.write(this.name,n.LevelDebug,"DEBUG",performance.now(),e)}info(...e){this.level<=n.LevelInfo&&this.writer.write(this.name,n.LevelInfo,"INFO",performance.now(),e)}success(...e){this.level<=n.LevelInfo&&this.writer.write(this.name,n.LevelInfo,"SUCCESS",performance.now(),e)}warn(...e){this.level<=n.LevelWarn&&this.writer.write(this.name,n.LevelWarn,"WARN",performance.now(),e)}error(...e){this.level<=n.LevelError&&this.writer.write(this.name,n.LevelError,"ERROR",performance.now(),e)}fatal(...e){this.level<=n.LevelFatal&&this.writer.write(this.name,n.LevelFatal,"FATAL",performance.now(),e)}shout(...e){this.writer.write(this.name,n.LevelFatal,"",performance.now(),e)}whisper(...e){this.writer.write(this.name,n.LevelInfo,"",performance.now(),e)}};})();