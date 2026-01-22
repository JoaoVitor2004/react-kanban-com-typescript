import { PlusIcon } from "@radix-ui/react-icons"
import { Badge, Box, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes/src/index.js"
import type { FormEventHandler } from "react"
import z from "zod"
import { useTasks } from "../Hooks/useTasks"

export const CreateTaskForm: React.FC = () => {

    const { createTasks } = useTasks()

    const TasksSheme = z.object({
        title: z.string(),
        description: z.string(),
        status: z.enum(["todo", "doing", "done"]),
        priority: z.enum(["low", "medium", "high"]),
    })

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => { // tipa a função para evento de submit de um formulário

        ev.preventDefault()

        const formData = new FormData(ev.currentTarget) // essa classe extrai os dados do meu formulario, pegando os valores dos meus inputs atraves do atributo "name"

        const title = formData.get("title")
        const description = formData.get("description")
        const status = formData.get("status")
        const priority = formData.get("priority")

        ev.currentTarget.reset() // metodo que assim que enviar os dados os campos ficam vazios

        const data = TasksSheme.parse({ title, description, status, priority }) // guarda os dados num objeto

        await createTasks(data)
        
        console.log(data)
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button>
                    <PlusIcon /> nova tarefa
                </Button>
            </Dialog.Trigger>
            <Dialog.Content maxWidth="32rem">
                <Dialog.Title mb="3">Nova Tarefa</Dialog.Title>
                <Dialog.Description mb="6">Adicione novas tarefas ao quadro</Dialog.Description>
                <form onSubmit={handleSubmit}>
                    <Flex direction="column" gap="4">
                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="title">Título</Text>
                                <TextField.Root placeholder="Digite um título" name="title" id="title" autoFocus required />
                            </Box>
                        </Box>
                        <Box maxWidth="32rem">
                            <Box mb="2">
                                <Text as="label" htmlFor="description">Descrição</Text>
                                <TextArea placeholder="Digite uma descrição" name="description" id="description" required />
                            </Box>
                        </Box>
                        <Flex align="center" gap="5">
                            <Box>
                                <Text as="div" mb="2">Situação</Text>
                                <Box>
                                    <RadioGroup.Root name="status" defaultValue="todo">
                                        <RadioGroup.Item value="todo">
                                            <Badge color="gray">
                                                Para fazer
                                            </Badge>
                                        </RadioGroup.Item>
                                        <RadioGroup.Item value="doing">
                                            <Badge color="yellow">
                                                Em progresso
                                            </Badge>
                                        </RadioGroup.Item>
                                        <RadioGroup.Item value="done">
                                            <Badge color="green">
                                                Concluido
                                            </Badge>
                                        </RadioGroup.Item>
                                    </RadioGroup.Root>
                                </Box>
                            </Box>
                            <Box>
                                <Text as="div" mb="2">Prioridade</Text>
                                <RadioGroup.Root name="priority" defaultValue="low">
                                    <RadioGroup.Item value="low">
                                        <Badge color="sky">
                                            Baixa
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="medium">
                                        <Badge color="amber">
                                            Média
                                        </Badge>
                                    </RadioGroup.Item>
                                    <RadioGroup.Item value="high">
                                        <Badge color="tomato">
                                            Alta
                                        </Badge>
                                    </RadioGroup.Item>
                                </RadioGroup.Root>
                            </Box>
                        </Flex>
                        <Flex justify="end" gap="3">
                            <Dialog.Close>
                                <Button color="gray" variant="outline">Cancelar</Button>
                            </Dialog.Close>
                            <Button type="submit">Criar tarefa</Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}