import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { AddNewModal as S, TabAssets as Icon } from "../../TabStyles";
import {
  toggleAddNewLabelState,
  addnewLabelFontColor,
  labelDataListState,
  addLabelDataState,
} from "@/stores/tabAtoms";
import { userLoggedIn } from "@/stores/loginAtoms";
import NewLabelView from "./NewLabelView";
import API from "@/Utils/api";

type addModalPropType = {
  onLabelInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelAddModal = () => {
  const [addLabelData, setAddLabelData] = useRecoilState(addLabelDataState);
  const loginData = useRecoilValue(userLoggedIn);
  const [labelDataList, setLabelDataList] = useRecoilState(labelDataListState);

  const setAddNewLabelState = useSetRecoilState(toggleAddNewLabelState);

  const handleAddLabelClick = () => {
    API.post("/api/label", addLabelData, loginData.userToken).then((res) => {
      if (res.ok) setLabelDataList([...labelDataList, addLabelData]);
    });
    setAddNewLabelState(false);
    API.get("/api/label", loginData.userToken);
  };

  const onLabelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddLabelData({
      ...addLabelData,
      [name]: value,
    });
  };

  return (
    <S.AddModalDiv isLabel={true}>
      <S.AddModalTitle>새로운 레이블 추가</S.AddModalTitle>
      <S.ModalContent>
        <S.ModalLeft>
          <NewLabelView />
        </S.ModalLeft>
        <S.ModalRight>
          <LabelTitleDescriptionInput onLabelInputChange={onLabelInputChange} />
          <S.ChangeColorContainer>
            <BackgroundChangeContainer
              onLabelInputChange={onLabelInputChange}
            />
            <FontColorChangeContainer />
          </S.ChangeColorContainer>
          <S.FinishWriteBtnDiv>
            <S.FinishWriteBtn
              disabled={addLabelData.title === ""}
              onClick={handleAddLabelClick}
            >
              + 완료
            </S.FinishWriteBtn>
          </S.FinishWriteBtnDiv>
        </S.ModalRight>
      </S.ModalContent>
    </S.AddModalDiv>
  );
};

const BackgroundChangeContainer = ({
  onLabelInputChange,
}: addModalPropType) => {
  return (
    <S.ChangeBackgroundDiv>
      <S.ColorTitle>배경색상</S.ColorTitle>
      <S.BackgroundColorContent>
        <S.Input
          name="color"
          placeholder="색 입력"
          onChange={onLabelInputChange}
        />
      </S.BackgroundColorContent>
      <S.ColorPickerDiv>
        <label>
          <Icon.RefreshIcon />
          <S.ColorPicker
            name="color"
            type="color"
            onChange={onLabelInputChange}
          ></S.ColorPicker>
        </label>
      </S.ColorPickerDiv>
    </S.ChangeBackgroundDiv>
  );
};

const FontColorChangeContainer = () => {
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

const LabelTitleDescriptionInput = ({
  onLabelInputChange,
}: addModalPropType) => {
  return (
    <S.InputWrapper>
      <S.Input
        name="title"
        placeholder="레이블 이름"
        onChange={onLabelInputChange}
      />
      <S.Input
        name="description"
        placeholder="설명 (선택)"
        onChange={onLabelInputChange}
      />
    </S.InputWrapper>
  );
};

export default LabelAddModal;
