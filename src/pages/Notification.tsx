import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Eye, Info, NotebookText, Shapes, Trash2 } from "lucide-react";
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
import React, { useEffect } from "react";
import { DeleteNotificaoPessoa, GetNotificacaoAll, GetNotificacaoId, PostNotificacaoPessoa, PostRead, PostReadAll } from "@/requests/Notificacao";
import moment from "moment";
import { toast } from "@/hooks/use-toast";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetCompromissoId } from "@/requests/Compromisso";
import { Badge } from "@/components/ui/badge";
import { taskStatus } from "@/data/enum";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GetUsuario } from "@/requests/Usuario";


export default function Notification() {

    const [notificacao, setNotificacao] = React.useState([])
    const [readModal, setReadModal] = React.useState<boolean>(false)
    const [readNotification, setReadNotification] = React.useState<boolean>(false)
    const [readItem, setReadItem] = React.useState<object>({})
    const [modal, setModal] = React.useState<boolean>(false)
    const [modalData, setModalData] = React.useState<object>({})
    const [modalCompromisso, setModalCompromisso] = React.useState<object>({})
    const [modalNotification, setModalNotification] = React.useState<object>([])
    const [modalUser, setModalUser] = React.useState<object>([])
    const [addUser, setAddUser] = React.useState<number>(0)

    async function initialLoad() {
        try {
            const { data: response } = await GetNotificacaoAll()
            setNotificacao(response.response)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao carregar os dados, tente novamente.",
                variant: "destructive",
            })
        }

    }

    useEffect(() => {
        initialLoad()
    }, [])
    function handleRead(item) {
        setReadItem(item)
        setReadModal(true)
    }

    const handleOpenModal = async (item) => {
        setModalData(item)
        setModal(true)
        const { data: request } = await GetCompromissoId({ id: item.idcompromisso })
        setModalCompromisso(request.response[0])
        const { data: requestNotification } = await GetNotificacaoId({ id: item.idnotificacao })
        setModalNotification(requestNotification.response)
        const { data: requestUser } = await GetUsuario();
        setModalUser(requestUser.response)
    }

    async function handleReadAll() {
        try {
            await PostReadAll()
            await initialLoad()
            setReadNotification(false)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao marcar todas as notificação como lidas, tente novamente.",
                variant: "destructive",
            })
        }
    }

    async function handleReadNotification() {
        try {
            await PostRead({ id: readItem.idnotificacao })
            await initialLoad()
            setReadNotification(false)
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao marcar essa notificação como lida, tente novamente.",
                variant: "destructive",
            })
        }
    }

    async function handleRemoveNotification(item) {
        try {
            await DeleteNotificaoPessoa({ idnotificacao: item.idnotificacao, idusuario: item.idusuario })
            const { data: requestNotification } = await GetNotificacaoId({ id: item.idnotificacao })
            setModalNotification(requestNotification.response)
            await initialLoad()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao remove usuário da notificação, tente novamente.",
                variant: "destructive",
            })
        }
    }

    async function handleAddNotification(item) {
        try {
            await PostNotificacaoPessoa({ idnotificacao: modalNotification[0].idnotificacao, idusuario: addUser })
            const { data: requestNotification } = await GetNotificacaoId({ id: modalNotification[0].idnotificacao })
            setModalNotification(requestNotification.response)
            await initialLoad()
        } catch (error) {
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao adicionar usuário da notificação, tente novamente.",
                variant: "destructive",
            })
        }
    }

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Notificação</h1>
                <p>Veja todas as notificação</p>
            </div>
            <div>
                <Dialog open={modal} onOpenChange={setModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Informações da notificação</DialogTitle>
                            <DialogDescription>
                                Veja dados sobre a notificação
                            </DialogDescription>
                        </DialogHeader>
                        <Tabs defaultValue="compromisse" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="compromisse" className="w-full">Compromissos</TabsTrigger>
                                <TabsTrigger value="notification" className="w-full">Notificações</TabsTrigger>
                            </TabsList>
                            <TabsContent value="compromisse" className="flex flex-col gap-2" >
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Info className="w-4" />
                                        <span className="font-bold">Titulo:</span>
                                    </div>
                                    <span>{modalCompromisso.titulo}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <NotebookText className="w-4" />
                                        <span className="font-bold">Descrição:</span>
                                    </div>
                                    <span>{modalCompromisso.descricao}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4" />
                                        <span className="font-bold">Data:</span>
                                    </div>
                                    <span>{modalCompromisso.datacompromisso} - {modalCompromisso.horario}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Shapes className="w-4" />
                                        <span className="font-bold">Descrição:</span>
                                    </div>
                                    <div>{modalCompromisso?.classificacao?.map((item) => {
                                        return (
                                            <Badge>{item}</Badge>
                                        )
                                    })}</div>
                                </div>
                                <div>
                                    <ScrollArea className="h-40 border-gray-200 border rounded">
                                        <Table>
                                            <TableHeader>
                                                <TableHead>Descrição</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Ação</TableHead>
                                            </TableHeader>
                                            <TableBody>
                                                {
                                                    modalCompromisso?.tarefa?.map((task, index) => (
                                                        <TableRow>
                                                            <TableCell>{task.descricao}</TableCell>
                                                            <TableCell>{taskStatus[task.status]}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }

                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </div>
                            </TabsContent>
                            <TabsContent value="notification" className="flex flex-col gap-2">
                                <div>
                                    <Label className="font-bold text-base">Cadastrar usuário</Label>
                                    <Select onValueChange={(e) => setAddUser(e)}>
                                        <div className="flex gap-2">
                                            <SelectTrigger >
                                                <SelectValue placeholder="Selecione o usuário" />
                                            </SelectTrigger>
                                            <Button onClick={() => handleAddNotification(modalCompromisso)}>Adicionar</Button>
                                        </div>
                                        <SelectContent >
                                            <SelectGroup>
                                                <SelectLabel>Usuários</SelectLabel>
                                                {modalUser?.map((item) => (
                                                    <SelectItem value={item.id}>{item.nome}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                </div>
                                <ScrollArea className="h-80 border-gray-200 border rounded">
                                    <Table>
                                        <TableHeader>
                                            <TableHead>Id</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead>Ação</TableHead>
                                        </TableHeader>
                                        <TableBody>
                                            {
                                                modalNotification?.map((item) => (
                                                    <TableRow>
                                                        <TableCell>{item.idusuario}</TableCell>
                                                        <TableCell>{item.nome}</TableCell>
                                                        <TableCell>
                                                            <Trash2 className="w-6 cursor-pointer" onClick={() => handleRemoveNotification(item)} />
                                                        </TableCell>
                                                    </TableRow>
                                                ))
                                            }

                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
                <AlertDialog>
                    <AlertDialogTrigger>
                        <Button><Eye /> Marcar todas como lidas</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Essa ação irá marcar todas as notificação como lidas.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleReadAll()}>Continuar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <AlertDialog open={readModal} onOpenChange={setReadModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Essa ação irá marcar essa notificação como lida.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>

                        <AlertDialogAction onClick={() => handleReadNotification()}>
                            Continuar
                        </AlertDialogAction>

                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Table>
                <TableCaption>Lista de notificações</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Data e hora</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {notificacao?.map((item) => (
                        <TableRow>
                            <TableCell className="font-medium">{item.titulo}</TableCell>
                            <TableCell>{item.descricao}</TableCell>
                            <TableCell>{moment(item.data).format("DD/MM/yyyy HH:mm")}</TableCell>
                            <TableCell>{item.visualizado ? "Lida" : "Não lida"}</TableCell>
                            <TableCell className="text-right">
                                <Button onClick={() => handleOpenModal(item)}>
                                    <Info /> Visualizar
                                </Button>
                                {!item.visualizado &&
                                    <Button className="ml-2" onClick={() => handleRead(item)}>
                                        <Eye /> Marcar como lida
                                    </Button>
                                }
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </section>
    )
}
