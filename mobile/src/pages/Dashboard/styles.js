import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 10px;
`;

export const DateText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  margin: 0 10px;
`;

export const DateContainer = styled.View`
  margin-top: 25px;
  flex-direction: row;
  justify-content: center;
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: '#f94d6a',
})`
  margin: 20px 0;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 30px;
`;
