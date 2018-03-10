import styled from 'styled-components';

import { SpriteImage } from '../../theme';

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 position: absolute;
 height: 100%;
 width: 100%;
 background: #f6f6f6;
`;

export const Chat = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 text-align: center;
 font-family: Arial, Helvetica, sans-serif;
 background: #fff;
 border-radius: 10px;
 box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
 width: 360px;
 height: 640px;
 position: relative;
 overflow: hidden;
`;

export const Title = styled.h1`
 margin: 0;
 display: flex;
 align-items: center;
 span {
  font-family: 'Pacifico', cursive;
  color: #696969;
  font-weight: 200;
  font-size: 24px;
 }
 i {
   margin-bottom: 0;
 }
`;

export const TitleContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 width: 100%;
 border-bottom: 1px solid #e6e6e6;
 padding: 10px 0;
`;

export const TitleLogo = SpriteImage.extend`
  margin-bottom: 16px;
`;

export const EnvName = styled.div`
  color: green;
  margin-top: 40px;
  margin-bottom: 40px;
`;


export const Login = styled.button`
`;
