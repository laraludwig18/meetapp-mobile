import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-98deg, #22202c, #402845);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  img {
    height: 42px;
    width: 41px;
    margin-bottom: 25px;
  }

  form {
    display: flex;
    flex-direction: column;

    input {
      border: 0;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      height: 50px;
      color: #fff;
      padding-left: 15px;
      margin-bottom: 8px;

      &::placeholder {
        font-family: Helvetica, sans-serif;
        color: rgba(255, 255, 255, 0.5);
      }
    }

    span {
      align-self: flex-start;
      font-weight: bold;
      margin: 0 0 10px;
      color: #fb6f91;
    }

    button {
      font-weight: bold;
      font-size: 18px;
      margin-top: 5px;
      border: 0;
      background: #f94d6a;
      border-radius: 4px;
      height: 50px;
      color: #fff;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      margin-top: 15px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: bold;
      font-family: Helvetica, sans-serif;
      font-family: 16px;

      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
`;
