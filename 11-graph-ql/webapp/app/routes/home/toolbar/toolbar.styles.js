import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  height: 40px;
  width: 100%;
  background-image: linear-gradient(#e8e8e8, #e1e1e1);
  border-bottom: 1px solid #d2d2d2;
  padding: 0 15px;
`;

export const Dot = styled.div`
  border-radius: 100%;
  width: 12px;
  height: 12px;
  margin-right: 8px;

  ${({color}) => `background: ${color};`}
`;

export const ToolbarButton = styled.button`
  background: #fafafa;
  width: 38px;
  height: 20px;
  border-radius: 2px;
  font-family: Open Sans;
  font-size: 9px;
  text-transform: uppercase;
  display: flex;
  color: #868686;
  border: 1px solid #dedede;
  box-shadow: 0px 1px 0px 0px #ababab7a;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  cursor: ${props => props.disabled ? 'none' : 'pointer'};
  outline: none;
  padding: 0;
  transition: opacity 100ms ease-in-out; 
  ${props => props.disabled && 'opacity: 0.5'}
`;