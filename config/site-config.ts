export const siteConfig = {
    name: "Karaduman Otomotiv",
    description: "Güvenilir ikinci el araç alım satım merkezi. Ekspertiz garantili, uygun fiyatlı araçlar.",
    logo: {
        src: "/logo.png",
        alt: "Karaduman Otomotiv Logo",
        width: 180,
        height: 80,
    },
    contact: {
        phone: "+90 555 123 45 67",
        whatsapp: "https://wa.me/905551234567", // Format: https://wa.me/90xxxxxxxxxx
        address: "Otokent Galericiler Sitesi, B Blok No: 12, İzmir",
        email: "info@karadumanoto.com",
        mapUrl: "https://maps.google.com/?q=..." // Google Maps link
    },
    social: {
        instagram: "https://instagram.com/karadumanoto",
        facebook: "https://facebook.com/karadumanoto",
        twitter: "https://twitter.com/karadumanoto",
    },
    hero: {
        title: "Hayalinizdeki Araca <span className='text-red-500'>Güvenle</span> Ulaşın",
        subtitle: "Karaduman Otomotiv güvencesiyle ekspertiz garantili, temiz ikinci el araçlar.",
        buttonText: "Tüm İlanları İncele",
        secondaryButtonText: "Bize Ulaşın",
    },
    labels: {
        showcaseTitle: "Vitrin İlanları",
        latestListingsTitle: "Son Eklenenler",
        footerText: "Karaduman Otomotiv - Tüm Hakları Saklıdır.",
        insuranceTitle: "Karaduman Sigorta",
        insuranceDescription: "Sadece araç satmıyoruz, aracınızı güvence altına alıyoruz. En uygun kasko ve trafik sigortası teklifleri için yanınızdayız.",
    }
};

export type SiteConfig = typeof siteConfig;
