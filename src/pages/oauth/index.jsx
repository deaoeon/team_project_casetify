import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { KAKAO_REDIRECT_URI } from '../../config';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/modules/common/authSlice';

const index = () => {
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const getKakaoToken = async (code) => {
            try {
                const response = await fetch('https://kauth.kakao.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                        redirect_uri: KAKAO_REDIRECT_URI,
                        code,
                    }),
                });

                const data = await response.json();
                const { access_token } = data;
                if (access_token != '') {
                    dispatch(authActions.setLoginState(true));
                    dispatch(authActions.setLoginModalState(false));
                    navigate('/');
                }
            } catch (error) {
                console.error('토큰 요청 실패:', error);
            }
        };

        if (code) {
            getKakaoToken(code);
        }
    }, [code]);

    return <div>카카오 로그인 처리중...</div>;
};

export default index;
