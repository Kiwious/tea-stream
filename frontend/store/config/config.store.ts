import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { ConfigStore } from './config.types'
import type { BaseColorType } from '@/libs/constants/colors.constants'

export const configStore = create(
	persist<ConfigStore>(
		set => ({
			theme: 'turquoise',
			setTheme: (theme: BaseColorType) => set({ theme })
		}),
		{
			name: 'config',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
