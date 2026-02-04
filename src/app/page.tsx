import Image from "next/image";
import { IceCream, Clock, MapPin, Facebook, Instagram } from "lucide-react";
import { getIceCreamData } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";

export const revalidate = 10; // Obnovit data každých 10 sekund

export default async function Home() {
  // Načtení dat ze Sanity
  const data = await getIceCreamData();

  // Fallback data pro případ, že Sanity ještě není nastavené
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

  return (
    <main className="min-h-screen">
      {/* Header Section */}
      <header className="relative py-12 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 opacity-50"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-white/50 card-hover">
              <Image
                src="/fotky/logo.jpg"
                alt="Zmrzlina od Klárky Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            {subtitle}
          </p>
        </div>
      </header>

      {/* Menu Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <IceCream className="w-12 h-12 mx-auto mb-3 text-pink-500" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Naše nabídka
            </h2>
            <p className="text-gray-600">Vyberte si z našich lahodných dobrot</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg card-hover text-center border-2 border-pink-100"
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                <p className="text-2xl font-bold text-pink-500">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-10 px-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Naše zmrzlina
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {galleryImages && galleryImages.length > 0 ? (
              galleryImages.map((img, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden card-hover w-64">
                  <div className="relative h-80">
                    <Image
                      src={urlFor(img.image).url()}
                      alt={img.caption || "Zmrzlina od Klárky"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {img.caption && (
                    <div className="p-3 text-center">
                      <h3 className="text-lg font-bold text-gray-800">{img.caption}</h3>
                    </div>
                  )}
                </div>
              ))
            ) : (
              // Fallback pokud nejsou v Sanity žádné obrázky
              <>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden card-hover w-64">
                  <div className="relative h-80">
                    <Image
                      src="/fotky/Zmrzlina.jpg"
                      alt="Točená zmrzlina"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Točená zmrzlina</h3>
                  </div>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden card-hover w-64">
                  <div className="relative h-80">
                    <Image
                      src="/fotky/Frape.jpg"
                      alt="Frappé"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="text-lg font-bold text-gray-800">Frappé</h3>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Opening Hours Section */}
      <section className="py-10 px-4 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Clock className="w-12 h-12 mx-auto mb-3 text-purple-500" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Otevírací doba
            </h2>
            <p className="text-gray-600">Těšíme se na Vaši návštěvu!</p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden">
            {openingHours.map((schedule, index) => (
              <div
                key={index}
                className={`flex justify-between items-center px-6 py-3 ${index !== openingHours.length - 1 ? "border-b border-gray-200" : ""
                  } ${schedule.day === "Sobota" || schedule.day === "Neděle"
                    ? "bg-pink-50"
                    : "hover:bg-purple-50"
                  } transition-colors`}
              >
                <span className="text-base md:text-lg font-semibold text-gray-800">
                  {schedule.day}
                </span>
                <span className="text-base md:text-lg font-bold text-pink-600">
                  {schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Address & Map Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-green-500" />
            <h2 className="text-3xl md:text-4xl font-bold mb-3 gradient-text">
              Kde nás najdete
            </h2>
            <p className="text-lg text-gray-700 font-medium mb-6">
              {address}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden card-hover">
            <iframe
              src={mapUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 text-white">Sledujte nás na sociálních sítích</h3>

          <div className="flex justify-center gap-6 mb-8">
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 p-6 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110"
            >
              <Facebook className="w-12 h-12 text-blue-600" />
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/90 p-6 rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110"
            >
              <Instagram className="w-12 h-12 text-pink-600" />
            </a>
          </div>

          <div className="text-white text-lg">
            <p className="font-semibold mb-2">© 2026 Zmrzlina od Klárky</p>
            <p className="text-sm opacity-90">Vyrobeno s láskou a zmrzlinou 🍦💕</p>
          </div>
        </div>
      </footer>
    </main>
  );
}