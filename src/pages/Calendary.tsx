import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import CalendaryCreate from "@/pages/Calendary/CalendaryCreate"

export default function Calendary() {
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
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-medium">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                        <TableCell>Credit Card</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell className="text-right">
                            <Button><Eye />Visualizar</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </section>
    )
}
