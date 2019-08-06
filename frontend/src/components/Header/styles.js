import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0 20%;
  background: rgba(0, 0, 0, 0.3);
  height: 72px;

  img {
    width: 31px;
    height: 32px;
  }

  div {
    display: flex;

    button {
      background: #d44059;
      border: 0;
      color: #fff;
      width: 71px;
      height: 42px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#d44059')};
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  margin-right: 20px;

  p {
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  a {
    color: #999999;
    font-size: 14px;
  }
`;
