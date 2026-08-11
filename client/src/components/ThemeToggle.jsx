import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/slices/themeSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {

    const dispatch = useDispatch();

    const mode = useSelector((state) => state.theme.mode);

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            className="
                w-11
                h-11
                rounded-full
                flex
                items-center
                justify-center
                transition-all
                duration-300
                bg-[var(--bg)]
                border
                border-[var(--border)]
                shadow-md
                hover:scale-105
            "
        >
            {mode === "light" ? (
                <FaMoon size={18} />
            ) : (
                <FaSun size={18} className="text-yellow-400" />
            )}
        </button>
    );
};

export default ThemeToggle;




