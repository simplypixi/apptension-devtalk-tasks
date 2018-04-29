import styled from 'styled-components';

export const NotesListContainer = styled.ul`
  display: block;
  height: 100%;
  width: 200px;
  border-right: 1px solid #d2d2d2;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-align: left;
`;

export const NotesListItem = styled.li`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d2d2d2;
  overflow: hidden;
  display: block;
  transition: background 150ms ease-in-out;
  background: ${({selected}) => selected ? '#ffeea9' : 'transparent'}
`;

export const NotesListItemTitle = styled.div`
  font-weight: 600;
  height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  color: #676767;
`;

export const NotesListItemDetails = styled.div`
  display: flex;
  flex-layout: row;
  height: 15px;
  align-items: center;
  font-size: 10px;
  color: #676767;
`;

export const NotesListItemDate = styled.div`
  width: 80px;
`;

export const NotesListItemDesc = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #ababab;
  margin-left: 8px;
`;