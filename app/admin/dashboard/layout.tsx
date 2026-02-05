import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Car, MessageSquare, LogOut, Home } from "lucide-react";
import { headers, cookies } from "next/headers";


export default async function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // The `setAll` method was called from a Server Component.
                        // This can be ignored if you have middleware refreshing
                        // user sessions.
                    }
                },
            },
        }
    );

    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        redirect("/admin");
    }

    // Double check admin table
    const { data: adminUser } = await supabase
        .from("admins")
        .select("email")
        .eq("email", session.user.email)
        .single();

    if (!adminUser) {
        // User is logged in but not an admin
        // Force signout or show unauthorized
        await supabase.auth.signOut();
        redirect("/admin?error=Unauthorized");
    }

    return (
        <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800">
                    <Link href="/" className="font-bold text-xl tracking-tight flex items-center gap-1">
                        <span className="text-red-600">Karaduman</span>
                        <span>Admin</span>
                    </Link>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LayoutDashboard className="h-4 w-4" /> Genel Bakış
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/cars">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Car className="h-4 w-4" /> İlan Yönetimi
                        </Button>
                    </Link>
                    <Link href="/admin/dashboard/comments">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <MessageSquare className="h-4 w-4" /> Yorumlar
                        </Button>
                    </Link>
                </nav>
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
                    <Link href="/">
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <Home className="h-4 w-4" /> Siteye Dön
                        </Button>
                    </Link>
                    <form action="/auth/signout" method="post">
                        <Button variant="outline" className="w-full justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50" type="submit">
                            <LogOut className="h-4 w-4" /> Çıkış Yap
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
