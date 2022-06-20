import React from 'react'
import { createRoot } from 'react-dom/client'
import { useHubspotForm } from '../dist/index.min.js'

const App = () => {
	const { Form } = useHubspotForm({
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
		]
	})

	return <Form />
}

createRoot(document.getElementById('root')).render(<App />)
