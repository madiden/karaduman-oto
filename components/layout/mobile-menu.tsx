"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { encodeWhatsAppLink } from "@/lib/whatsapp";

export function MobileMenu({ whatsapp }: { whatsapp: string | null }) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const close = () => setOpen(false);

    const drawer = (
        <div
            className="fixed inset-x-0 top-20 bottom-0 z-[60] bg-white dark:bg-zinc-950 md:hidden animate-fade-in shadow-2xl"
            onClick={close}
        >
            <nav
                className="container px-4 py-8 flex flex-col gap-1 text-lg font-medium"
                onClick={(e) => e.stopPropagation()}
            >
                <Link href="/" onClick={close} className="py-4 border-b border-border transition-colors hover:text-red-600">
                    Ana Sayfa
                </Link>
                <Link href="/ilanlar" onClick={close} className="py-4 border-b border-border transition-colors hover:text-red-600">
                    İlanlar
                </Link>
                <Link href="/hakkimizda" onClick={close} className="py-4 border-b border-border transition-colors hover:text-red-600">
                    Hakkımızda
                </Link>
                <Link href="/iletisim" onClick={close} className="py-4 border-b border-border transition-colors hover:text-red-600">
                    İletişim
                </Link>
                {whatsapp && (
                    <Link href={encodeWhatsAppLink(whatsapp)} target="_blank" onClick={close} className="mt-6">
                        <Button className="bg-green-600 hover:bg-green-700 text-white gap-2 w-full">
                            <Phone className="h-4 w-4" />
                            WhatsApp
                        </Button>
                    </Link>
                )}
            </nav>
        </div>
    );

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
                aria-expanded={open}
                className="md:hidden relative z-50"
            >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            {mounted && open && createPortal(drawer, document.body)}
        </>
    );
}
