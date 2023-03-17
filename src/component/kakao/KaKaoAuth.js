const CLIENT_ID = '608f70d5fdc3154ead7c92c6d72fbe38'
const REDIRECT_URI =
    'http://localhost:3000/auth/kakao/callback'

export const KAKAO_AUTH_URL =
    `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`