import { useState, useEffect } from "react";
import { Clock3 } from "lucide-react";

const DealTimer = () => {

    const [timeLeft, setTimeLeft] = useState(
        12 * 60 * 60 + 30 * 60 + 45
    );

    useEffect(() => {

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const formatTime = (seconds) => {

        const hours = String(
            Math.floor(seconds / 3600)
        ).padStart(2, "0");

        const minutes = String(
            Math.floor((seconds % 3600) / 60)
        ).padStart(2, "0");

        const secs = String(
            seconds % 60
        ).padStart(2, "0");

        return `${hours}:${minutes}:${secs}`;
    };

    return (

        <div className="flex items-center gap-2">

            <Clock3 className="text-red-600 " />

            <span className="font-semibold">
                Ends in {formatTime(timeLeft)}
            </span>

        </div>

    );
};

export default DealTimer;

