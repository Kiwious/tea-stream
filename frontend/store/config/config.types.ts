import type { BaseColorType } from '@/libs/constants/colors.constants'

export interface ConfigStore {
	theme: BaseColorType
	setTheme: (theme: BaseColorType) => void
}
