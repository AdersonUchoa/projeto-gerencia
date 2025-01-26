import { Bell, BellDot, Calendar, ChartNoAxesCombined, Home, LogOut } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AuthContext } from "@/Auth"
import { useContext } from "react"

import Logo from "@/assets/logo.png"

const items = [
    {
        title: "Inicio",
        url: "/",
        icon: Home,
    },
    {
        title: "Agenda",
        url: "/agenda",
        icon: Calendar,
    },
    {
        title: "Relatório",
        url: "/relatorio",
        icon: ChartNoAxesCombined
    },
    {
        title: "Notificação",
        url: "/notificacao",
        icon: Bell
    },
    {
        title: "Sair",
        url: "/sair",
        icon: LogOut,
    },
]

export function SideBar() {
    const { logout } = useContext(AuthContext)

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <img className="w-24 mx-auto rounded-2xl" src={Logo} />
                    <SidebarGroupLabel>Gerência agenda</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        {
                                            item.title === "Sair" ?
                                                <a onClick={logout}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                                :
                                                <a href={item.url}>
                                                    <item.icon />
                                                    <span>{item.title}</span>
                                                </a>
                                        }

                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
