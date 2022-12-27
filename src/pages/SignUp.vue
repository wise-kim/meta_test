<template>
    <div class="mt-16 text-center">
        <ul class="flex flex-col gap-5">
            <li class="font-bold text-lg py-2">SOCIAL SIGN UP</li>
            <li class="w-4/5 h-12 m-auto">
                <button
                    class="bg-[#FEE500] text-black/[.85] w-full h-full py-2 grid grid-cols-3 m-auto items-center"
                    type="button"
                    @click="snsLogin.kakao"
                >
                    <img class="w-6 m-auto" src="/imgs/btn_kakao.svg" />
                    <span class="col-span-2 text-left"> 카카오톡으로 가입하기 </span>
                </button>
            </li>
            <li class="w-4/5 h-12 m-auto">
                <button
                    class="bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center"
                    type="button"
                    @click="snsLogin.naver"
                >
                    <img
                        class="w-10 m-auto mt-[-4px] align-middle"
                        src="/imgs/btn_naver.png"
                    />
                    <span class="col-span-2 text-left"> 네이버로 가입하기 </span>
                </button>
            </li>
            <li class="w-4/5 h-12 m-auto">
                <div id="naver_id_login" class="w-full h-full"></div>
                <button
                    class="bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center"
                    type="button"
                    style="display: none"
                    @click="snsLogin.naverSdk1"
                >
                    <img
                        class="w-10 m-auto mt-[-4px] align-middle"
                        src="/imgs/btn_naver.png"
                    />
                    <span class="col-span-2 text-left"> 네이버sdk1 가입하기 </span>
                </button>
            </li>
            <li class="w-4/5 h-12 m-auto">
                <div id="naverIdLogin" class="w-full h-full" style="display: none"></div>
                <button
                    class="bg-[#03C75A] text-white w-full h-full py-2 grid grid-cols-3 m-auto items-center"
                    type="button"
                    @click="snsLogin.naverSdk2"
                >
                    <img
                        class="w-10 m-auto mt-[-4px] align-middle"
                        src="/imgs/btn_naver.png"
                    />
                    <span class="col-span-2 text-left"> 네이버sdk2 가입하기 </span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import axios from "axios";
import { useMeta } from "vue-meta";
import { onMounted, reactive, ref } from "vue";

// SDK 버전 NAVER 로그인 버튼 커스텀 필요
onMounted(() => {
    const naver_id_login = new window.naver_id_login(
        import.meta.env.VITE_NAVER_KEY,
        "http://localhost:5173/signin"
    );
    const state = naver_id_login.getUniqState();
    naver_id_login.setState(state);
    naver_id_login.init_naver_id_login();
    // alert(naver_id_login.oauthParams.access_token);

    const naverIdLogin = new naver.LoginWithNaverId({
        clientId: import.meta.env.VITE_NAVER_KEY,
        callbackUrl: "http://localhost:5173/signin",
        loginButton: { color: "green", type: 3 },
    });
    naverIdLogin.init();
});

const snsLogin = {
    kakao: () => {
        // Kakao.init("5c284f0e6ca5060f49939407f23c4f19"); // 초기화를 여기서 하면 안되는데 그럼 자동로그인 방지를 어케하냐며....
        if (Kakao.Auth.getAccessToken() || localStorage.getItem("KAKAO_TOKEN")) {
            Kakao.API.request({
                url: "/v1/user/unlink",
                success: function (response) {
                    console.log("unlink:::", response);
                },
                fail: function (error) {
                    console.log(error);
                },
            });
            Kakao.Auth.setAccessToken(undefined);
        }

        Kakao.Auth.authorize({
            redirectUri: "http://localhost:5173/signin",
            // prompts: "login", // 기존로그인 여부와 상관없이 로그인시킬때
        });
    },

    // CORS있음 브라우저 설정 필수, run했을때 뜨는 정확한 url으로 redirect됨(ip인지 localhost 확인 필수)
    naver: () => {
        location.replace(
            `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${
                import.meta.env.VITE_NAVER_KEY
            }&redirect_uri=${encodeURI("http://127.0.0.1:5173/signin")}&state=naver`
        );

        /*
    axios
        .post("https://nid.naver.com/oauth2.0/authorize", null, {
            params: {
                response_type: "code",
                client_id: import.meta.env.VITE_NAVER_KEY,
                redirect_uri: encodeURI("http://127.0.0.1:5173/signin"),
                state: "naver",
            },
        })
        .then((res) => {
            const resdata = res.data;
            console.log(res);
            data.htmltest = resdata;
            // console.log("data:::", data); // XXX html으로 리턴되는데 이걸 어케 화면으로 바꾸지..?
        })
        .catch((error) => {
            console.log("error:::", error);
        });
        */
    },
    naverSdk1: () => {
        document.getElementById("naver_id_login").firstChild.click();
        alert(naver_id_login.oauthParams.access_token);
    },
    naverSdk2: () => {
        document.getElementById("naverIdLogin").firstChild.click();
    },
};

// XXX: vue-meta test
useMeta({
    title: "signup 페이지",
    meta: [
        {
            vmid: "description",
            name: "description",
            content: "회원가입 페이지 디스크립션라라라라",
        },
        { property: "og:title", content: `signup 페이지 meta title` },
        {
            property: "og:image",
            content: `https://cdn.pixabay.com/photo/2020/12/02/01/06/chipmunk-5795916_960_720.jpg`,
        },
        {
            property: "og:description",
            content: "사인업페이지 OG 디스크립션 블라블라블라",
        },
    ],
});
</script>

<style lang="css"></style>
