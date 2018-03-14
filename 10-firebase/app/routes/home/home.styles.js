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
 text-align: center;
 font-family: Arial, Helvetica, sans-serif;
 background: #fff;
 border-radius: 10px;
 box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
 width: 360px;
 max-height: 640px;
 position: relative;
 overflow: hidden;
`;

export const Title = styled.h1`
 margin: 0;
 display: flex;
 align-items: center;
 flex: none;
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
 flex: none;
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
  box-sizing: border-box;
  position: relative;
  margin: 2.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #FFF;
  background-color: #4C69BA;
  text-shadow: 0 -1px 0 #354C8C;

  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
  }

  &:focus {
    outline: none;
  }

  &:active {
    box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
  }

  &:hover,
  &:focus {
    background-color: #5B7BD5;
  }
`;
