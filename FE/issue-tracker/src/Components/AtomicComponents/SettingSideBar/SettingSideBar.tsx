import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import {
  dropDownCategoriesState,
  showDropDownState,
} from "@/stores/settingSideBarAtoms";
import SettingSideBarItem from "./SettingSideBarItem";
import { SettingSideBar as S } from "@/Components/AtomicComponents/AtomicComponentsStyles";

const SettingSideBar = () => {
  const dropDownCategories = useRecoilValue(dropDownCategoriesState);
  const setShowAssigneeDropDown = useSetRecoilState(showDropDownState.assignee);
  const setShowLabelDropDown = useSetRecoilState(showDropDownState.label);
  const setShowMileStoneDropDown = useSetRecoilState(
    showDropDownState.mileStone
  );
  const [showBackground, setShowBackground] = useRecoilState(
    showDropDownState.background
  );

  const handleOnClick = () => {
    setShowAssigneeDropDown(false);
    setShowLabelDropDown(false);
    setShowMileStoneDropDown(false);
    setShowBackground(false);
  };

  return (
    <>
      <S.Background isShow={showBackground} onClick={handleOnClick} />
      <S.SettingSideBar>
        {dropDownCategories.map((category) => (
          <SettingSideBarItem
            key={category}
            id={category}
            category={category}
          />
        ))}
      </S.SettingSideBar>
    </>
  );
};

export default SettingSideBar;
