<template>
    <div>홈화면</div>
    <div>메타태그 테스트용</div>
    <div v-if="kakao_account.email">
        <h3 class="font-bold text-2xl">카카오톡으로 로그인 되었습니다</h3>
        <p>email : {{ kakao_account.email }}</p>
        <p>nickname : {{ kakao_account.nickname }}</p>
    </div>
    <div v-if="naver_account.email">
        <h3 class="font-bold text-2xl">네이버로 로그인 되었습니다</h3>
        <ul>
            <li>email : {{ naver_account.email }}</li>
            <li>mobile : {{ naver_account.mobile }}</li>
            <li>nickname : {{ naver_account.nickname }}</li>
        </ul>
    </div>
</template>

<script setup>
import axios from "axios";
import { useMeta } from "vue-meta";
import { reactive, onMounted } from "vue";
let data = reactive({
    access_token: null,
    expires_in: null,
    refresh_token: null,
    refresh_token_expires_in: null,
    scope: null,
    token_type: null,
});

let kakao_account = reactive({
    email: null,
    nickname: null,
});

let naver_account = reactive({
    email: null,
    mobile: null,
    nickname: null,
});

let dataForMeta = reactive({
    desc: "vue-meta description을 data로 받아서 쓸 수 있는가???",
});

// onMounted(() => {
//     loginCheck();
// });

const getNaverUserInfo = (token) => {
    axios
        .get("https://openapi.naver.com/v1/nid/me", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((res) => {
            const naver_user = res.data.response;
            /*
            response : {
                email:"email",
                id:"cryto id",
                mobile:"000-0000-0000",
                mobile_e164:"+820000000",
                nickname:"nickna***"
            }
            */
            naver_account.email = naver_user.email;
            naver_account.mobile = naver_user.mobile;
            naver_account.nickname = naver_user.nickname;
        })
        .catch((error) => {
            console.log(error);
        });
};

const getKakaoUserInfo = () => {
    window.Kakao.API.request({
        url: "/v2/user/me",
    })
        .then(function (response) {
            // 카카오톡 계정 동의한 내역만 나옴
            /* return json
                {
                    connected_at: 'string'
                    id: 123,
                    kakao_account:{
                        email: "카톡 email",
                        email_needs_agreement: false,
                        has_email: true,
                        is_email_valid: true,
                        is_email_varified: true
                    }
            */
            kakao_account.email = response.kakao_account.email;
            kakao_account.nickname = response.kakao_account.profile.nickname;
        })
        .catch(function (error) {
            console.log(error);
        });

    /* 이방법은 뭐여...  
        Kakao.Auth.login({
            success: function () {
                window.Kakao.API.request({
                    url: "/v2/user/me",
                    data: {
                        property_keys: ["kakao_account.email"],
                    },
                    success: async function (response) {
                        console.log(response);
                    },
                    fail: function (error) {
                        console.log(error);
                    },
                });
            },
            fail: function (error) {
                console.log(error);
            },
        }); */
};

// const loginCheck = () => {
if (localStorage.getItem("KAKAO_TOKEN")) {
    getKakaoUserInfo();
} else if (localStorage.getItem("NAVER_TOKEN")) {
    getNaverUserInfo(localStorage.getItem("NAVER_TOKEN"));
}
// };

// XXX: vue-meta test
useMeta({
    title: "index 페이지",
    meta: [
        {
            vmid: "description",
            name: "description",
            content: dataForMeta.desc,
        },
        { property: "og:title", content: `index 페이지 meta title` },
        {
            property: "og:image",
            content: `https://cdn.pixabay.com/photo/2021/02/10/17/20/robin-6002851_960_720.jpg`,
        },
        {
            property: "og:description",
            content: "인덱스 페이지 OG 여기가 홈화면 블라브라라ㅏㅏ",
        },
    ],
});
</script>

<style lang="scss" scoped></style>
