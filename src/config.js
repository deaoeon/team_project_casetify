const isLocal = window.location.hostname === 'localhost';
export const KAKAO_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/oauth/'
    : import.meta.env.VITE_KAKAO_REDIRECT_URI;
