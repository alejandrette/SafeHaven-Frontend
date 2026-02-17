import { Link } from "react-router-dom";
import type { User } from "../types";
import { NavMenu } from "./NavMenu";
import Logo from "./Logo";

type HeaderProps = {
  name: User["name"];
};

export default function Header({ name }: HeaderProps) {
  return (
    <header className="bg-slate-900 p-10">
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between items-center">
        <Link to='/'>
          <Logo />
        </Link>
        <NavMenu name={name} />
      </div>
    </header>
  );
}