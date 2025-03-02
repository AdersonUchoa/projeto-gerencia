import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
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
import { GetNotificacaoAll, PostRead, PostReadAll } from "@/requests/Notificacao";
import moment from "moment";
import { toast } from "@/hooks/use-toast";

export default function Notification() {

    const [notificacao, setNotificacao] = React.useState([])
    const [readModal, setReadModal] = React.useState<boolean>(false)
    const [readNotification, setReadNotification] = React.useState<boolean>(false)
    const [readItem, setReadItem] = React.useState<object>({})

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

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Notificação</h1>
                <p>Veja todas as notificação</p>
            </div>
            <div>
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
                                {!item.visualizado &&
                                    <Button onClick={() => handleRead(item)}>
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
