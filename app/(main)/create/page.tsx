import Script from "next/script";
import Create from "./create";

export default function page() {
    return (
        <div className="min-h-screen bg-muted">
            <Script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.2/tsparticles.confetti.bundle.min.js"></Script>
            <Create />
        </div>
    )
}