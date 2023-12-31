/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 부츠이미지 from '../../assets/outfitImage/shoes/부츠.png';
import 운동화이미지 from '../../assets/outfitImage/shoes/운동화.png';
import 구두이미지 from '../../assets/outfitImage/shoes/구두.png';
import 샌들이미지 from '../../assets/outfitImage/shoes/샌들.png';

function Shoes({ attire }) {
  const [shoes1, setShoes1] = useState(null);
  const [shoes2, setShoes2] = useState(null);

  const images = React.useMemo(
    () => ({
      부츠: 부츠이미지,
      운동화: 운동화이미지,
      구두: 구두이미지,
      샌들: 샌들이미지,
    }),
    [],
  );

  useEffect(() => {
    attire.shoes.forEach((item, index) => {
      if (index === 0) {
        if (images[item]) {
          setShoes1(item);
        }
      } else if (index === 1) {
        if (images[item]) {
          setShoes2(item);
        }
      }
    });
  }, [attire.shoes, images]);

  const settings = {
    arrows: true,
    dots: true, // 슬라이드 밑에 점 보이게
    infinite: true, // 무한으로 반복
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1500, // 넘어가는 속도
    slidesToShow: 1,
    slidesToScroll: 1, // 1장씩 뒤로 넘어가게
    centerMode: false,
    centerPadding: '0px', // 0px 하면 슬라이드 끝쪽 이미지가 안잘림
    variableWidth: true,
  };

  return (
    <div>
      <SlideWrapper>
        <StyledDiv>SHOES</StyledDiv>
        <Slider {...settings}>
          {shoes1 && (
            <div>
              <img src={images[shoes1]} alt={shoes1} style={{ width: '520px' }} />
            </div>
          )}
          {shoes2 && (
            <div>
              <img src={images[shoes2]} alt={shoes2} style={{ width: '520px' }} />
            </div>
          )}
        </Slider>
      </SlideWrapper>
    </div>
  );
}

export default Shoes;

const SlideWrapper = styled.div`
  padding: 0 0 40px 0;
  display: inline-block;
  margin: 0 0 3.2vh 0;
  width: 520px;
`;

const StyledDiv = styled.div`
  width: 12vh;
  height: flex;
  background-color: #efefef;
  border-radius: 20px;
  box-shadow: 0px 0px 16px #f4f4f4;
  font-family: 'GmarketSansMedium';
  font-size: 16pt;
  color: #606060;
  margin: 2vh auto;
  padding: 0.8vh 2vh;
`;
