// Documentation purpose only

type Config = {
	portalId: string
	formId: string
	fields: Array<TextField | CheckboxField | SelectField>
	submitLabel?: string
	debug?: boolean
	apiKey?: string
}

// field types

type Field = {
	name: string
	label: string
	required?: boolean
	// other props can be passed down
	// e.g. `className`, `pattern`, `aria-*`
}

type TextField = Field & {
	type?: 'text' | 'email' | 'textarea'
	value?: string
}

type SelectField = Field & {
	type: 'select'
	options: string[]
}

type CheckboxField = Field & {
	type: 'checkbox'
	value?: boolean
}

type RadioField = Field & {
	tyep: 'radio'
	options: string[]
}

/*
	Example:
	useHubspotForm(config)
*/

const config: Config = {
	portalId: '...',
	formId: '...',
	fields: [
		{ name: 'name', label: 'Name', required: true },
		{
			name: 'movie',
			label: 'Favorite movie',
			type: 'select',
			options: [
				'Star Wars: Episode V - The Empire Strikes Back',
				'Interstellar',
				'Lightyear',
			],
			value: 'Interstellar',
		},
		// ...
	],
	// debug: true,
	// apiKey: '...',
}
