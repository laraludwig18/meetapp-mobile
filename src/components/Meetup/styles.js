import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Banner = styled.Image`
  height: 150px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Text = styled.Text`
  font-size: 13px;
  color: #999999;
  margin-left: 5px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const Wrapper = styled.View`
  padding: 20px;
`;

export const SubscriptionButton = styled(Button).attrs({
  fontStyle: {
    fontSize: 16,
  },
})`
  margin-top: 15px;
  height: 40px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;
