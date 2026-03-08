"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function DeleteCarButton({ carId }: { carId: string }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!confirm("Bu ilanı silmek istediğinize emin misiniz?")) return;

        setLoading(true);
        try {
            const { error } = await supabase.from("cars").delete().eq("id", carId);
            if (error) throw error;
            router.refresh();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Bilinmeyen hata";
            alert("Silme hatası: " + msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleDelete}
            disabled={loading}
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Trash2 className="h-4 w-4" />
            )}
        </Button>
    );
}
