import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IssueTable as S, HomeAssets as Icon } from "../../../HomeStyles";
import DropDown from "./DropDown/DropDown";
import {
  categoryModalOpenState,
  editOpenCloseIssueModalState,
  checkedItemState,
  IssueModalState,
  userDataListState,
} from "../../../../../stores/homeAtoms";
import StateDropDown from "./DropDown/StateDropDown";
import useFetch from "@/Utils/useFetch";
import { labelDataListState, milestoneDataListState } from "@/stores/tabAtoms";
import { labelType, milestoneType } from "@/Components/Tab/tabTypes";
import { userType } from "@/Components/Home/homeTypes";

const IssueDropDownCategory = () => {
  const [editIssueModalState, setEditIssueModalState] = useRecoilState(
    editOpenCloseIssueModalState
  );

  const checkedItemsCount = useRecoilValue(checkedItemState);

  useEffect(() => {
    if (checkedItemsCount.size !== 0) setEditIssueModalState(true);
    else setEditIssueModalState(false);
  }, [checkedItemsCount.size]);

  return (
    <S.TableHeaderRight>
      {editIssueModalState ? (
        <StateEditDropdownContainer />
      ) : (
        <CategoryDropdownContainer />
      )}
    </S.TableHeaderRight>
  );
};

const StateEditDropdownContainer = () => {
  const [issueModalState, setIssueModalState] = useRecoilState(IssueModalState);

  const handleIssueStateClick = () => {
    setIssueModalState(!issueModalState);
  };

  return (
    <S.ThModalWrapDiv>
      <S.TableTh onClick={handleIssueStateClick}>
        상태수정
        <Icon.Down />
      </S.TableTh>
      {issueModalState && <StateDropDown />}
    </S.ThModalWrapDiv>
  );
};

const CategoryDropdownContainer = () => {
  const modalTitleMock: string[] = ["담당자", "레이블", "마일스톤", "작성자"];

  const setMilestoneDataList = useSetRecoilState(milestoneDataListState);
  const setLabelDataList = useSetRecoilState(labelDataListState);
  const setUserDataList = useSetRecoilState(userDataListState);

  const [categModalOpenState, setCategModalOpenState] = useRecoilState(
    categoryModalOpenState
  );
  const handleCategClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategModalOpenState({
      openedModalTitle: (e.target as HTMLElement).dataset.title,
      isOpen: true,
    });
  };

  const { fetchedData: userData } = useFetch("/api/user");
  const { fetchedData: labelData } = useFetch("/api/label");
  const { fetchedData: milestoneData } = useFetch("/api/milestone");

  useEffect(() => {
    handlefetchedData();
  }, [userData, labelData, milestoneData]);

  const handlefetchedData = () => {
    setUserDataList(userData as userType[]);
    setLabelDataList(labelData as labelType[]);
    setMilestoneDataList(milestoneData as milestoneType[]);
  };

  return (
    <>
      {modalTitleMock.map((modalTitle, i) => (
        <S.ThModalWrapDiv key={i}>
          <S.TableTh data-title={modalTitle} onClick={handleCategClick}>
            {modalTitle}
            <Icon.Down />
          </S.TableTh>
          {categModalOpenState.isOpen &&
            modalTitle === categModalOpenState.openedModalTitle && (
              <DropDown modalTitle={modalTitle} />
            )}
        </S.ThModalWrapDiv>
      ))}
    </>
  );
};

export default IssueDropDownCategory;
