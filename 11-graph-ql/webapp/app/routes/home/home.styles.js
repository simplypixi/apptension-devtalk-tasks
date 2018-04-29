import styled from 'styled-components';

import { SpriteImage } from '../../theme';
import DesktopBackground from '../../images/mac-wallpaper.jpg';

export const Desktop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: url(${DesktopBackground});
  width: 100vw;
  height: 100vh;
  font-family: Open Sans;
`;

export const Window = styled.div`
  background: #fff;
  width: 60%;
  min-width: 800px;
  height: 70%;
  min-height: 600px;
  box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: hidden;
`;

export const WindowContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

export const Note = styled.textarea`
  padding: 20px;
  width: calc(100% - 240px);
  height: 100%;
  border: none;
  outline: none;
`;