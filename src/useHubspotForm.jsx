import { useState } from 'react'
import { Input, Textarea, Select, Checkbox, Radio } from './fields.jsx'

export function useHubspotForm({
	portalId,
	formId,
	fields,
	submitLabel = 'Submit',
	debug,
	apiKey
}) {
	const [$response, set$response] = useState(null)
	const [$result, set$result] = useState(null)

	debug && debugHubspot({ formId, apiKey })

	async function onSubmit(e) {
		e.preventDefault()

		const fields = Array.from(e.target.elements)
			.filter(({ name }) => !!name)
			.map(input => ({
				name: input.name,
				value: input.type == 'checkbox' ? String(input.checked) : input.value,
			}))

		const response = await submitHubspot({ portalId, formId, fields })
		set$response(response)
		set$result(response?.ok && await response.json())
	}

	const Fields = fields.map(field => {
		const Field =
			field.type === 'radio' ? Radio :
			field.type === 'checkbox' ? Checkbox :
			field.type === 'select' ? Select :
			field.type === 'textarea' ? Textarea :
			Input

		return ({ component: Component = Field, ...props } = {}) =>
			<Component {...field} {...props} />
	})

	const Form = ({ children, ...props }) => {
		// redirect
		if ($response?.ok && !!$result?.redirectUri) {
			window.location.href = $result.redirectUri
			return <p>Redirecting...</p>
		}

		// response message
		if ($response?.ok && !!$result?.inlineMessage) {
			return <div dangerouslySetInnerHTML={{ __html: $result.inlineMessage }} />
		}

		return <form onSubmit={onSubmit} {...props}>
			{children || <>
				{Fields?.map((Field, key) => <Field key={key} />)}
				<button type="submit">{submitLabel}</button>
			</>}
		</form>
	}

	return {
		onSubmit,
		response: $response,
		result: $result,
		Fields,
		Form,
	}
}

async function submitHubspot({ portalId, formId, fields }) {
	const url = `https://api.hsforms.com/submissions/v3/integration/submit/${ portalId }/${ formId }`

	const context = (typeof document === 'undefined' || typeof location === 'undefined')
		? {} : {
			hutk: document.cookie.match(/hubspotutk=([^;]+)/)?.[1],
			pageUri: location.href,
			pageName: document.title,
		}

	return await fetch(url, {
		method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				fields,
				context,
			})
	})
}

function debugHubspot({ formId, apiKey }) {
	let output = ''

	if (!apiKey) {
		output = '`apiKey` is undefined'
	} else {
		const url = `https://api.hubapi.com/forms/v2/forms/${ formId }?hapikey=${ apiKey }`
		output = `${ url }\n\n(Look under \`formFieldGroups\`)`
	}

	console.debug(`%c useHubspotForm %cdebug: true\n\n${ output }`, 'background-color: #fff; color: #000;')
}
