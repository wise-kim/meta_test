<template>
    <div>
        <div class="mt-16 text-center">
            <ul class="flex flex-col gap-5">
                <li class="font-bold text-lg py-2">SOCIAL SIGN IN</li>
                <li>
                    <button
                        class="bg-[#FEE500] text-black/[.85] w-3/5 h-12 py-2 grid grid-cols-3 m-auto items-center"
                        type="button"
                        @click="loginWithKakao"
                    >
                        <img class="w-6 m-auto" src="/imgs/btn_kakao.svg" />
                        <span class="col-span-2 text-left">
                            카카오톡으로 로그인하기
                        </span>
                    </button>
                </li>
                <li>
                    <button
                        class="bg-[#03C75A] text-white w-3/5 h-12 py-2 grid grid-cols-3 m-auto items-center"
                        type="button"
                        @click="loginWithNaver"
                    >
                        <img
                            class="w-10 m-auto mt-[-4px] align-middle"
                            src="/imgs/btn_naver.png"
                        />
                        <span class="col-span-2 text-left"> 네이버로 로그인하기 </span>
                    </button>
                </li>
            </ul>
        </div>

        <div>
            <h1 class="font-bold text-xl">
                {{ route.query.state == "naver" ? "네이버" : "카카오" }} 아이디로 로그인
                되었습니다
            </h1>
            <p>code : {{ route.query.code }}</p>
            <div v-if="data.access_token">
                {{ data }}
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
let data = reactive({
    access_token: null,
    expires_in: null,
    refresh_token: null,
    refresh_token_expires_in: null,
    scope: null,
    token_type: null,
});

// naverLogin.getLoginStatus(function (status) {
//     if (status) {
//         console.log(status);
//     }
// });

const route = useRoute();
const router = useRouter();
// XXX 네이버 SDK1번으로 로그인하면 바로 토큰 줌...? 근데 access_token앞에 #이 붙어서 route.query.access_token으로 받아올수가 없음ㅠ
if (window.location.href.includes("access_token")) {
    const NAVER_TOKEN = window.location.href.split("=")[1].split("&")[0];
    localStorage.setItem("NAVER_TOKEN", NAVER_TOKEN);
    router.push({ path: "/" });
} else if (route.query.state == "naver" && route.query.code) {
    axios
        .post("https://nid.naver.com/oauth2.0/token", null, {
            params: {
                grant_type: "authorization_code",
                client_id: "IgsfsyuqQGNjYLQgfKhP",
                client_secret: "nEgwJtvI_3",
                code: route.query.code,
                state: "naver",
            },
        })
        .then((res) => {
            // XXX 일단 바로 저장ㅋ
            localStorage.setItem("NAVER_TOKEN", res.data.access_token);
            router.push({ path: "/" });
        })
        .catch((error) => {
            console.log(error);
        });
} else {
    if (route.query.code) {
        // window.Kakao.Auth.setAccessToken(route.query.code);
        axios
            .post(
                "https://kauth.kakao.com/oauth/token",
                {
                    grant_type: "authorization_code",
                    client_id: "950db78a159f7088d9b428452f15a79c",
                    redirect_uri: "http://localhost:5173/signin",
                    code: route.query.code,
                },
                {
                    headers: {
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    },
                }
            )
            .then((res) => {
                const data = res.data;
                console.log("카톡 로그인 테스트", data);
                // 토큰 할당
                window.Kakao.Auth.setAccessToken(data.access_token);
                // XXX 일단 바로 저장ㅋ
                localStorage.setItem("KAKAO_TOKEN", data.access_token);
                router.push({ path: "/" });
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

// XXX: vue-meta test
useMeta({
    title: "Sign 페이지",
    meta: [
        { property: "og:title", content: `SignIn 페이지 meta title` },
        {
            property: "og:image",
            content: `https://cdn.pixabay.com/photo/2022/12/12/12/46/cat-7650987_960_720.jpg`,
        },
        {
            property: "og:description",
            content: "사인인 페이지 OG 여기가 집에가고싶다 ㅇ우어어아ㅓ옹",
        },
    ],
});
</script>

<style lang="scss" scoped></style>
