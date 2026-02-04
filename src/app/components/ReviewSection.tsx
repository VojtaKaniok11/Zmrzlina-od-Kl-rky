"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Review {
    id: string;
    name: string;
    rating: number;
    text: string;
    date: string;
}

export default function ReviewSection() {
    const [reviews, setReviews] = useState<Review[]>([
        {
            id: "1",
            name: "Ladislav Kleška",
            rating: 5,
            text: "Super zmrzka hodne chutna doporucuji. Příjemna obsluha 😊",
            date: "2025-08-15",
        },
        {
            id: "2",
            name: "Petr Kořínek",
            rating: 5,
            text: "Výborná zmrzlina a milá obsluha. Určitě doporučuji navštívit!",
            date: "2025-07-22",
        },
        {
            id: "3",
            name: "Kateřina Nováková",
            rating: 5,
            text: "Nejlepší zmrzlina v okolí! Skvělé příchutě a příjemné prostředí.",
            date: "2025-06-10",
        },
    ]);

    const [newReview, setNewReview] = useState({
        name: "",
        rating: 5,
        text: "",
    });

    const [hasReviewed, setHasReviewed] = useState(false);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        // Check if user has already reviewed
        const deviceId = localStorage.getItem("zmrzlina-device-id");
        if (deviceId) {
            setHasReviewed(true);
        } else {
            // Create a simple device fingerprint
            const newDeviceId = `device-${Date.now()}-${Math.random()}`;
            localStorage.setItem("zmrzlina-device-id", newDeviceId);
        }

        // Load reviews from localStorage
        const savedReviews = localStorage.getItem("zmrzlina-reviews");
        if (savedReviews) {
            setReviews(JSON.parse(savedReviews));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (hasReviewed) {
            alert("Z tohoto zařízení již bylo odesláno hodnocení.");
            return;
        }

        const review: Review = {
            id: Date.now().toString(),
            name: newReview.name,
            rating: newReview.rating,
            text: newReview.text,
            date: new Date().toISOString().split("T")[0],
        };

        const updatedReviews = [review, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem("zmrzlina-reviews", JSON.stringify(updatedReviews));
        localStorage.setItem("zmrzlina-has-reviewed", "true");
        setHasReviewed(true);
        setShowForm(false);
        setNewReview({ name: "", rating: 5, text: "" });
    };

    const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            } ${interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                        size={interactive ? 28 : 20}
                        onClick={() => interactive && onClick && onClick(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className="py-10 px-4">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text">
                    Hodnocení zákazníků
                </h2>

                {/* Reviews Display */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                    {reviews.slice(0, 3).map((review) => (
                        <div
                            key={review.id}
                            className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg card-hover"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-base">{review.name}</h3>
                                {renderStars(review.rating)}
                            </div>
                            <p className="text-gray-700 mb-2 italic text-sm">"{review.text}"</p>
                            <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("cs-CZ")}</p>
                        </div>
                    ))}
                </div>

                {/* Reviews Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {!hasReviewed && !showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            Přidat hodnocení
                        </button>
                    )}
                    <a
                        href="https://www.facebook.com/zmrzlinaodklarky/reviews/?id=100067988313691&sk=reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 text-center"
                    >
                        Všechny recenze na Facebooku
                    </a>
                </div>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                        <h3 className="text-xl font-bold mb-5 text-center">Zanechte nám hodnocení</h3>

                        <div className="mb-3">
                            <label className="block text-gray-700 font-semibold mb-2">Vaše jméno</label>
                            <input
                                type="text"
                                required
                                value={newReview.name}
                                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition"
                                placeholder="Např. Jana Nováková"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-gray-700 font-semibold mb-2">Hodnocení</label>
                            {renderStars(newReview.rating, true, (rating) =>
                                setNewReview({ ...newReview, rating })
                            )}
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-700 font-semibold mb-2">Váš názor</label>
                            <textarea
                                required
                                value={newReview.text}
                                onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 outline-none transition resize-none"
                                rows={3}
                                placeholder="Napište nám, jak se vám u nás líbilo..."
                            />
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                className="flex-1 bg-gradient-to-r from-pink-400 to-purple-400 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                            >
                                Odeslat hodnocení
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                            >
                                Zrušit
                            </button>
                        </div>
                    </form>
                )}


            </div>
        </section>
    );
}
