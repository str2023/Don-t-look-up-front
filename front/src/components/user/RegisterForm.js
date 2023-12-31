/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Container, Grid, TextField, Button, Typography } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import logoBlue from '../../assets/로고-edited-1.png';

import * as Api from '../../lib/apis/api';

import logoPurple from '../../assets/Logo_purple.png';
import { UserContext } from '../../contexts/context';

function RegisterForm() {
  const { userState, dispatch } = useContext(UserContext);
  const { isLoggedIn } = userState;
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const registerWithKakao = () => {
    const kakaoKey = process.env.CLIENT_ID;
    const redirectRegisterUrl = process.env.REDIRECT_REGISTER_URI;
    const KAKAO_AUTH_REGISTER_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoKey}&redirect_uri=${redirectRegisterUrl}&response_type=code`;

    console.log(`카카오로그인 접속: ${KAKAO_AUTH_REGISTER_URI}`);
    return KAKAO_AUTH_REGISTER_URI;
  };

  // useState로 email 상태를 생성.
  const [email, setEmail] = useState('');

  // useState로 password 상태를 생성.
  const [password, setPassword] = useState('');

  // useState로 nickname 상태를 생성.
  const [nickname, setNickname] = useState('');

  // useState로 birthdate 상태를 생성.
  const [birthDate, setBirthDate] = useState('');

  // useState로 gender 상태를 생성.
  const [gender, setGender] = useState('');

  // 이메일이 xxx@xxx.com 형태인지 regex를 이용해 확인.
  const validateEmail = (emailAddress) =>
    emailAddress
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );

  // 위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인.
  const isEmailValid = validateEmail(email);

  // 비밀번호가 6글자 이상인지 여부를 확인.
  const isPasswordValid = password.length >= 6;

  // 닉네임이 2글자 이상인지 여부를 확인.
  const isNicknameValid = nickname.length >= 2;

  // 생일이 입력 되었는지 확인.
  const isBirthDateValid = birthDate !== '' && birthDate.match(/^\d{4}-\d{2}-\d{2}$/);

  // 성별이 입력 되었는지 확인
  const isGenderValid = gender === 'male' || gender === 'female';

  // 위 5개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid = isEmailValid && isPasswordValid && isNicknameValid && isBirthDateValid && isGenderValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/register" 엔드포인트로 post요청.
      await Api.post('/user/register', {
        email,
        password,
        nickname,
        birthDate,
        gender,
      }).catch((err) => {
        console.log(err);
        enqueueSnackbar(`${err.response.data}`, { variant: 'error' });
        throw new Error(err.response.data);
      });

      const res = await Api.post('/user/login', {
        email,
        password,
      }).catch((err) => {
        throw new Error(err.response.data);
      });

      console.log(res);

      if (!res) {
        throw new Error('Response from API is undefined');
      }

      const user = res.data;

      const jwtToken = user.token;
      sessionStorage.setItem('userToken', jwtToken);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      navigate('/login', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Box display="flex" justifyContent="center">
            <Link to="/">
              <img src={logoBlue} alt="logo purple" style={{ width: '360px', margin: '4vh auto' }} />
            </Link>
          </Box>
          <Typography variant="h5" align="center" mb={3} style={{ fontFamily: 'GmarketSansMedium' }}>
            회원가입
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              id="registerEmail"
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>이메일 주소</span>}
              type="email"
              fullWidth
              margin="normal"
              sx={{ fontFamily: 'GmarketSansMedium' }}
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!isEmailValid && email !== ''}
              helperText={!isEmailValid && email !== '' && '이메일 형식이 올바르지 않습니다.'}
            />

            <TextField
              id="registerPassword"
              sx={{ fontFamily: 'GmarketSans' }}
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>비밀번호</span>}
              type="password"
              fullWidth
              margin="normal"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!isPasswordValid && password !== ''}
              helperText={!isPasswordValid && password !== '' && '비밀번호는 6글자 이상으로 설정해 주세요.'}
            />

            <TextField
              id="registerNickname"
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>닉네임</span>}
              type="text"
              fullWidth
              margin="normal"
              autoComplete="off"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              error={!isNicknameValid && nickname !== ''}
              helperText={!isNicknameValid && nickname !== '' && '이름은 2글자 이상으로 설정해 주세요.'}
            />

            <TextField
              id="registerBirthDate"
              label={<span style={{ fontFamily: 'GmarketSansMedium' }}>생년월일</span>}
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              error={!isBirthDateValid && birthDate !== ''}
              helperText={!isBirthDateValid && birthDate !== '' && '날짜 형식이 올바르지 않습니다. (예시: yyyy-mm-dd)'}
            />

            <FormControl fullWidth margin="normal" error={!isGenderValid && gender !== ''}>
              <InputLabel id="registerGender" style={{ fontFamily: 'GmarketSansMedium' }}>
                Gender
              </InputLabel>
              <Select labelId="registerGender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                <MenuItem value="male" style={{ fontFamily: 'GmarketSansMedium' }}>
                  남성
                </MenuItem>
                <MenuItem value="female" style={{ fontFamily: 'GmarketSansMedium' }}>
                  여성
                </MenuItem>
              </Select>
              {!isGenderValid && gender !== '' && <FormHelperText style={{ fontFamily: 'GmarketSansMedium' }}>성별을 선택해주세요.</FormHelperText>}
            </FormControl>

            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  sx={{ fontFamily: 'GmarketSansMedium' }}
                  disabled={!isFormValid}
                  style={{ fontFamily: 'GmarketSansMedium', fontSize: '12pt', borderRadius: '20px', width: '12vh', backgroundColor: '#397ad8' }}
                >
                  회원가입
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate('/login')}
                  style={{ fontFamily: 'GmarketSansMedium', fontSize: '12pt', borderRadius: '20px', width: '12vh', backgroundColor: '#42bff5' }}
                >
                  로그인하기
                </Button>
              </Grid>
              {/* <Grid item>
                <div>
                  <a id="custom-login-btn" onClick={registerWithKakao}>
                    <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" alt="카카오 계정으로 로그인하기 버튼" width="222" />
                  </a>
                </div>
              </Grid> */}
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterForm;
