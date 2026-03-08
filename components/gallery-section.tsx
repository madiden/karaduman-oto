"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryPhoto } from "@/types";

interface GallerySectionProps {
    photos: GalleryPhoto[];
}

export function GallerySection({ photos }: GallerySectionProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (photos.length === 0) return null;

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % photos.length);
        }
    };

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);
        }
    };

    return (
        <section className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground mb-8 text-center">
                Galerimiz
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <div
                        key={photo.id}
                        className="relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden cursor-pointer group border border-zinc-200 dark:border-zinc-700"
                        onClick={() => openLightbox(index)}
                    >
                        <Image
                            src={photo.image_url}
                            alt={photo.caption || "Galeri fotoğrafı"}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {photo.caption && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <p className="text-white text-sm">{photo.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
                        onClick={closeLightbox}
                    >
                        <X className="h-8 w-8" />
                    </button>

                    {/* Navigation */}
                    {photos.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 text-white/80 hover:text-white z-10 bg-black/30 rounded-full p-2"
                                onClick={goPrev}
                            >
                                <ChevronLeft className="h-8 w-8" />
                            </button>
                            <button
                                className="absolute right-4 text-white/80 hover:text-white z-10 bg-black/30 rounded-full p-2"
                                onClick={goNext}
                            >
                                <ChevronRight className="h-8 w-8" />
                            </button>
                        </>
                    )}

                    {/* Image */}
                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full h-full m-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={photos[lightboxIndex].image_url}
                            alt={photos[lightboxIndex].caption || "Galeri fotoğrafı"}
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Caption */}
                    {photos[lightboxIndex].caption && (
                        <div className="absolute bottom-6 left-0 right-0 text-center">
                            <p className="text-white/90 text-sm bg-black/50 inline-block px-4 py-2 rounded-lg">
                                {photos[lightboxIndex].caption}
                            </p>
                        </div>
                    )}

                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/60 text-sm">
                        {lightboxIndex + 1} / {photos.length}
                    </div>
                </div>
            )}
        </section>
    );
}
