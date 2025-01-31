import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import * as React from "react"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { taskStatus } from "@/data/enum"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"

const CalendaryCreateContext = React.createContext(null)

function CalendaryTasks() {
    const [description, setDescription] = React.useState<string>("")
    const [status, setStatus] = React.useState<number>(0)
    const { tasks, setTasks } = React.useContext(CalendaryCreateContext)

    const handleRemoveTasks = (index) => {
        setTasks(tasks.filter((_, i) => i !== index))
    }

    const handleAddTasks = () => {
        setTasks([...tasks, { descricao: description, status: status }])
    }

    console.log(tasks)

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label htmlFor="taskDescription">Descrição</Label>
                <Input id="taskDescription" onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="taskStatus">Status</Label>
                <Select onValueChange={e => setStatus(e)} value={status}>
                    <SelectTrigger id="taskStatus">
                        <SelectValue placeholder="Selecione o status da tarefa" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={taskStatus["Andamento"]}>Andamento</SelectItem>
                        <SelectItem value={taskStatus["Pendente"]}>Pendente</SelectItem>
                        <SelectItem value={taskStatus["Cancelado"]}>Cancelado</SelectItem>
                        <SelectItem value={taskStatus["Concluido"]}>Concluido</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Button onClick={handleAddTasks}>Cadastrar tarefas</Button>
            </div>
            <div>
                <Label>Atividades cadastradas</Label>
                <ScrollArea className="h-40 border-gray-200 border rounded">
                    <Table>
                        <TableHeader>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Ação</TableHead>
                        </TableHeader>
                        <TableBody>
                            {
                                tasks.map((task, index) => (
                                    <TableRow>
                                        <TableCell>{task.descricao}</TableCell>
                                        <TableCell>{taskStatus[task.status]}</TableCell>
                                        <TableCell>
                                            <Trash2 className="w-5 cursor-pointer" onClick={() => handleRemoveTasks(index)} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div >
    )
}

type Checked = DropdownMenuCheckboxItemProps["checked"]
function CalendaryCategory() {
    const { categorias, setCategorias } = React.useContext(CalendaryCreateContext)

    const handleCheckedChange = (id: string, checked: boolean) => {
        setCategorias((prevState) =>
            prevState.map((category) =>
                category.id === id ? { ...category, checked } : category
            )
        );
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button>Categoria</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Categorias</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categorias.map((category) => (
                    <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={category.checked}
                        onCheckedChange={(checked) => handleCheckedChange(category.id, checked)}
                    >
                        {category.name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function CalendaryCompromisse() {
    const { nome, setNome, descricao, setDescricao, data, setData, hora, setHora } = React.useContext(CalendaryCreateContext)

    return (
        <div className="flex flex-col gap-4">
            <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" onChange={e => setNome(e.target.value)} value={nome} />
            </div>
            <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea id="descricao" onChange={e => setDescricao(e.target.value)} value={descricao} />
            </div>
            <div className="flex w-full gap-4">
                <div className="w-full">
                    <Label htmlFor="data">Data</Label>
                    <Input type="date" id="data" onChange={e => setData(e.target.value)} value={data} />
                </div>
                <div className="w-full">
                    <Label htmlFor="hora">Hora</Label>
                    <Input type="time" id="hora" onChange={e => setHora(e.target.value)} value={hora} />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <CalendaryCategory />
                <Label>Deseja cadastrar categorias?</Label>
            </div>
        </div>
    )
}

export function CalendaryNotification() {
    const [notification, setNotification] = React.useState<Array<object>>([])

    const [nome, setNome] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")
    const [hora, setHora] = React.useState<string>("")

    const handleAddNotification = () => {
        setNotification([...notification, { nome, description, hora }])
        setNome("")
        setDescription("")
        setHora("")
    }

    const handleRemoveNotification = (index: number) => {
        setNotification(notification.filter((_, i) => i !== index))
    }

    return (
        <div className="flex flex-col gap-4">

            <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="notification">Hora</Label>
                <Input type="datetime-local" id="notification" value={hora} onChange={e => setHora(e.target.value)} />
            </div>
            <Button onClick={() => handleAddNotification()}>Cadastrar</Button>
            <div>
                <Label>Notificações cadastradas</Label>
                <ScrollArea className="h-40 border-gray-200 border rounded">
                    <Table>
                        <TableHeader>
                            <TableHead>Nome</TableHead>
                            <TableHead>Descrição</TableHead>
                            <TableHead>Hora</TableHead>
                            <TableHead>Ação</TableHead>
                        </TableHeader>
                        <TableBody>
                            {
                                notification.map((notification, index) => (
                                    <TableRow>
                                        <TableCell>{notification.nome}</TableCell>
                                        <TableCell>{notification.description}</TableCell>
                                        <TableCell>{notification.hora}</TableCell>
                                        <TableCell>
                                            <Trash2 className="w-5 cursor-pointer" onClick={() => handleRemoveNotification(index)} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }

                        </TableBody>
                    </Table>
                </ScrollArea>
            </div>
        </div>
    )
}

export default function CalendaryCreate() {
    const categoriasList = [
        { id: "1", name: "Status Bar", checked: true },
        { id: "2", name: "Activity Bar", checked: false },
        { id: "3", name: "Panel", checked: false },
    ];


    const [nome, setNome] = React.useState<string>("")
    const [descricao, setDescricao] = React.useState<string>("")
    const [data, setData] = React.useState<string>("")
    const [hora, setHora] = React.useState<string>("")
    const [categorias, setCategorias] = React.useState<object[]>(categoriasList)
    const [tasks, setTasks] = React.useState<object[]>([])

    return (
        <CalendaryCreateContext.Provider value={{
            tasks,
            setTasks,
            nome,
            setNome,
            descricao,
            setDescricao,
            data,
            setData,
            hora,
            setHora,
            categorias,
            setCategorias
        }}>
            <div>
                <Dialog>
                    <DialogTrigger>
                        <Button>Cadastrar</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Cadastro de compromisso</DialogTitle>
                            <DialogDescription>
                                Preencha as informações abaixo para cadastrar um novo compromisso
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="compromisse" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="compromisse" className="w-full">Compromissos</TabsTrigger>
                                <TabsTrigger value="tasks" className="w-full">Tarefas</TabsTrigger>
                                <TabsTrigger value="notification" className="w-full">Notificação</TabsTrigger>
                            </TabsList>
                            <TabsContent value="compromisse" >
                                <CalendaryCompromisse />
                            </TabsContent>
                            <TabsContent value="tasks">
                                <CalendaryTasks />
                            </TabsContent>
                            <TabsContent value="notification">
                                <CalendaryNotification />
                            </TabsContent>
                        </Tabs>
                        <Button>Cadastrar compromisso</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </CalendaryCreateContext.Provider>
    )
}
