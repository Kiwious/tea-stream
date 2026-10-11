import {
	columnVisibilityFeature,
	rowSelectionFeature,
	tableFeatures
} from '@tanstack/react-table'

export const features = tableFeatures({
	columnVisibilityFeature,
	rowSelectionFeature
})

export type DataTableFeatures = typeof features
