import { motion } from "framer-motion";

const Loader = ({
    text = "Loading...",
    fullScreen = true
}) => {

    return (

        <div
            className={`flex flex-col items-center justify-center ${
                fullScreen ? "min-h-screen" : "py-16"
            }`}
        >

            {/* Animated Circles */}

            <div className="relative w-20 h-20">

                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent"
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute inset-2 rounded-full border-4 border-purple-500 border-b-transparent"
                    animate={{ rotate: -360 }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                />

                <motion.div
                    className="absolute inset-5 rounded-full bg-blue-600"
                    animate={{
                        scale: [1, 1.3, 1]
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1
                    }}
                />

            </div>

            <motion.h2
                className="mt-8 text-xl font-semibold text-gray-700"
                animate={{
                    opacity: [0.4, 1, 0.4]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 1.5
                }}
            >
                {text}
            </motion.h2>

        </div>

    );

};

export default Loader;


