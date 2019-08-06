import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  > p {
    font-size: 18px;
    color: #fff;
    text-align: center;
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      height: 42px;
      width: 116px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: #d44059;
      background: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#d44059')};
      }

      svg {
        margin-right: 5px;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      height: 42px;
      width: 116px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: #4dbaf9;
      margin-right: 10px;
      background: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#4dbaf9')};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const Meetup = styled.div`
  margin: 50px 0;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 300px;
  }

  p {
    margin-top: 20px;
    font-size: 18px;
    color: #fff;
    text-align: justify;
    align-self: flex-start;
  }

  div {
    margin-top: 30px;
    align-self: flex-start;
    span {
      margin-left: 5px;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
    }

    svg {
      + span {
        margin-right: 20px;
      }
    }
  }
`;
