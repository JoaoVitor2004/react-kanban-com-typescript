import type { Tasks } from "../entities/Tasks";
// import ErrorComponent from "../components/ErrorComponent";

export const tasksServices = {
    async fecthTasks(): Promise<Tasks[]> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`)
        const data: Tasks[] = await response.json()
        return data
    },

    async createTasks(attributes: Omit<Tasks, "id">): Promise<Tasks> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(attributes)
        })
        const newTask: Tasks = await response.json()
        return newTask
    },

    async updateTasks (id: string, attributes: Partial<Omit<Tasks, "id">>): Promise<Tasks> {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(attributes)
        })
        const updateTask: Tasks = await response.json()
        return updateTask
    },

    async deleteTasks (id: string): Promise<void> {
        await fetch(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { method: "DELETE" })
    }
}