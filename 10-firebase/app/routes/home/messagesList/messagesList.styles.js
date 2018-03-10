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
  height: 400px;
  overflow-y: scroll;
`;

export const ListItem = styled.li`
  margin: 10px;
  display: flex;
`;

export const User = styled.b`
`;

export const Message = styled.p`
  margin: 0;
  display: block;
  word-wrap: break-word;
  margin-bottom: 4px;
  color: #535353;
  font-size: 13px;
`;

export const When = styled.div`
  font-size: 0.6em;
  opacity: 0.4;
`;

export const Avatar = styled.img`
  display:inline-block;
  margin: 0 10px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
`;

export const MessageContainer = styled.div`
  background: #f7f7f7;
  border-radius: 20px;
  padding: 10px;
  max-width: 260px;
`;