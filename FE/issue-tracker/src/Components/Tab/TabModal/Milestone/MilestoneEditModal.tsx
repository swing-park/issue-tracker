import { AddNewModal as S } from "../../TabStyles";
import {
  toggleEditMilestoneState,
  milestoneDataListState,
  editMilestoneDataState,
} from "@/stores/tabAtoms";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import API from "@/Utils/api";
import { userLoggedIn } from "@/stores/loginAtoms";

type MilesEditProps = {
  id?: number;
};

const MilestoneEditModal = ({ id }: MilesEditProps) => {
  const [editMilestoneData, setEditMilestoneData] = useRecoilState(
    editMilestoneDataState
  );

  const setMilestoneEditState = useSetRecoilState(toggleEditMilestoneState);

  const [milestoneData, setMilestoneData] = useRecoilState(
    milestoneDataListState
  );
  const loginData = useRecoilValue(userLoggedIn);

  const onChangeMilestoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditMilestoneData({ ...editMilestoneData, [name]: value });
  };

  const handleEditCloseBtnClick = () => {
    API.put(
      `/api/milestone/${id}`,
      editMilestoneData,
      loginData.userToken
    ).then((res) => {
      if (res.ok) {
        const modifiedArray = milestoneData.map((mile) =>
          mile.id === id ? editMilestoneData : mile
        );
        setMilestoneData(modifiedArray);
      }
    });

    setMilestoneEditState({
      isOpen: false,
      rowId: id,
    });
  };

  const handleEditCancleBtnClick = () => {
    setMilestoneEditState({
      isOpen: false,
      rowId: id,
    });
  };
  console.log(milestoneData);
  return (
    <S.AddModalDiv isLabel={false}>
      <S.AddModalTitle>마일스톤 편집</S.AddModalTitle>
      <S.ModalMileContent>
        <S.ModalContent>
          <S.MilestoneSmallInputDiv>
            <S.Input
              name="tilte"
              value={editMilestoneData.title}
              placeholder="마일스톤 이름"
              onChange={onChangeMilestoneInput}
            />
          </S.MilestoneSmallInputDiv>
          <S.MilestoneSmallInputDiv>
            <S.Input
              name="due_date"
              value={editMilestoneData.due_date}
              placeholder="완료일(선택) ex.YYYY-MM-DD"
              onChange={onChangeMilestoneInput}
            />
          </S.MilestoneSmallInputDiv>
        </S.ModalContent>
        <S.Input
          name="description"
          placeholder="설명(선택)"
          value={editMilestoneData.description}
          onChange={onChangeMilestoneInput}
        />
        <S.FinishWriteBtnDiv>
          <S.Canclebtn onClick={handleEditCancleBtnClick}>취소</S.Canclebtn>
          <S.FinishWriteBtn onClick={handleEditCloseBtnClick}>
            + 완료
          </S.FinishWriteBtn>
        </S.FinishWriteBtnDiv>
      </S.ModalMileContent>
    </S.AddModalDiv>
  );
};

export default MilestoneEditModal;
