import { Outlet } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/common/ScrollToTop";

const UserLayout = () => {

    return (

        <div className="text-[var(--text)] bg-[var(--bg)]">
            <ScrollToTop />

            <Navbar />

            <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] ">

                <Outlet />

            </main>

            <Footer />
        </div>

    );

};

export default UserLayout;

