'use client'
import { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import Button from "./ui/Buttonlogin"
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import { useRouter } from "next/navigation";  
import { MenuIcon } from 'lucide-react';

export const NAV_LINKS = [
    { href: '/', key: 'home', label: 'Home' },
    { href: `${process.env.NEXT_PUBLIC_CLIENT_SIDE_URL}/property`, key: 'property', label: 'My Property' },
    { href: `${process.env.NEXT_PUBLIC_CLIENT_SIDE_URL}/Addproperty`, key: 'addproperty', label: 'Post Your Property' },
    { href: `${process.env.NEXT_PUBLIC_CLIENT_SIDE_URL}/propertyDisplay`, key: 'propertyDisplay', label: 'Rent a Property' },
];

const Navbar = () => {
    const { data: session } = useSession();
    const [showLogin, setShowLogin] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // state for mobile menu
    const router = useRouter();
    const { pathname } = router; // get current path

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: '/' });
    };

    if (showLogin) {
        return <LoginForm />;
    }

    return (
        <nav className="flexBetween max-container padding-container relative z-30 py-5">
            <Link href="/">
                <Image src="/rentifylogo.png" alt="logo" width={74} height={29} />
            </Link>

            <ul className={`lg:flex hidden h-full gap-12`}>
                {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <li
                            key={link.key}
                            className={`regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold ${isActive ? 'font-bold border-b-2 border-green-500' : ''}`}
                        >
                            <Link href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>

            <div className="lg:flexCenter hidden">
                {session ? (
                    <Button
                        type="button"
                        title="Logout"
                        icon="/user.svg"
                        variant="btn_dark_green"
                        onClick={handleSignOut}
                    />
                ) : (
                    <Button
                        type="button"
                        title="Login"
                        icon="/user.svg"
                        variant="btn_dark_green"
                        onClick={handleLoginClick}
                    />
                )}
            </div>

            <div className="lg:hidden flex items-center">
                <MenuIcon 
onClick={() => setMenuOpen(!menuOpen)}/>
            </div>

            {menuOpen && (
                <ul className="absolute top-16 right-0 bg-white shadow-lg p-4 w-full flex flex-col gap-4 lg:hidden">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li
                                key={link.key}
                                className={`regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold ${isActive ? 'font-bold border-b-2 border-green-500' : ''}`}
                            >
                                <Link href={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                    {session ? (
                        <Button
                            type="button"
                            title="Logout"
                            icon="/user.svg"
                            variant="btn_dark_green"
                            onClick={handleSignOut}
                        />
                    ) : (
                        <Button
                            type="button"
                            title="Login"
                            icon="/user.svg"
                            variant="btn_dark_green"
                            onClick={handleLoginClick}
                        />
                    )}
                </ul>
            )}
        </nav>
    )
}

export default Navbar;
