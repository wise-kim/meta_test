import{_ as p,a as _}from"./btn_naver-d1b59e9d.js";import{r as h,f as g,g as m,d as r,o as u,c as d,a as e,t as c,u as n,b as f}from"./index-5d6a208e.js";const k={class:"mt-16 text-center"},y={class:"flex flex-col gap-5"},w=e("li",{class:"font-bold text-lg py-2"},"SOCIAL SIGN IN",-1),x=e("img",{class:"w-6 m-auto",src:p},null,-1),N=e("span",{class:"col-span-2 text-left"}," 카카오톡으로 로그인하기 ",-1),b=[x,N],v=e("img",{class:"w-10 m-auto mt-[-4px] align-middle",src:_},null,-1),E=e("span",{class:"col-span-2 text-left"}," 네이버로 로그인하기 ",-1),I=[v,E],K={class:"font-bold text-xl"},A={key:0},C={__name:"SignIn",setup(S){let i=h({access_token:null,expires_in:null,refresh_token:null,refresh_token_expires_in:null,scope:null,token_type:null});const s=g(),a=m();if(window.location.href.includes("access_token")){const t=window.location.href.split("=")[1].split("&")[0];localStorage.setItem("NAVER_TOKEN",t),a.push({path:"/"})}else s.query.state=="naver"&&s.query.code?r.post("https://nid.naver.com/oauth2.0/token",null,{params:{grant_type:"authorization_code",client_id:"IgsfsyuqQGNjYLQgfKhP",client_secret:"nEgwJtvI_3",code:s.query.code,state:"naver"}}).then(t=>{localStorage.setItem("NAVER_TOKEN",t.data.access_token),a.push({path:"/"})}).catch(t=>{console.log(t)}):s.query.code&&r.post("https://kauth.kakao.com/oauth/token",{grant_type:"authorization_code",client_id:"950db78a159f7088d9b428452f15a79c",redirect_uri:"http://localhost:5173/signin",code:s.query.code},{headers:{"Content-type":"application/x-www-form-urlencoded;charset=utf-8"}}).then(t=>{const o=t.data;console.log("카톡 로그인 테스트",o),window.Kakao.Auth.setAccessToken(o.access_token),localStorage.setItem("KAKAO_TOKEN",o.access_token),a.push({path:"/"})}).catch(t=>{console.log(t)});return useMeta({title:"Sign 페이지",meta:[{property:"og:title",content:"SignIn 페이지 meta title"},{property:"og:image",content:"https://cdn.pixabay.com/photo/2022/12/12/12/46/cat-7650987_960_720.jpg"},{property:"og:description",content:"사인인 페이지 OG 여기가 집에가고싶다 ㅇ우어어아ㅓ옹"}]}),(t,o)=>(u(),d("div",null,[e("div",k,[e("ul",y,[w,e("li",null,[e("button",{class:"bg-[#FEE500] text-black/[.85] w-3/5 h-12 py-2 grid grid-cols-3 m-auto items-center",type:"button",onClick:o[0]||(o[0]=(...l)=>t.loginWithKakao&&t.loginWithKakao(...l))},b)]),e("li",null,[e("button",{class:"bg-[#03C75A] text-white w-3/5 h-12 py-2 grid grid-cols-3 m-auto items-center",type:"button",onClick:o[1]||(o[1]=(...l)=>t.loginWithNaver&&t.loginWithNaver(...l))},I)])])]),e("div",null,[e("h1",K,c(n(s).query.state=="naver"?"네이버":"카카오")+" 아이디로 로그인 되었습니다 ",1),e("p",null,"code : "+c(n(s).query.code),1),n(i).access_token?(u(),d("div",A,c(n(i)),1)):f("",!0)])]))}};export{C as default};
