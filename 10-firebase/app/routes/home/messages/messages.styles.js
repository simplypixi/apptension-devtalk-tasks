import styled from 'styled-components';

export const Container = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 text-align: left;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  margin: 10px;
`;

export const User = styled.b`
`;

export const Message = styled.span`
  display:inline-block;
  margin: 0 10px;
`;

export const When = styled.span`
  font-size: 0.6em;
  opacity: 0.4;
`;
