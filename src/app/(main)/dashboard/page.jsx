import PageLayout from "@/components/shared/page-layout";
import PWAInstallButton from "@/components/my-app/pwa-installer"

export default function Dashboard() {
    return (
        <>
            <PageLayout title="Dashboard">
                this is the dashboard page
                <br />
                <PWAInstallButton />
            </PageLayout>
        </>
    )
}