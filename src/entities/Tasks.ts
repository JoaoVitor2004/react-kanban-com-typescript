export type TasksStatus = "todo" | "doing" | "done"
export type TasksPriority = "low" | "medium" | "high"

export interface Tasks {
    id: string,
    title: string,
    description: string,
    status: TasksStatus,
    priority: TasksPriority
}