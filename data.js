// ============================================================
// DATA MANAGEMENT
// ============================================================

const STORAGE_KEY = 'serenity_v4';
const SESSION_KEY = 'serenity_admin_v4';
const ADMIN_PASSWORD = 'spa2024'; // Change this to your preferred password

// Check if localStorage is available
function isLocalStorageAvailable() {
    try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

function defaultData() {
    return {
        site: {
            title: 'Serenity Spa',
            tagline: 'Luxury Wellness Studio',
            phone: '+1 (000) 000-0000',
            email: 'info@serenityspa.com',
            footerCopy: '© 2025 Serenity Spa — All Rights Reserved',
            heroHeadline: 'Calm your mind,\nrefresh your spirit,\nawaken your senses',
            heroSubtext: "Maintaining your health, happiness and inner peace isn't a one-size-fits-all solution — but it's a lot easier with the right self-care toolkit.",
            incallText: 'A fully equipped private studio with all session types — massage chairs, tables, and more.',
            outcallText: 'We come to you with all necessary essentials, early so we can enjoy a full session at your preferred private location.',
            servicesIntro: 'We offer a variety of massage and wellness options tailored to your needs.',
            ctaHeadline: 'Ready for an unforgettable experience?',
            ctaSubtext: 'Professional, discreet, and tailored entirely to you.',
            bookingIntro: "Reach out directly or fill in the booking form — we respond quickly!",
            certIntro: 'All our companions hold verified professional certifications to ensure the highest standard of care.',
            botName: 'Serenity Assistant',
            botWelcome: 'Hi! 👋 Welcome to Serenity Spa. How can I help you today?',
            colors: {
                gold: '#b89a6a',
                dark: '#1a1410',
                cream: '#f9f5ef'
            },
            emailjs: {
                serviceId: '',
                templateId: '',
                publicKey: '',
                recipientEmail: ''
            }
        },
        channels: [
            { icon: '📱', name: 'Signal', value: 'YourSignal.51' },
            { icon: '✈️', name: 'Telegram', value: '0000000000' },
            { icon: '🎮', name: 'Discord', value: 'yourhandle' }
        ],
        images: {
            hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=900&q=80',
            g1: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
            g2: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
            g3: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?w=600&q=80',
            g4: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80',
            g5: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80'
        },
        escorts: [
            {
                id: 1,
                name: 'Vanessa',
                age: 25,
                bio: 'Your ultimate relaxation companion. Specializing in Nuru, Swedish, and sensual experiences.',
                tags: ['Swedish', 'Nuru', 'Deep Tissue'],
                photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80',
                verified: true,
                available: true
            },
            {
                id: 2,
                name: 'Sophia',
                age: 23,
                bio: 'Thai and Shiatsu specialist with 5 years of therapeutic and sensual massage experience.',
                tags: ['Thai', 'Shiatsu', 'Hot Stone'],
                photo: 'https://images.unsplash.com/photo-1521577352947-9bb58764b69a?w=400&q=80',
                verified: true,
                available: true
            }
        ],
        services: [
            { name: 'Nuru Massage', desc: 'An immersive body-to-body experience using essential oils to deeply relax body and mind.' },
            { name: 'Thai Massage', desc: 'Acupressure-based technique combining deep muscle work with yoga-style stretching.' },
            { name: 'Shiatsu Massage', desc: 'Traditional Japanese method combining kneading, pressing, and stretching for deep relaxation.' },
            { name: 'Deep Tissue', desc: 'Targeted pressure on deeper muscle layers to relieve chronic tension and muscular knots.' },
            { name: 'Swedish Massage', desc: 'Classic full-body technique with long flowing strokes to improve circulation and ease tension.' },
            { name: 'Hot Stone', desc: 'Smooth heated stones placed on key points, melting away tension from within.' }
        ],
        reviews: [
            { name: 'John', source: 'Verified Client', text: 'This was my first time exploring, and it turned out to be a fantastic experience. I especially appreciated the professionalism and will definitely be returning.' },
            { name: 'Anthony', source: 'Verified Client', text: 'The deep tissue combo was incredible — well worth it! I had an awesome time and left feeling completely rejuvenated.' },
            { name: 'Donald', source: 'Verified Client', text: 'Had a great time overall! The combo was incredible — well worth every minute. Already planning my next visit.' },
            { name: 'Walter', source: 'Verified Client', text: 'The full-service Thai session was completely worthwhile. I had an amazing experience and felt completely at ease throughout.' }
        ],
        certs: [],
        chatFAQ: [
            { q: 'What services do you offer?', a: 'We offer Nuru, Thai, Shiatsu, Deep Tissue, Swedish, Hot Stone, and more. Check our Services section for full details!' },
            { q: 'How do I book a session?', a: "You can book via our Book Now page, or reach us on Signal, Telegram, or Discord. Fill out the form and we'll get back to you!" },
            { q: 'Do you do incall and outcall?', a: 'Yes! Incall is at our private studio. For outcall we come to your location with everything needed.' },
            { q: 'What are your rates?', a: 'Rates vary by service and duration. Contact us directly for a personalized quote.' },
            { q: 'Is everything discreet?', a: 'Absolutely. All sessions are 100% private and discreet. Your personal information is never shared.' }
        ]
    };
}

function getData() {
    try {
        if (!isLocalStorageAvailable()) {
            console.warn('localStorage not available, using default data');
            return defaultData();
        }
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : defaultData();
    } catch (e) {
        console.warn('Error reading from localStorage:', e);
        return defaultData();
    }
}

function saveData(data) {
    try {
        if (!isLocalStorageAvailable()) {
            console.warn('localStorage not available, cannot save');
            return false;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    } catch (e) {
        console.warn('Error saving to localStorage:', e);
        return false;
    }
}

// Helper functions
function getElementValue(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
}

function escapeHtml(s) {
    if (!s) return '';
    return String(s)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function showFlashMessage(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 3000);
}

// Aliases for backward compatibility
const v = getElementValue;
const esc = escapeHtml;
const flash = showFlashMessage;