import styled from 'styled-components';

export const Label = styled.label`
  margin-bottom: 20px;
  display: flex;
  height: 300px;
  width: 100%;
  background: #000;
  cursor: pointer;
  display: flex;
  justify-content: center;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span.select-image {
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.3);
      font-size: 20px;
      font-weight: bold;
    }
  }

  img {
    height: 300px;
    width: 100%;
    background: #eee;
  }

  input {
    display: none;
  }
`;
