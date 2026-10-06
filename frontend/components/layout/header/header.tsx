import { HeaderMenu } from './header-menu'
import { Logo } from './logo'
import { Search } from './search'

export function Header() {
	return (
		<header className='border-border bg-card flex h-full items-center gap-x-4 border-b p-4'>
			<Logo />
			<Search />
			<HeaderMenu />
		</header>
	)
}
