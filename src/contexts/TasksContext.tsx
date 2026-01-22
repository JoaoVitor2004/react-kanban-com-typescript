import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Tasks } from "../entities/Tasks";
import { tasksServices } from "../services/api";

export interface TasksContextData {
    tasks: Tasks[]
    createTasks: (attributes: Omit<Tasks, "id">) => Promise<void>,
    updateTasks: (id: string, attributes: Partial<Omit<Tasks, "id">>) => Promise<void> // Ele omit todas as propriedades da interface Tasks tirando o id e acaba deixando eles opcionais
    deleteTasks: (id: string) => Promise<void>
}

export const TasksContext = createContext({} as TasksContextData)

interface TasksChildren {
    children: ReactNode
}

export const TasksContextProvider: React.FC<TasksChildren> = ({ children }) => {

    const [tasks, setTasks] = useState<Tasks[]>([])

    useEffect(() => {
        tasksServices.fecthTasks().then((tasks) => {
            setTasks(tasks)
        })
    }, [])

    const createTasks = async (attributes: Omit<Tasks, "id">) => {

        const newTask = await tasksServices.createTasks(attributes)

        setTasks((currentState) => {
            const newTasks = [...currentState, newTask]
            return newTasks
        })
    }

    const updateTasks = async (id: string, attributes: Partial<Omit<Tasks, "id">>) => {

        await tasksServices.updateTasks(id, attributes)

        setTasks((currentState) => {
            const copyTask = [...currentState] // copia a tarefa atual
            const findIndex = copyTask.findIndex(task => task.id === id) // Pega o primeiro indice que ele encontrar com base no id
            Object.assign(copyTask[findIndex], attributes)
            return copyTask
        })
    }

    const deleteTasks = async (id: string) => {
        await tasksServices.deleteTasks(id)
        setTasks(currentState => currentState.filter(task => task.id !== id))
    }

    return (
        <TasksContext.Provider value={{ tasks, createTasks, updateTasks, deleteTasks }}>
            {children}
        </TasksContext.Provider>
    )
}