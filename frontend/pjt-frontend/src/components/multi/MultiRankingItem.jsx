import styled from 'styled-components';

export default function MultiRankingItem({ rank, player }) {
  return (
    <RankingItemContainer>
      <Rank>{rank}</Rank>
      <ProfileImageContainer />
      <InfoContainer>
        <Name>{player?.name}</Name>
        <Score>{player?.score}</Score>
      </InfoContainer>
    </RankingItemContainer>
  );
}

const RankingItemContainer = styled.div`
  display: flex;
  background-color: #f8f9fa;
  border-radius: 10px;
  width: 300px;
  height: 33px;
  margin: 8px;
  padding: 10px 20px;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Rank = styled.h4`
  margin: 0 20px 0 0;
  width : 20px;
  font-size: 1.5em;
  color: #495057;
`;

const ProfileImageContainer = styled.div`
  width: 50px;
  height: 50px;
  background-image: url('../../../src/assets/single-test.webp');
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  margin-right: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  color: #343a40;
`;

const Score = styled.div`
  font-size: 1em;
  color: #868e96;
`;

const LeaderBoardPlayerLayouts = {
  Name,
  Score,
};

export { LeaderBoardPlayerLayouts };
