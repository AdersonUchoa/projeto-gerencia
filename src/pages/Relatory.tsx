import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"


function CardRelatory({ title, value }: { title: string, value: number }) {
    return (
        <div className="border border-gray-200">
            <h1>{title}</h1>
            <span>{value}</span>
        </div>
    )
}

export default function Relatory() {
    const chartData = [
        { month: "January", andamento: 400, pendente: 186, concluido: 80, cancelado: 20 },
        { month: "January2", andamento: 400, pendente: 186, concluido: 80, cancelado: 20 },
        { month: "January3", andamento: 400, pendente: 186, concluido: 80, cancelado: 20 },
    ]

    const chartConfig = {
        andamento: {
            label: "Em andamento",
            color: "#1b83c0",
        },
        pendente: {
            label: "Pendente",
            color: "#ffee30",
        },
        concluido: {
            label: "Concluido",
            color: "#1fe94f",
        },
        cancelado: {
            label: "Cancelado",
            color: "#ff0000"
        }
    } satisfies ChartConfig

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Relatório</h1>
                <p>Monte relatórios para ter uma melhor visualização dos seus compromissos.</p>
            </div>
            <div>
                <Popover>
                    <PopoverTrigger>
                        <Button>Filtrar</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div>
                            <Label>Mês inicio</Label>
                            <Input type="date" />
                        </div>
                        <div>
                            <Label>Mês fim</Label>
                            <Input type="date" />
                        </div>
                        <Button>Definir filtro</Button>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col">
                <span>Dados referente a todo o periodo selecionado</span>
                <div className="flex gap-4 self-center">
                    <CardRelatory title="Total de compromissos em andamento" value={100} />
                    <CardRelatory title="Total de compromissos pendentes" value={20} />
                    <CardRelatory title="Total de compromissos concluídos" value={80} />
                    <CardRelatory title="Total de compromissos cancelados" value={20} />
                </div>
            </div>
            <div>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar dataKey="andamento" fill="var(--color-andamento)" radius={4} />
                        <Bar dataKey="pendente" fill="var(--color-pendente)" radius={4} />
                        <Bar dataKey="cancelado" fill="var(--color-cancelado)" radius={4} />
                        <Bar dataKey="concluido" fill="var(--color-concluido)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </div>
        </section>
    )
}

