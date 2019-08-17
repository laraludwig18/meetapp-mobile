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

export const EmptyListContainer = styled.SafeAreaView`
  flex: 1;
  margin: 0 15px;
  align-items: center;
  justify-content: center;
`;

export const EmptyListText = styled.Text`
  color: #fff;
  font-size: 14px;
`;

export const Loader = styled.ActivityIndicator.attrs({
  color: '#f94d6a',
})`
  margin: 20px 0;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  margin-top: 30px;
`;
