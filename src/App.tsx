import { Box, Flex, Heading } from "@radix-ui/themes";
import { CreateTaskForm } from "./components/CreateTasksForm";
import TaskBoard from "./components/TaskBoard";
import { TasksContextProvider } from "./contexts/TasksContext";

const App: React.FC = () => {
  return (
    <TasksContextProvider>
      <Box maxWidth="80rem" mx="auto">
        <Box height="4rem">
          <Flex align="center" gap="4" height="100%">
            <Heading as="h1" size="8" weight="light">React kanban</Heading>
            <CreateTaskForm />
          </Flex>
        </Box>
        <Box>
          <Heading mb={"4"} as="h2">Quadro de tarefas</Heading>
          <TaskBoard />
        </Box>
      </Box>
    </TasksContextProvider>
  )
}

export default App