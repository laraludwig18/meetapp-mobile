import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  form {
    display: flex;
    flex-direction: column;

    input {
      background: rgba(0, 0, 0, 0.2);
      height: 50px;
      border-radius: 4px;
      border: 0;
      margin-bottom: 10px;
      color: #fff;
      font-size: 18px;
      padding-left: 20px;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        font-size: 18px;
      }
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border-color: rgba(255, 255, 255, 0.1);
      margin-top: 20px;
      margin-bottom: 20px;
    }

    button {
      margin-top: 10px;
      background: #f94d6a;
      border: 0;
      border-radius: 4px;
      height: 42px;
      width: 162px;
      display: flex;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      align-items: center;
      justify-content: center;
      background: background 0.2s;
      align-self: flex-end;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;
