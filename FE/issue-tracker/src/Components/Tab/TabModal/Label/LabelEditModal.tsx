import { AddNewModal as S, TabAssets as Icon } from "../../TabStyles";
import {
  toggleEditLabelState,
  addnewLabelFontColor,
  labelDataListState,
  editLabelDataState,
} from "@/stores/tabAtoms";
import { userLoggedIn } from "@/stores/loginAtoms";
import { useSetRecoilState, useRecoilState, useRecoilValue } from "recoil";
import EditLabelView from "./EditLabelView";
import API from "@/Utils/api";

type LabelEditProps = {
  id?: number;
};

type LabelEditData = {
  id?: number;
  title?: string;
  description?: string;
  color?: string;
};

type LabelEditInputPropType = {
  onEditLabelInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  editLabelData: LabelEditData;
};

const LabelEditModal = ({ id }: LabelEditProps) => {
  const [editLabelData, setEditLabelData] = useRecoilState(editLabelDataState);

  const setLabelEditState = useSetRecoilState(toggleEditLabelState);

  const [labelDataList, setLabelDataList] = useRecoilState(labelDataListState);

  const loginData = useRecoilValue(userLoggedIn);

  const handleEditCancleBtnClick = () => {
    setLabelEditState({
      isOpen: false,
      rowId: id,
    });
  };

  const onEditLabelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditLabelData({
      ...editLabelData,
      [name]: value,
    });
  };

  const handleEditCloseBtnClick = () => {
    API.put(`/api/label/${id}`, editLabelData, loginData.userToken).then(
      (res) => {
        if (res.ok) {
          console.log(res);
          const modifiedArray = labelDataList.map((label) =>
            label.id === id ? editLabelData : label
          );
          setLabelDataList(modifiedArray);
        }
      }
    );

    setLabelEditState({
      isOpen: false,
      rowId: id,
    });
  };

  return (
    <S.AddModalDiv isLabel={true}>
      <S.AddModalTitle>레이블 편집</S.AddModalTitle>
      <S.ModalContent>
        <S.ModalLeft>
          <EditLabelView />
        </S.ModalLeft>
        <S.ModalRight>
          <LabelEditTitleDescriptionInput
            onEditLabelInputChange={onEditLabelInputChange}
            editLabelData={editLabelData}
          />
          <S.ChangeColorContainer>
            <EditBackgroundContainer
              onEditLabelInputChange={onEditLabelInputChange}
              editLabelData={editLabelData}
            />
            <EditFontColorContainer />
          </S.ChangeColorContainer>
          <S.FinishWriteBtnDiv>
            <S.Canclebtn onClick={handleEditCancleBtnClick}>취소</S.Canclebtn>
            <S.FinishWriteBtn onClick={handleEditCloseBtnClick}>
              + 완료
            </S.FinishWriteBtn>
          </S.FinishWriteBtnDiv>
        </S.ModalRight>
      </S.ModalContent>
    </S.AddModalDiv>
  );
};

const LabelEditTitleDescriptionInput = ({
  onEditLabelInputChange,
  editLabelData,
}: LabelEditInputPropType) => {
  return (
    <S.InputWrapper>
      <S.Input
        name="title"
        placeholder="레이블 이름"
        value={editLabelData.title}
        onChange={onEditLabelInputChange}
      />
      <S.Input
        name="description"
        placeholder="설명 (선택)"
        value={editLabelData.description}
        onChange={onEditLabelInputChange}
      />
    </S.InputWrapper>
  );
};

const EditBackgroundContainer = ({
  onEditLabelInputChange,
  editLabelData,
}: LabelEditInputPropType) => {
  return (
    <S.ChangeBackgroundDiv>
      <S.ColorTitle>배경색상</S.ColorTitle>
      <S.BackgroundColorContent>
        <S.Input
          name="color"
          placeholder="색 입력"
          value={editLabelData.color}
          onChange={onEditLabelInputChange}
        />
      </S.BackgroundColorContent>
      <S.ColorPickerDiv>
        <label>
          <Icon.RefreshIcon />
          <S.ColorPicker
            name="color"
            type="color"
            onChange={onEditLabelInputChange}
            value={editLabelData.color}
          ></S.ColorPicker>
        </label>
      </S.ColorPickerDiv>
    </S.ChangeBackgroundDiv>
  );
};

const EditFontColorContainer = () => {
  const setNewLabelFontColor = useSetRecoilState(addnewLabelFontColor);
  const handleLabelBlackWhiteInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLabelFontColor(e.target.dataset.color);
  };

  return (
    <S.ChangeFontColorDiv>
      <S.ColorTitle>텍스트 색상</S.ColorTitle>
      <S.FontColorRadioContent>
        <input
          id="black"
          data-color="black"
          name="labelFontColor"
          type="radio"
          onChange={handleLabelBlackWhiteInput}
        />
        <label htmlFor="black">어두운 색</label>
      </S.FontColorRadioContent>
      <S.FontColorRadioContent>
        <input
          id="white"
          data-color="white"
          name="labelFontColor"
          type="radio"
          onChange={handleLabelBlackWhiteInput}
        />
        <label htmlFor="white">밝은 색</label>
      </S.FontColorRadioContent>
    </S.ChangeFontColorDiv>
  );
};

export default LabelEditModal;
