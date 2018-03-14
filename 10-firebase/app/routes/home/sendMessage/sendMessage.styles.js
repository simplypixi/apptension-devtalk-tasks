import styled from 'styled-components';

export const Container = styled.div`
 display: flex;
 align-items: center;
 justify-content: flex-start;
 text-align: left;
 background: #f6f6f6;
 width: 100%;
 height: 80px;
 box-shadow: inset 1px 46px 25px -61px #ABABAB,-50px -50px 5px -100px #DDDDDD;
 padding: 0 20px;
 box-sizing: border-box;
 flex: none;

 form {
    display: flex;
    width: 100%;
    align-items: center;
 }

 input[type=submit] {
    flex: 1;
    position: relative;
    display: block;
    margin: 30px auto;
    padding: 0;
    overflow: hidden;
    border-width: 0;
    outline: none;
    border-radius: 2px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .6);
    background-color: #53c84a;
    color: #ecf0f1;
    transition: background-color .3s;
    height: 34px;
    margin-left: 10px
 }

 input[type=submit]:hover, input[type=submit]:focus {
    background-color: #459b3e;
 }

 input[type=text] {
    border: none;
    border-radius: 2px;
    background: #fff;
    font-size: 13px;
    height: 34px;
    flex: 3;
    padding-left: 4px;
    color: #535353;
    box-shadow: 0 0 16px -13px #000;
 }
`;
