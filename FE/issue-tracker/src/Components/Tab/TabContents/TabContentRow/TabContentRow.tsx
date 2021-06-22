import { LabelMilestoneTable as S } from "../../TabStyles";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import Label from "@/Components/AtomicComponents/Label";
import ContentDescription from "./ContentDescription";
import {
  toggleEditLabelState,
  currentTabState,
  toggleEditMilestoneState,
} from "../../../../stores/tabAtoms";
import { useRecoilValue } from "recoil";
import LabelEditModal from "../../TabModal/Label/LabelEditModal";
import ContentTitle from "./ContentTitle";
import RangeBar from "./RangeBar";
import RangeDescription from "./RangeDescription";
import MilestoneEditModal from "../../TabModal/Milestone/MilestoneEditModal";
import { milestoneType, labelType } from "../../tabTypes";

type tabContentProp = {
  id: number;
  milestoneData?: milestoneType;
  labelData?: labelType;
};

const TabContentRow = ({ id, milestoneData, labelData }: tabContentProp) => {
  const EditLabelState = useRecoilValue(toggleEditLabelState);

  const EditMilestoneState = useRecoilValue(toggleEditMilestoneState);

  const tabState = useRecoilValue(currentTabState);

  return (
    <>
      {tabState === "label" ? (
        <>
          {EditLabelState.isOpen && id === EditLabelState.rowId ? (
            <LabelEditModal id={id} />
          ) : (
            <LabelRow id={id} labelData={labelData} />
          )}
        </>
      ) : (
        <>
          {EditMilestoneState.isOpen && id === EditMilestoneState.rowId ? (
            <MilestoneEditModal id={id} />
          ) : (
            <MilestoneRow id={id} milestoneData={milestoneData} />
          )}
        </>
      )}
    </>
  );
};

const LabelRow = ({ id, labelData }: tabContentProp) => {
  return (
    <S.TableRow>
      <S.TableRowContentLeft>
        <S.LabelWrapper>
          <Label
            label={labelData?.title}
            fontcolor="white"
            backgroundcolor={labelData?.color}
          />
        </S.LabelWrapper>
        <ContentDescription description={labelData?.description} />
      </S.TableRowContentLeft>
      <S.TableRowButtonDiv>
        <EditButton id={id} />
        <DeleteButton />
      </S.TableRowButtonDiv>
    </S.TableRow>
  );
};

const MilestoneRow = ({ id, milestoneData }: tabContentProp) => {
  return (
    <S.TableRow>
      <S.TableRowContentLeft>
        <S.TableRowContentLeftCol>
          <ContentTitle
            title={milestoneData?.title}
            due_date={milestoneData?.due_date}
          />
          <ContentDescription description={milestoneData?.description} />
        </S.TableRowContentLeftCol>
      </S.TableRowContentLeft>
      <S.TableRowContentRight>
        <S.TableRowButtonDiv>
          <EditButton id={id} />
          <DeleteButton />
        </S.TableRowButtonDiv>
        <RangeBar />
        <RangeDescription
          openedIssueCount={milestoneData?.opened_issue_count}
          closedIssueCount={milestoneData?.closed_issue_count}
        />
      </S.TableRowContentRight>
    </S.TableRow>
  );
};

export default TabContentRow;
