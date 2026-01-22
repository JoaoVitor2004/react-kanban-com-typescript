import { Badge, Button, Card, Flex, Heading, Text } from "@radix-ui/themes"
import type { Tasks, TasksPriority, TasksStatus } from "../entities/Tasks"
import { useTasks } from "../Hooks/useTasks"

interface TasksProps {
    task: Tasks
}

export const TaskCard: React.FC<TasksProps> = ({ task }) => {

    const { deleteTasks, updateTasks } = useTasks()

    const getActionText = (status: TasksStatus) => {

        const texts = {
            "todo": "Iniciar",
            "doing": "Fazer",
            "done": "Arquivar"
        }

        return texts[status]

    }

    const getActionTextPriority = (priority: TasksPriority) => {

        const texts = {
            "low": "Baixa",
            "medium": "Média",
            "high": "Alta"
        }

        return texts[priority]

    }

    const getActionColor = (status: TasksStatus) => {

        const colors: { [key: string]: "indigo" | "green" | "bronze" } = {
            "todo": "indigo",
            "doing": "green",
            "done": "bronze"
        }

        return colors[status]

    }

    const getPriorityColor = (priority: TasksPriority) => {

        const priorityColor: { [key: string]: "sky" | "amber" | "tomato" } = {
            "low": "sky",
            "medium": "amber",
            "high": "tomato"
        }

        return priorityColor[priority]
    }

    const handleUpdateTask = async () => {

        if (task.status === "todo") {
            updateTasks(task.id, { status: "doing" })
        }

        if (task.status === "doing") {
            updateTasks(task.id, { status: "done" })
        }
    }

    const handleDeleteTask = () => {
        const confirmation = confirm("Deseja excluir a tarefa?")
        confirmation ? deleteTasks(task.id) : alert("Ok")
    }

    return (
        <Card>
            <Flex align={"center"} gap={"4"}>
                <Heading as="h3" size={"3"}>{task.title}</Heading>
                <Badge color={getPriorityColor(task.priority)}> { getActionTextPriority(task.priority) } </Badge>
            </Flex>
            <Text as="p" my={"4"}>{task.description}</Text>
            <Flex gap={"4"}>
                {
                    task.status !== "done" && (
                        <Button onClick={handleUpdateTask} color={getActionColor(task.status)}>
                            {getActionText(task.status)}
                        </Button>
                    )
                }
                <Button onClick={handleDeleteTask} color="red">Excluir</Button>
            </Flex>
        </Card>
    )
}