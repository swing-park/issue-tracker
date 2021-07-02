import { HomeAssets as S } from "../HomeStyles";
import { Home as Styled } from "../HomeStyles";
import { milestoneDataListState } from "@/stores/tabAtoms";
import { useRecoilValue } from "recoil";

const MileStoneButton = () => {
  const milestoneCount = useRecoilValue(milestoneDataListState);
  return (
    <Styled.Button>
      <S.MilestoneTag />
      {`마일스톤 (${milestoneCount ? milestoneCount.length : 0})`}
    </Styled.Button>
  );
};

export default MileStoneButton;
