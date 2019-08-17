import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 0 15px;
`;

export const EmptyListContainer = styled.SafeAreaView`
  flex: 1;
  margin: 0 15px;
  align-items: center;
  justify-content: center;
`;

export const EmptyListText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 14px;
`;

export const MeetupList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  margin-top: 30px;
`;
