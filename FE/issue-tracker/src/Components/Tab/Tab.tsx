import { useRecoilValue, useSetRecoilState } from "recoil";
import Header from "@/Components/Header/Header";
import TabHeader from "./TabHeader/TabHeader";
import TabContents from "./TabContents/TabContents";
import { TabComponents as S } from "./TabStyles";
import {
  toggleAddNewLabelState,
  toggleAddNewMilestoneState,
  labelDataListState,
  milestoneDataListState,
  currentTabState,
} from "@/stores/tabAtoms";
import LabelAddModal from "./TabModal/Label/LabelAddModal";
import MilestoneAddModal from "./TabModal/Milestone/MilestoneAddModal";
import useFetch from "@/Utils/useFetch";
import { milestoneType, labelType } from "./tabTypes";
import { useEffect } from "react";

const Tab = () => {
  const toggleAddLabelModalState = useRecoilValue(toggleAddNewLabelState);

  const toggleAddMilestoneModalState = useRecoilValue(
    toggleAddNewMilestoneState
  );
  const tabState = useRecoilValue(currentTabState);

  const { fetchedData: labelData, loading: labelLoading } =
    useFetch("/api/label");

  const { fetchedData: milestoneData, loading: milestoneLoading } =
    useFetch("/api/milestone");

  const setLabelDataList = useSetRecoilState(labelDataListState);

  const setMilestoneList = useSetRecoilState(milestoneDataListState);

  useEffect(() => {
    setLabelDataList(labelData as labelType[]);
    setMilestoneList(milestoneData as milestoneType[]);
  }, [labelData, milestoneData]);

  return (
    <>
      <Header />
      <S.TabContainer>
        <TabHeader />
        {tabState === "label" ? (
          <>
            {toggleAddLabelModalState && <LabelAddModal />}
            <TabContents loading={labelLoading} />
          </>
        ) : (
          <>
            {toggleAddMilestoneModalState && <MilestoneAddModal />}
            <TabContents loading={milestoneLoading} />
          </>
        )}
      </S.TabContainer>
    </>
  );
};

export default Tab;
