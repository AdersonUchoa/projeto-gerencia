import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Pencil } from "lucide-react"
import CalendaryCreate from "@/pages/Calendary/CalendaryCreate"
import { useState } from "react"

export default function Calendary() {
    const [editModal, setEditModal] = useState<boolean>(false)

    function handleEditCrompromisse(item) {
        console.log(item)
        setEditModal(true)
    }

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Agenda</h1>
                <p>Organize sua rotina! Aqui você pode visualizar todos os seus compromissos e criar novas tarefas para manter seu dia sempre em ordem.</p>
            </div>
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
                    <TableRow>
                        <TableCell className="font-medium">Agenda</TableCell>
                        <TableCell>Teste</TableCell>
                        <TableCell>12/03/2025</TableCell>
                        <TableCell>19:20</TableCell>
                        <TableCell className="text-right">
                            <Button onClick={() => handleEditCrompromisse("ds")}>
                                <Pencil />Abrir
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}
