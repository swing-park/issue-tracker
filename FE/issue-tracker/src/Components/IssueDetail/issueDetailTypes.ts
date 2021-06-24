export type IssueDetailType = {
  id: number;
  title: string;
  number: number;
  author: authorType;
  created_time: string;
  milestone?: issueMilestoneType;
  labels?: issueLabelType[];
  open: boolean;
  assignee?: authorType[];
  comments?: commentType[];
};

export type commentType = {
  author: authorType;
  created_time: string;
  comment: string;
  id: number;
};

export type issueLabelType = {
  id: number;
  title: string;
  color: string;
};

export type issueMilestoneType = {
  id: number;
  title: string;
  closed_issue_count: number;
  opened_issue_count: number;
};

export type authorType = {
  id: number;
  name: string;
  image_url: string;
};