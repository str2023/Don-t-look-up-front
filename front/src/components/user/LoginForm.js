import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, TextField, Button } from '@mui/material';
import { useSnackbar } from 'notistack';

import * as Api from '../../lib/apis/api';

import logoBlue from '../../assets/로고-edited-1.png';
import { UserContext } from '../../contexts/context';

function LoginForm() {
  const { userState, dispatch } = useContext(UserContext);
  const { isLoggedIn } = userState;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  // useState로 email 상태를 생성.
  const [email, setEmail] = useState('');
  // useState로 password 상태를 생성.
  const [password, setPassword] = useState('');

  // regex를 이용해 email형태가 xxx@xxx.com인지 확인.
  const validateEmail = (emailAddress) =>
    emailAddress
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

  // 위 validateEmail 함수를 통해 이메일 형태가 맞는지를 확인.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 6글자 이상인지 확인.
  const isPasswordValid = password.length >= 6;
  //
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post('/user/login', { email, password });
      const user = res.data;
      // JWT 토큰은 유저 정보의 token.
      const jwtToken = user.token;
      // jwtToken 값 확인
      console.log('jwtToken:', jwtToken);
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장.
      sessionStorage.setItem('userToken', jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태 생성.
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
      // 메인 페이지로 이동.
      navigate('/main', { replace: true });
    } catch (err) {
      console.log('로그인에 실패하였습니다.\n', err);
      enqueueSnackbar(`${err.response.data}`, { variant: 'error' });
    }
  };

  // const kakaoKey = process.env.CLIENT_ID;
  // const redirectLoginUrl = process.env.REDIRECT_LOGIN_URI;
  // const KAKAO_AUTH_LOGIN_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirectLoginUrl}&response_type=code`;

  return (
    <Container>
      <Grid container justifyContent="center" mt={5}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box display="flex" justifyContent="center">
            <Link to="/">
              <img src={logoBlue} alt="logo purple" style={{ width: '360px', margin: '4vh auto' }} />
            </Link>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              id="loginEmail"
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>이메일 주소</span>}
              type="email"
              autoComplete="on"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isEmailValid && email !== ''}
              helperText={!isEmailValid && email !== '' ? '이메일 형식이 올바르지 않습니다.' : ''}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="loginPassword"
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>비밀번호</span>}
              type="password"
              autoComplete="on"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!isPasswordValid && password !== ''}
              helperText={!isPasswordValid && password !== '' ? '비밀번호는 6글자 이상입니다.' : ''}
              margin="normal"
              variant="outlined"
            />
            <Grid container justifyContent="center" mt={3}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isFormValid}
                style={{ fontFamily: 'GmarketSansMedium', fontSize: '12pt', borderRadius: '20px', width: '12vh', backgroundColor: '#42bff5' }}
              >
                로그인
              </Button>
            </Grid>
            <Grid container justifyContent="center" mt={3}>
              <Button
                variant="outlined"
                onClick={() => navigate('/register')}
                style={{ fontFamily: 'GmarketSansMedium', fontSize: '12pt', borderRadius: '20px', width: '12vh' }}
              >
                회원가입
              </Button>
            </Grid>
          </form>
          {/* <Grid item>
            <div>
              <a id="custom-login-btn" href={KAKAO_AUTH_LOGIN_URI}>
                <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" alt="카카오 계정으로 로그인하기 버튼" width="222" />
              </a>
            </div>
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
