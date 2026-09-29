// Generates a typed hook per operation for Apollo Client 4
// (typescript-react-apollo only supports Apollo 3).
// Expects the `typescript-operations` and `typed-document-node` output in the same file.
const { convertFactory } = require('@graphql-codegen/visitor-plugin-common')

const HOOKS = {
	query: ['useQuery', 'useLazyQuery', 'useSuspenseQuery'],
	mutation: ['useMutation'],
	subscription: ['useSubscription']
}

const SUFFIX = {
	useQuery: 'Query',
	useLazyQuery: 'LazyQuery',
	useSuspenseQuery: 'SuspenseQuery',
	useMutation: 'Mutation',
	useSubscription: 'Subscription'
}

module.exports = {
	plugin(_schema, documents, config) {
		const convert = convertFactory(config)
		const used = new Set()
		const hooks = []

		for (const { document } of documents) {
			for (const node of document?.definitions ?? []) {
				if (node.kind !== 'OperationDefinition' || !node.name) continue

				const opType = node.operation[0].toUpperCase() + node.operation.slice(1)
				const base = convert(node)
				const data = `${base}${opType}`
				const variables = `${data}Variables`
				const doc = `${base}Document`

				for (const hook of HOOKS[node.operation]) {
					used.add(hook)
					const options =
						hook === 'useSuspenseQuery'
							? `${hook}.Options<${variables}>`
							: `${hook}.Options<${data}, ${variables}>`
					const optional = hook === 'useMutation' || hook === 'useLazyQuery'
					const param = optional
						? `options?: ${options}`
						: `...[options]: {} extends ${variables} ? [options?: ${options}] : [options: ${options}]`

					hooks.push(
						`export function use${base}${SUFFIX[hook]}(${param}) {\n` +
							`\treturn ${hook}(${doc}, options as ${options})\n` +
							`}`
					)
				}
			}
		}

		if (!hooks.length) return ''

		return {
			prepend: [
				`import { ${[...used].sort().join(', ')} } from '@apollo/client/react'`
			],
			content: hooks.join('\n\n')
		}
	}
}
