import styled from 'styled-components';

import { SpriteImage } from '../../theme';

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: center;
 font-family: Arial, Helvetica, sans-serif;
`;

export const Title = styled.h1`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
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
