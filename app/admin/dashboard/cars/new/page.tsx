import { CarForm } from "@/components/admin/car-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewCarPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/dashboard/cars" className="text-zinc-500 hover:text-zinc-900 transition-colors">
                    <ArrowLeft className="h-5 w-5" />
                </Link>
                <h1 className="text-2xl font-bold tracking-tight">Yeni İlan Ekle</h1>
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
                <CarForm />
            </div>
        </div>
    );
}
