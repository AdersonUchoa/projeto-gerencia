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
import React from "react";

function NotificationReadAll() {
    return (
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
                    <AlertDialogAction>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function Notification() {

    const [readModal, setReadModal] = React.useState<boolean>(false)
    const [readNotification, setReadNotification] = React.useState<boolean>(false)
    function handleRead(item) {
        setReadModal(true)
    }

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Notificação</h1>
                <p>Veja todas as notificação</p>
            </div>
            <div>
                <NotificationReadAll />
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
                        <AlertDialogAction>Continuar</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <Table>
                <TableCaption>Lista de compromissos</TableCaption>
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
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>Lida</TableCell>
                        <TableCell className="text-right">
                            <Button onClick={() => handleRead("item")}>
                                <Eye /> Marcar como lida
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}
