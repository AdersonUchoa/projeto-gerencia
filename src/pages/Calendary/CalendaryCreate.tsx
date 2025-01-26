import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"


import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

function CalendaryTasks() {
    return (
        <Dialog>
            <DialogTrigger>
                <Button>Atividades</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Atividades</DialogTitle>
                    <DialogDescription>Preencha os dados para cadastrar atividades</DialogDescription>
                </DialogHeader>
                <div>
                    <Label>Descrição</Label>
                    <Input />
                </div>
                <div>
                    <Label>Status</Label>
                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Button>Cadastrar</Button>
                </div>
                <div>
                    <Label>Atividades cadastradas</Label>
                    <ScrollArea className="h-40 border-gray-200 border rounded">
                        <div className=" flex flex-col">
                            <span className="p-2">teste</span>
                            <span className="p-2">teste</span>
                            <span className="p-2">teste</span>

                        </div>
                    </ScrollArea>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function CalendaryCategory() {
    const frameworks = [
        {
            value: "next.js",
            label: "Next.js",
        },
        {
            value: "sveltekit",
            label: "SvelteKit",
        },
        {
            value: "nuxt.js",
            label: "Nuxt.js",
        },
        {
            value: "remix",
            label: "Remix",
        },
        {
            value: "astro",
            label: "Astro",
        },
    ]

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {frameworks.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default function CalendaryCreate() {
    return (
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
                    <div>
                        <Label>Nome</Label>
                        <Input />
                    </div>
                    <div>
                        <Label>Categoria</Label>
                        <CalendaryCategory />
                    </div>
                    <div>
                        <Label>Descrição</Label>
                        <Textarea />
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <Label>Data</Label>
                            <Input type="date" />
                        </div>
                        <div className="w-full">
                            <Label>Hora</Label>
                            <Input type="time" />
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <CalendaryTasks />
                        <Label>Deseja cadastrar atividades?</Label>
                    </div>
                    <Button>Cadastrar</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}
