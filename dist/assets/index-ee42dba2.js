import{r as c,q as k,o as r,c as m,u as o,a as e,t as l,b as u,F as h,d as g}from"./index-5d6a208e.js";const f=e("div",null,"홈화면",-1),v=e("div",null,"메타태그 테스트용",-1),x={key:0},b=e("h3",{class:"font-bold text-2xl"},"카카오톡으로 로그인 되었습니다",-1),y={key:1},N=e("h3",{class:"font-bold text-2xl"},"네이버로 로그인 되었습니다",-1),E={__name:"index",setup(K){c({access_token:null,expires_in:null,refresh_token:null,refresh_token_expires_in:null,scope:null,token_type:null});let a=c({email:null,nickname:null}),n=c({email:null,mobile:null,nickname:null}),_=c({desc:"vue-meta description을 data로 받아서 쓸 수 있는가???"});const d=t=>{g.get("https://openapi.naver.com/v1/nid/me",{headers:{Authorization:"Bearer "+t}}).then(i=>{const s=i.data.response;n.email=s.email,n.mobile=s.mobile,n.nickname=s.nickname}).catch(i=>{console.log(i)})},p=()=>{window.Kakao.API.request({url:"/v2/user/me"}).then(function(t){a.email=t.kakao_account.email,a.nickname=t.kakao_account.profile.nickname}).catch(function(t){console.log(t)})};return localStorage.getItem("KAKAO_TOKEN")?p():localStorage.getItem("NAVER_TOKEN")&&d(localStorage.getItem("NAVER_TOKEN")),k({title:"index 페이지",meta:[{vmid:"description",name:"description",content:_.desc},{property:"og:title",content:"index 페이지 meta title"},{property:"og:image",content:"https://cdn.pixabay.com/photo/2021/02/10/17/20/robin-6002851_960_720.jpg"},{property:"og:description",content:"인덱스 페이지 OG 여기가 홈화면 블라브라라ㅏㅏ"}]}),(t,i)=>(r(),m(h,null,[f,v,o(a).email?(r(),m("div",x,[b,e("p",null,"email : "+l(o(a).email),1),e("p",null,"nickname : "+l(o(a).nickname),1)])):u("",!0),o(n).email?(r(),m("div",y,[N,e("ul",null,[e("li",null,"email : "+l(o(n).email),1),e("li",null,"mobile : "+l(o(n).mobile),1),e("li",null,"nickname : "+l(o(n).nickname),1)])])):u("",!0)],64))}};export{E as default};
