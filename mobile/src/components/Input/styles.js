import styled from 'styled-components/native';

export const Container = styled.View(
  props => `
  padding: 0 5px;
  border-radius: 4px;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;

  flex-direction: row;
  align-items: center;

  ${props.hasError &&
    `
    border-width: 1px;
    border-color: #d44059;
  `}
`
);

export const ErrorMessage = styled.Text`
  color: #d44059;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.5)',
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
