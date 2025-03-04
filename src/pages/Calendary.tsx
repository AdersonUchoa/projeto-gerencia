import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil, Trash2, X } from "lucide-react"
import CalendaryCreate from "@/pages/Calendary/CalendaryCreate"
import { useEffect, useState } from "react"
import { DeleteCompromisso, GetCompromisso, PutCompromisso } from "@/requests/Compromisso"
import { toast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { taskStatus } from "@/data/enum"
import { DeleteTarefa, PostTarefa } from "@/requests/Tarefa"
import { DeleteNotificacao, PostNotificacao } from "@/requests/Notificacao"
import moment from "moment"

export default function Calendary() {
    const [editModal, setEditModal] = useState<boolean>(false)
    const [editModalData, setEditModalData] = useState<any>({})
    const [compromissos, setCompromissos] = useState([])
    const [removeModal, setRemoveModal] = useState<boolean>(false)
    const [removeModalData, setRemoveModalData] = useState<any>({})
    const [tarefaNome, setTarefaNome] = useState<string>("")
    const [tarefaStatus, setTarefaStatus] = useState<number>(0)
    const [notificationNome, setNotificationNome] = useState<string>("")
    const [notificationDescription, setNotificationDescription] = useState<string>("")
    const [notificationHora, setNotificationHora] = useState<string>("")

    async function loadCompromisso() {
        const data = await GetCompromisso()
        setCompromissos(data.data.response)
    }
    useEffect(() => {
        try {
            loadCompromisso()
        } catch (error) {
            toast({
                title: "Erro ao carregar compromisso",
                description: "Ocorreu um erro ao carregar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }, [])

    const handleRemoveCompromisso = async (id: int) => {
        try {
            await DeleteCompromisso(id);
            await loadCompromisso();
            setRemoveModal(false);
        } catch (error) {
            toast({
                title: "Erro ao deletar compromisso",
                description: "Ocorreu um erro ao deletar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleEditCompromisso = async () => {
        try {
            console.log(editModalData)
            await PutCompromisso({
                id: editModalData.id,
                titulo: editModalData.titulo,
                descricao: editModalData.descricao,
                datacompromisso: editModalData.datacompromisso,
                horario: editModalData.horario
            })
            await loadCompromisso();
            setEditModal(false);
        } catch (error) {
            toast({
                title: "Erro ao editar compromisso",
                description: "Ocorreu um erro ao editar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleAddTarefa = async () => {
        try {
            const { data: response } = await PostTarefa({
                idCompromisso: editModalData.id,
                descricao: tarefaNome,
                status: tarefaStatus,
            })
            setEditModalData({ ...editModalData, tarefa: [...editModalData.tarefa ?? [], { id: response.response.id, descricao: tarefaNome, status: tarefaStatus }] })
            setTarefaNome("")
            setTarefaStatus(0)
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao editar compromisso",
                description: "Ocorreu um erro ao editar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleRemoveTarefa = async (id: int) => {
        try {
            await DeleteTarefa({ id: id });
            setEditModalData({ ...editModalData, tarefa: editModalData.tarefa.filter((item: any) => item.id != id) })
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao deletar compromisso",
                description: "Ocorreu um erro ao deletar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleRemoveNotification = async (id: int) => {
        try {
            await DeleteNotificacao({ id: id });
            setEditModalData({ ...editModalData, notificacao: editModalData.notificacao.filter((item: any) => item.id != id) })
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao deletar compromisso",
                description: "Ocorreu um erro ao deletar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    const handleAddNotification = async () => {
        try {
            const { data: response } = await PostNotificacao({
                idCompromisso: editModalData.id,
                titulo: notificationNome,
                descricao: notificationDescription,
                hora: notificationHora
            })
            setEditModalData({ ...editModalData, notificacao: [...editModalData.notificacao ?? [], { id: response.response.id, titulo: notificationNome, descricao: notificationDescription, hora: notificationHora }] })
            setNotificationNome("")
            setNotificationDescription("")
            setNotificationHora("")
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao editar compromisso",
                description: "Ocorreu um erro ao editar compromisso, tente novamente.",
                variant: "destructive",
            })
        }
    }

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Agenda</h1>
                <p>Organize sua rotina! Aqui você pode visualizar todos os seus compromissos e criar novas tarefas para manter seu dia sempre em ordem.</p>
            </div>
            <AlertDialog onOpenChange={setRemoveModal} open={removeModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Deseja remover esse compromisso?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação vai remover permanentemente esse compromisso ({removeModalData.titulo}).
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleRemoveCompromisso(removeModalData.id)}>Confirmar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Dialog open={editModal} onOpenChange={setEditModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar compromisso</DialogTitle>
                        <DialogDescription>
                            Preencha as informações abaixo para editar o compromisso
                        </DialogDescription>
                    </DialogHeader>
                    <Tabs defaultValue="compromisse" className="w-full">
                        <TabsList className="w-full">
                            <TabsTrigger value="compromisse" className="w-full">Compromissos</TabsTrigger>
                            <TabsTrigger value="tasks" className="w-full">Tarefas</TabsTrigger>
                            <TabsTrigger value="notification" className="w-full">Notificação</TabsTrigger>
                        </TabsList>
                        <TabsContent value="compromisse" >
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input id="nome" value={editModalData.titulo} onChange={e => setEditModalData({ ...editModalData, titulo: e.target.value })} />
                                </div>
                                <div>
                                    <Label htmlFor="descricao">Descrição</Label>
                                    <Textarea id="descricao" value={editModalData.descricao} onChange={e => setEditModalData({ ...editModalData, descricao: e.target.value })} maxLength={255} />
                                </div>
                                <div className="flex w-full gap-4">
                                    <div className="w-full">
                                        <Label htmlFor="data">Data</Label>
                                        <Input type="date" value={editModalData.datacompromisso} onChange={e => setEditModalData({ ...editModalData, datacompromisso: e.target.value })} id="data" />
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="hora">Hora</Label>
                                        <Input type="time" value={editModalData.horario} onChange={e => setEditModalData({ ...editModalData, horario: e.target.value })} id="hora" />
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    {/* <CalendaryCategory /> */}
                                    {/* <Label>Deseja cadastrar categorias?</Label> */}
                                </div>
                                <Button onClick={() => handleEditCompromisso()}>Editar compromisso</Button>
                            </div>
                        </TabsContent>
                        <TabsContent value="tasks">
                            <div className="flex flex-col gap-4">
                                <div>
                                    <Label htmlFor="taskDescription" >Descrição</Label>
                                    <Input id="taskDescription" onChange={e => setTarefaNome(e.target.value)} value={tarefaNome} />
                                </div>
                                <div>
                                    <Label htmlFor="taskStatus">Status</Label>
                                    <Select onValueChange={e => setTarefaStatus(e)} value={tarefaStatus}>
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
                                    <Button onClick={() => handleAddTarefa()}>Cadastrar tarefas</Button>
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
                                                    editModalData?.tarefa?.map((task, index) => (
                                                        <TableRow>
                                                            <TableCell>{task.descricao}</TableCell>
                                                            <TableCell>{taskStatus[task.status]}</TableCell>
                                                            <TableCell>
                                                                <Trash2 className="w-5 cursor-pointer" onClick={() => handleRemoveTarefa(task.id)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }

                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </div>
                            </div >
                        </TabsContent>
                        <TabsContent value="notification">
                            <div className="flex flex-col gap-4">

                                <div>
                                    <Label htmlFor="nome">Nome</Label>
                                    <Input id="nome" value={notificationNome} onChange={e => setNotificationNome(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="description">Descrição</Label>
                                    <Input id="description" value={notificationDescription} onChange={e => setNotificationDescription(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="notification">Hora</Label>
                                    <Input type="datetime-local" id="notification" value={notificationHora} onChange={e => setNotificationHora(e.target.value)} />
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
                                                    editModalData?.notificacao?.map((notification, index) => (
                                                        <TableRow>
                                                            <TableCell>{notification.titulo}</TableCell>
                                                            <TableCell>{notification.descricao}</TableCell>
                                                            <TableCell>{moment(notification.hora).format("DD/MM/yyyy HH:mm")}</TableCell>
                                                            <TableCell>
                                                                <Trash2 className="w-5 cursor-pointer" onClick={() => handleRemoveNotification(notification.id)} />
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }

                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
            <CalendaryCreate />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Hora</TableHead>
                        <TableHead>Categorias</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        compromissos.map((item, index) =>
                            <TableRow>
                                <TableCell className="font-medium">{item.titulo}</TableCell>
                                <TableCell className="max-w-10 text-nowrap overflow-hidden text-ellipsis">{item.descricao}</TableCell>
                                <TableCell>{item.datacompromisso}</TableCell>
                                <TableCell>{item.horario}</TableCell>
                                <TableCell>{item.classificacao.map(classificacao => <Badge>{classificacao}</Badge>)}</TableCell>
                                <TableCell className="text-right">
                                    <Button onClick={() => {
                                        setRemoveModalData(item)
                                        setRemoveModal(true)
                                    }}>
                                        <X />
                                        Remover</Button>
                                    <Button className="ml-2" onClick={() => {
                                        setEditModalData(item)
                                        setEditModal(true)
                                    }
                                    }>
                                        <Pencil />Abrir
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    }

                </TableBody>
            </Table>
        </section>
    )
}
