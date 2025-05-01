import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { ThemeModeToggle } from "@/components/shared/theme-modal-toggle.jsx";

export default function PageLayout({ children, title }) {
    return (
        <SidebarInset>
            <header className="relative flex h-16 items-center justify-between border-b px-4">

                {/* LEFT */}
                <div className="flex h-16 items-center justify-between gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="h-4 mr-2" />


                    <div className="">
                        {title &&
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem>
                                        <BreadcrumbPage className="font-semibold">{title}</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        }
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-2">
                    <ThemeModeToggle />
                </div>
            </header>

            <div className="p-4">
                {children}
            </div>
        </SidebarInset>
    );
}
