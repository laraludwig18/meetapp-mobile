import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    a {
      background: #f94d6a;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 4px;
      height: 42px;
      width: 172px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      background: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#f94d6a')};
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;

export const MeetupList = styled.ul`
  margin: 50px 5px;
`;

export const Meetup = styled.li`
  + li {
    margin-top: 10px;
  }

  a {
    transition: background 0.4s;
    padding: 0 30px;
    border: 0;
    background: rgba(0, 0, 0, 0.1);
    height: 62px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:hover {
      background: rgba(0, 0, 0, 0.2);
    }

    p {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    span {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.6);
      margin-right: 20px;
    }
  }
`;
