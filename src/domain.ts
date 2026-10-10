export type UserRole = "ADMIN" | "REQUESTER";

export type TaskStatus =
  | "NEW"
  | "CLARIFYING"
  | "READY"
  | "IMPLEMENTING"
  | "TESTING"
  | "PR_CREATED"
  | "CHANGES_REQUESTED"
  | "PR_UPDATED"
  | "INTERRUPTED_NEEDS_RESUME"
  | "DONE"
  | "FAILED";

export interface Task {
  id: number;
  repoName: string;
  requestedByTelegramId: string;
  status: TaskStatus;
  branchName: string;
  worktreePath: string;
  codexSessionId?: string;
  githubPullRequestUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskEventType =
  | "USER_MESSAGE"
  | "AGENT_MESSAGE"
  | "STATUS_CHANGED"
  | "RUN_STARTED"
  | "RUN_FINISHED"
  | "PR_CREATED"
  | "ERROR";

export interface TaskEvent {
  id: number;
  taskId: number;
  type: TaskEventType;
  summary: string;
  createdAt: string;
}
