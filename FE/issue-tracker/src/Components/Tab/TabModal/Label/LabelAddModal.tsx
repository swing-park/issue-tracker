import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AddNewModal as S, TabAssets as Icon } from "../../TabStyles";
import {
  addNewLabelTitleState,
  addNewLabelDescriptionState,
  addNewLabelBackgroundState,
  addnewLabelFontColor,
} from "../../../../stores/TabAtoms";
import NewLabelView from "./NewLabelView";

const LabelAddModal = () => {
  const newLabelTitleState = useRecoilValue(addNewLabelTitleState);

  return (
    <S.AddModalDiv isLabel={true}>
      <S.AddModalTitle>새로운 레이블 추가</S.AddModalTitle>
      <S.ModalContent>
        <S.ModalLeft>
          <NewLabelView />
        </S.ModalLeft>
        <S.ModalRight>
          <LabelTitleDescriptionInput />
          <S.ChangeColorContainer>
            <BackgroundChangeContainer />
            <FontColorChangeContainer />
          </S.ChangeColorContainer>
          <S.FinishWriteBtnDiv>
            <S.FinishWriteBtn disabled={newLabelTitleState === ""}>
              + 완료
            </S.FinishWriteBtn>
          </S.FinishWriteBtnDiv>
        </S.ModalRight>
      </S.ModalContent>
    </S.AddModalDiv>
  );
};

const BackgroundChangeContainer = () => {
  const [newLabelBackgroundState, setNewLabelBackgroundState] = useRecoilState(
    addNewLabelBackgroundState
  );

  const handleLabelBackgroundInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLabelBackgroundState(e.target.value);
  };

  const handleLabelColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabelBackgroundState((e.target as HTMLInputElement).value);
  };

  return (
    <S.ChangeBackgroundDiv>
      <S.ColorTitle>배경색상</S.ColorTitle>
      <S.BackgroundColorContent>
        <S.Input
          placeholder="색 입력"
          value={newLabelBackgroundState}
          onChange={handleLabelBackgroundInput}
        />
      </S.BackgroundColorContent>
      <S.ColorPickerDiv>
        <label>
          <Icon.RefreshIcon />
          <S.ColorPicker
            type="color"
            onChange={handleLabelColorInput}
            value={newLabelBackgroundState}
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

const LabelTitleDescriptionInput = () => {
  const [newLabelDescriptionState, setNewLabelDescriptionState] =
    useRecoilState(addNewLabelDescriptionState);

  const [newLabelTitleState, setNewLabelTitleState] = useRecoilState(
    addNewLabelTitleState
  );

  const handleLabelTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLabelTitleState(e.target.value);
  };

  const handleLabelDescriptionInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewLabelDescriptionState(e.target.value);
  };

  return (
    <S.InputWrapper>
      <S.Input
        placeholder="레이블 이름"
        onChange={handleLabelTitleInput}
        value={newLabelTitleState}
      />
      <S.Input
        placeholder="설명 (선택)"
        value={newLabelDescriptionState}
        onChange={handleLabelDescriptionInput}
      />
    </S.InputWrapper>
  );
};

export default LabelAddModal;