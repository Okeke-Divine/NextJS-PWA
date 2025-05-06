import PageLayout from "@/components/shared/page-layout";
import PWAInstallButton from "@/components/shared/pwa-install-button"

export default function Dashboard() {
    return (
        <>
            <PageLayout title="Dashboard">
                this is the dashboard page
                <br />
                PWAInstallButton
            </PageLayout>
        </>
    )
}