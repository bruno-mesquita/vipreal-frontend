import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white shadow-md fixed w-full h-14 flex items-center justify-between pl-8 z-50">
      <span>Vip Real</span>
      <nav>
        <ul className="flex">
          <li className="mx-2 text-gray-700">
            <Link href="#">Anuncios</Link>
          </li>
          <li className="mx-2 text-gray-700">
            <Link href="#">Quem somos</Link>
          </li>
          <li className="mx-2 text-gray-700">
            <Link href="#">Sobre</Link>
          </li>
        </ul>
      </nav>
      <Link
        href="/auth/login"
        className="bg-blue-600 flex items-center justify-center w-36 text-white font-medium h-full  hover:bg-blue-800 transition-colors cursor-pointer"
      >
        Entrar
      </Link>
    </header>
  );
}
