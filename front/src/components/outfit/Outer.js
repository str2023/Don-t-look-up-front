/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 패딩이미지 from '../../assets/outfitImage/outer/패딩.png';
import 코트이미지 from '../../assets/outfitImage/outer/코트.png';
import 점퍼이미지 from '../../assets/outfitImage/outer/점퍼.png';
import 자켓이미지 from '../../assets/outfitImage/outer/자켓.png';
import 가디건이미지 from '../../assets/outfitImage/outer/가디건.png';

function Outer({ attire }) {
  const [outer1, setOuter1] = useState(null);
  const [outer2, setOuter2] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const images = {
    패딩: 패딩이미지,
    코트: 코트이미지,
    점퍼: 점퍼이미지,
    자켓: 자켓이미지,
    가디건: 가디건이미지,
  };

  useEffect(() => {
    if (attire.outer) {
      attire.outer.forEach((item, index) => {
        if (index === 0) {
          if (images[item]) {
            setOuter1(item);
          }
        } else if (index === 1) {
          if (images[item]) {
            setOuter2(item);
          }
        }
      });
    }
  }, [attire.outer, images]);

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
        <Slider {...settings}>
          {outer1 && (
            <div>
              <img src={images[outer1]} alt={outer1} style={{ width: '360px' }} />
            </div>
          )}
          {outer2 && (
            <div>
              <img src={images[outer2]} alt={outer2} style={{ width: '360px' }} />
            </div>
          )}
        </Slider>
      </SlideWrapper>
    </div>
  );
}

export default Outer;

const SlideWrapper = styled.div`
  width: 360px;
`;
