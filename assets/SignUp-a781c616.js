import{_ as l,a as i}from"./btn_naver-0213b6ac.js";import{e as a,q as c,o as d,c as r,a as t}from"./index-337dc0bb.js";const u={class:"mt-16 text-center"},_={class:"flex flex-col gap-5"},g=t("li",{class:"font-bold text-lg py-2"},"SOCIAL SIGN UP",-1),p={class:"w-3/5 h-12 m-auto"},h=t("img",{class:"w-6 m-auto",src:l},null,-1),m=t("span",{class:"col-span-2 text-left"}," 카카오톡으로 가입하기 ",-1),f=[h,m],k={class:"w-3/5 h-12 m-auto"},v=t("img",{class:"w-10 m-auto mt-[-4px] align-middle",src:i},null,-1),y=t("span",{class:"col-span-2 text-left"}," 네이버로 가입하기 ",-1),w=[v,y],x={class:"w-3/5 h-12 m-auto"},b=t("div",{id:"naver_id_login",class:"w-full h-full"},null,-1),I=t("img",{class:"w-10 m-auto mt-[-4px] align-middle",src:i},null,-1),A=t("span",{class:"col-span-2 text-left"}," 네이버sdk1 가입하기 ",-1),S=[I,A],C={class:"w-3/5 h-12 m-auto"},K=t("div",{id:"naverIdLogin",class:"w-full h-full",style:{display:"none"}},null,-1),L=t("img",{class:"w-10 m-auto mt-[-4px] align-middle",src:i},null,-1),N=t("span",{class:"col-span-2 text-left"}," 네이버sdk2 가입하기 ",-1),q=[L,N],Q={__name:"SignUp",setup(B){a(()=>{const o=new window.naver_id_login("IgsfsyuqQGNjYLQgfKhP","http://localhost:5173/signin"),s=o.getUniqState();o.setState(s),o.init_naver_id_login(),new naver.LoginWithNaverId({clientId:"IgsfsyuqQGNjYLQgfKhP",callbackUrl:"http://localhost:5173/signin",loginButton:{color:"green",type:3}}).init()});const e={kakao:()=>{(Kakao.Auth.getAccessToken()||localStorage.getItem("KAKAO_TOKEN"))&&(Kakao.API.request({url:"/v1/user/unlink",success:function(o){console.log("unlink:::",o)},fail:function(o){console.log(o)}}),Kakao.Auth.setAccessToken(void 0)),Kakao.Auth.authorize({redirectUri:"http://localhost:5173/signin"})},naver:()=>{location.replace(`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=IgsfsyuqQGNjYLQgfKhP&redirect_uri=${encodeURI("http://127.0.0.1:5173/signin")}&state=naver`)},naverSdk1:()=>{document.getElementById("naver_id_login").firstChild.click(),alert(naver_id_login.oauthParams.access_token)},naverSdk2:()=>{document.getElementById("naverIdLogin").firstChild.click()}};return c({title:"signup 페이지",meta:[{vmid:"description",name:"description",content:"회원가입 페이지 디스크립션라라라라"},{property:"og:title",content:"signup 페이지 meta title"},{property:"og:image",content:"https://cdn.pixabay.com/photo/2020/12/02/01/06/chipmunk-5795916_960_720.jpg"},{property:"og:description",content:"사인업페이지 OG 디스크립션 블라블라블라"}]}),(o,s)=>(d(),r("div",u,[t("ul",_,[g,t("li",p,[t("button",{class:"bg-[#FEE500] text-black/[.85] w-full h-full py-2 grid grid-cols-3 m-auto items-center",type:"button",onClick:s[0]||(s[0]=(...n)=>e.kakao&&e.kakao(...n))},f)]),t("li",k,[t("button",{class:"bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center",type:"button",onClick:s[1]||(s[1]=(...n)=>e.naver&&e.naver(...n))},w)]),t("li",x,[b,t("button",{class:"bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center",type:"button",style:{display:"none"},onClick:s[2]||(s[2]=(...n)=>e.naverSdk1&&e.naverSdk1(...n))},S)]),t("li",C,[K,t("button",{class:"bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center",type:"button",onClick:s[3]||(s[3]=(...n)=>e.naverSdk2&&e.naverSdk2(...n))},q)])])]))}};export{Q as default};