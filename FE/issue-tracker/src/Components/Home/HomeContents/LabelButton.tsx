import { Home as Styled } from "../HomeStyles";
import { HomeAssets as S } from "../HomeStyles";
import { labelDataListState } from "@/stores/tabAtoms";
import { useRecoilValue } from "recoil";

const LabelButton = () => {
  const LabelCount = useRecoilValue(labelDataListState);

  return (
    <Styled.Button>
      <S.LabelTag />
      {`레이블 (${LabelCount ? LabelCount.length : 0})`}
    </Styled.Button>
  );
};

export default LabelButton;
