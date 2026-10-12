import { EmptyState } from '@/components/ui/elements/empty-state'
import { Heading } from '@/components/ui/elements/heading'
import { FindRandomCategoriesQuery } from '@/graphql/generated/output'
import { CategoryCard } from './category-card'

interface Props {
	heading?: string
	categories: FindRandomCategoriesQuery['findRandomCategories']
}

export function CategoryList({ categories, heading }: Props) {
	if (!categories?.length) {
		return <EmptyState />
	}

	return (
		<>
			{heading && <Heading title={heading} />}
			<div className='mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7'>
				{categories.map((category, index) => (
					<CategoryCard category={category} key={index} />
				))}
			</div>
		</>
	)
}
