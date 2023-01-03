import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gray-400 w-full h-14 flex items-center justify-between px-10">
      <span>Vip Real</span>
      <nav>
        <ul className="flex">
          <li>Anuncios</li>
          <li>Quem somos</li>
        </ul>
      </nav>
      <div>
        <Link href="/auth/login">Entrar</Link>
      </div>
    </header>
  );
}
