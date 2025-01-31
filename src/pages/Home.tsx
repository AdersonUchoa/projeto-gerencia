import Logo from "@/assets/logo.png"


export default function Home() {
    return (
        <div className="max-w-4xl flex flex-col items-center gap-4 justify-center h-[80vh]">
            <img className="w-32 rounded-2xl" src={Logo} />
            <p className="text-justify text-lg">
                Bem-vindo ao Gerencia Agenda! Simplifique sua organização e tenha controle total sobre seus compromissos. Estamos aqui para ajudar você a gerenciar seu tempo de maneira eficiente e prática!
            </p>
        </div>
    )
}
