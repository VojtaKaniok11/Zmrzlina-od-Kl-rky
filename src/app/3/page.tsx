import Image from "next/image";
import { IceCream, Clock, MapPin, Facebook, Instagram, Sparkles, Heart } from "lucide-react";
import { getIceCreamData } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";

export const revalidate = 10;

export default async function Page3() {
    const data = await getIceCreamData();

    const menuItems = data?.menuItems || [
        { name: "Frappé", price: "80 Kč", icon: "☕" },
        { name: "Malá zmrzlina", price: "25 Kč", icon: "🍦" },
        { name: "Velká zmrzlina", price: "40 Kč", icon: "🍨" },
        { name: "Jumbo", price: "50 Kč", icon: "🍧" },
    ];

    const openingHours = data?.openingHours || [
        { day: "Pondělí", hours: "12:00 - 18:00" },
        { day: "Úterý", hours: "12:00 - 18:00" },
        { day: "Středa", hours: "12:00 - 18:00" },
        { day: "Čtvrtek", hours: "12:00 - 18:00" },
        { day: "Pátek", hours: "12:00 - 18:00" },
        { day: "Sobota", hours: "10:00 - 18:00" },
        { day: "Neděle", hours: "10:00 - 18:00" },
    ];

    const title = data?.title || "Zmrzlina od Klárky";
    const subtitle = data?.subtitle || "Prodej točené zmrzliny z Opočna!";
    const address = data?.address || "137, Kunratice, Czech Republic, 464 01";
    const mapUrl = data?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d650.7!2d15.0258584!3d50.9214338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470925005272151b%3A0x537fea20efa3048f!2sZmrzlina%20od%20Kl%C3%A1rky!5e0!3m2!1sen!2scz!4v1234567890";
    const facebookUrl = data?.facebookUrl || "https://www.facebook.com/zmrzlinaodklarky";
    const instagramUrl = data?.instagramUrl || "https://www.instagram.com/zmrzlina_od_klarky/";
    const galleryImages = data?.galleryImages || [];
    const logoUrl = data?.logo ? urlFor(data.logo).url() : "/fotky/logo.jpg";

    return (
        <main className="min-h-screen bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-300 animate-gradient">

            {/* Playful Header with Sparkles */}
            <header className="relative py-16 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <Sparkles className="absolute top-10 left-10 w-16 h-16 text-yellow-400 animate-bounce-fun" style={{ animationDelay: "0s" }} />
                    <Sparkles className="absolute top-20 right-20 w-12 h-12 text-pink-400 animate-bounce-fun" style={{ animationDelay: "0.5s" }} />
                    <Sparkles className="absolute bottom-20 left-32 w-14 h-14 text-purple-400 animate-bounce-fun" style={{ animationDelay: "1s" }} />
                    <Heart className="absolute top-32 right-40 w-10 h-10 text-red-400 animate-bounce-fun" style={{ animationDelay: "1.5s" }} />
                </div>

                <div className="relative max-w-6xl mx-auto text-center">
                    <div className="mb-8 flex justify-center">
                        <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl animate-pulse-rainbow border-8 border-white transform hover:scale-110 transition-transform duration-500">
                            <Image
                                src={logoUrl}
                                alt="Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h1 className="text-7xl md:text-8xl font-black mb-6 transform hover:scale-105 transition-transform duration-300"
                        style={{
                            background: "linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)",
                            backgroundSize: "300% 300%",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            textShadow: "4px 4px 0px rgba(0,0,0,0.2)",
                        }}>
                        {title}
                    </h1>
                    <div className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-10 py-5 rounded-full text-2xl font-black shadow-2xl transform -rotate-2 hover:rotate-2 transition-transform duration-300">
                        ✨ {subtitle} ✨
                    </div>
                </div>
            </header>

            {/* Colorful Bouncy Menu */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-white rounded-full p-6 shadow-2xl mb-6 animate-bounce-fun">
                            <IceCream className="w-16 h-16 text-pink-500" />
                        </div>
                        <h2 className="text-6xl font-black mb-4 text-white" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>
                            🍦 Naše Nabídka 🍦
                        </h2>
                        <p className="text-2xl text-white font-bold">Vyberte si svoji oblíbenou chuť!</p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {menuItems.map((item, index) => {
                            const colors = [
                                "from-pink-400 to-red-400",
                                "from-blue-400 to-cyan-400",
                                "from-yellow-400 to-orange-400",
                                "from-purple-400 to-pink-400"
                            ];
                            const rotations = ["-rotate-2", "rotate-2", "-rotate-1", "rotate-3"];

                            return (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${colors[index % 4]} p-8 rounded-3xl shadow-2xl text-center transform ${rotations[index % 4]} hover:scale-110 hover:rotate-0 transition-all duration-500 border-8 border-white`}
                                >
                                    <div className="text-8xl mb-4 animate-bounce-fun" style={{ animationDelay: `${index * 0.2}s` }}>{item.icon}</div>
                                    <h3 className="text-3xl font-black mb-4 text-white" style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.2)" }}>{item.name}</h3>
                                    <div className="bg-white rounded-full py-3 px-6 inline-block">
                                        <p className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">{item.price}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Fun Gallery with Stickers */}
            <section className="py-16 px-4 bg-white/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-6xl font-black text-white mb-4" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>
                            🌈 Galerie Radosti 🌈
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {galleryImages && galleryImages.length > 0 ? (
                            galleryImages.map((img, index) => {
                                const rotations = ["rotate-3", "-rotate-2", "rotate-2", "-rotate-3"];
                                return (
                                    <div key={index} className={`bg-white p-6 rounded-3xl shadow-2xl transform ${rotations[index % 4]} hover:rotate-0 hover:scale-105 transition-all duration-500 border-8 border-pink-400`}>
                                        <div className="relative h-96 rounded-2xl overflow-hidden">
                                            <Image
                                                src={urlFor(img.image).url()}
                                                alt={img.caption || "Zmrzlina"}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {img.caption && (
                                            <div className="mt-6 text-center">
                                                <h3 className="text-3xl font-black text-pink-500">{img.caption}</h3>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            <>
                                <div className="bg-white p-6 rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 border-8 border-pink-400">
                                    <div className="relative h-96 rounded-2xl overflow-hidden">
                                        <Image
                                            src="/fotky/Zmrzlina.jpg"
                                            alt="Točená zmrzlina"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="text-3xl font-black text-pink-500">Točená zmrzlina</h3>
                                    </div>
                                </div>
                                <div className="bg-white p-6 rounded-3xl shadow-2xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 border-8 border-purple-400">
                                    <div className="relative h-96 rounded-2xl overflow-hidden">
                                        <Image
                                            src="/fotky/Frape.jpg"
                                            alt="Frappé"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="mt-6 text-center">
                                        <h3 className="text-3xl font-black text-purple-500">Frappé</h3>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Playful Opening Hours */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-white rounded-full p-6 shadow-2xl mb-6 animate-bounce-fun">
                            <Clock className="w-16 h-16 text-blue-500" />
                        </div>
                        <h2 className="text-6xl font-black text-white mb-4" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>
                            ⏰ Kdy Jsme Otevřeni ⏰
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-400 transform hover:scale-105 transition-transform duration-500">
                        {openingHours.map((schedule, index) => {
                            const bgColors = ["bg-pink-100", "bg-blue-100", "bg-yellow-100", "bg-purple-100", "bg-green-100", "bg-orange-100", "bg-red-100"];
                            return (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center px-10 py-6 ${bgColors[index % 7]} ${index !== openingHours.length - 1 ? "border-b-4 border-white" : ""
                                        } hover:scale-105 transition-transform duration-300`}
                                >
                                    <span className="text-2xl font-black text-gray-800">
                                        🎉 {schedule.day}
                                    </span>
                                    <span className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                                        {schedule.hours}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Colorful Map */}
            <section className="py-16 px-4 bg-white/20 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block bg-white rounded-full p-6 shadow-2xl mb-6 animate-bounce-fun">
                            <MapPin className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-6xl font-black text-white mb-6" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>
                            📍 Najdete Nás Tady 📍
                        </h2>
                        <div className="inline-block bg-white rounded-full px-10 py-5 text-2xl font-black text-gray-800 shadow-2xl">
                            {address}
                        </div>
                    </div>

                    <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-pink-400 transform hover:scale-105 transition-transform duration-500">
                        <iframe
                            src={mapUrl}
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Super Fun Footer */}
            <footer className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Heart className="absolute top-10 left-20 w-20 h-20 text-white/30 animate-bounce-fun" />
                    <Heart className="absolute bottom-20 right-20 w-16 h-16 text-white/30 animate-bounce-fun" style={{ animationDelay: "0.5s" }} />
                    <Sparkles className="absolute top-20 right-40 w-12 h-12 text-yellow-300/50 animate-bounce-fun" style={{ animationDelay: "1s" }} />
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h3 className="text-5xl font-black mb-10 text-white" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}>
                        💖 Sledujte Nás 💖
                    </h3>

                    <div className="flex justify-center gap-8 mb-12">
                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-8 rounded-full shadow-2xl hover:transform hover:scale-125 hover:rotate-12 transition-all duration-300 border-8 border-blue-400"
                        >
                            <Facebook className="w-16 h-16 text-blue-600" />
                        </a>
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-8 rounded-full shadow-2xl hover:transform hover:scale-125 hover:-rotate-12 transition-all duration-300 border-8 border-pink-400"
                        >
                            <Instagram className="w-16 h-16 text-pink-600" />
                        </a>
                    </div>

                    <div className="text-white">
                        <p className="font-black mb-3 text-3xl">© 2026 Zmrzlina od Klárky</p>
                        <p className="text-xl font-bold">Vyrobeno s extra láskou a spoustou zmrzliny! 🍦💕✨</p>
                    </div>
                </div>
            </footer>
        </main>
    );
}
