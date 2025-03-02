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
import { useEffect, useState } from "react"
import { GetRelatorio } from "@/requests/Relatorio"
import moment from "moment"
import { toast } from "@/hooks/use-toast"


function CardRelatory({ title, value }: { title: string, value: number }) {
    return (
        <div className="border border-gray-200 p-4 rounded">
            <h1 className="font-bold">{title}</h1>
            <span>{value}</span>
        </div>
    )
}

export default function Relatory() {

    const [chartInfo, setChartInfo] = useState([])
    const [dtInicio, setDtInicio] = useState(moment().subtract(1, "month").format("yyyy/MM/DD"))
    const [dtFim, setDtFim] = useState(moment().format("yyyy/MM/DD"))
    const [open, setOpen] = useState(false)

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


    const initialLoad = async () => {
        try {
            const { data: dataRelatorio } = await GetRelatorio({ dtInicio: dtInicio, dtFim: dtFim })

            const response = dataRelatorio.response

            console.log(response)

            const chartData = [
                { month: `${dtInicio} - ${dtFim}`, andamento: response.andamento[0].count, pendente: response.pendente[0].count, concluido: response.concluido[0].count, cancelado: response.cancelado[0].count },
            ]
            setChartInfo(chartData)
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

    return (
        <section className="flex flex-col w-full gap-4">
            <div>
                <h1 className="font-bold">Relatório</h1>
                <p>Monte relatórios para ter uma melhor visualização dos seus compromissos.</p>
            </div>
            <div>
                <Popover open={open}>
                    <PopoverTrigger onClick={() => setOpen(true)}>
                        <Button>Filtrar</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex flex-col gap-4">

                            <div>
                                <Label>Mês inicio</Label>
                                <Input onChange={e => setDtInicio(e.target.value)} type="date" />
                            </div>
                            <div>
                                <Label>Mês fim</Label>
                                <Input onChange={e => setDtFim(e.target.value)} type="date" />
                            </div>
                            <Button onClick={async () => {
                                await initialLoad()
                                setOpen(false)
                            }}>Definir filtro</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col items-center gap-4">
                <span>Dados referente a todo o periodo selecionado</span>
                <div className="flex gap-4">
                    <CardRelatory title="Total de compromissos em andamento" value={chartInfo[0]?.andamento ?? 0} />
                    <CardRelatory title="Total de compromissos pendentes" value={chartInfo[0]?.pendente ?? 0} />
                    <CardRelatory title="Total de compromissos cancelados" value={chartInfo[0]?.cancelados ?? 0} />
                    <CardRelatory title="Total de compromissos concluídos" value={chartInfo[0]?.concluidos ?? 0} />
                </div>
            </div>
            <div>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <BarChart accessibilityLayer data={chartInfo}>
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
