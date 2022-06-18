# Customizable HubSpot Form (React Hook)
A React hook to render customizable Hubspot forms

## Installation

```sh
npm install react-custom-hubspot-form
```

## Usage

Basic implementation:

```jsx
import React from 'react'
import { useHubspotForm } from 'react-custom-hubspot-form'

export default () => {
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
      // ...
    ]
  })

  return <Form />
}
```

Custom fields:

```jsx
const { Fields, Form } = useHubspotForm(/* config */)
const [Name, Movie] = Fields	// order-sensitive (based on `config.fields`)

return (
  <Form className="...">
    <Name component={CustomField} />
    <Movie className="..." />

    <button>Vote now!</button>
  </Form>
)
```

Default `<Field>` components are documented [here](/index.js#L71).

```jsx
const CustomField = ({ label, value, className, ...props }) => (
  <label htmlFor={props.name} className={className}>
    <small>{label}{props.required && <span>*</span>}</small>

    <input
      id={props.name}
      placeholder={label}
      defaultValue={value}
      {...props}
    />
  </label>
)
```

Custom form (and response):

```jsx
const { onSubmit, response, result, Fields } = useHubspotForm(/* ... */)

if ($response?.ok && !!$result?.redirectUri) {
  window.location.href = $result.redirectUri
  return <p>Redirecting...</p>
}

if ($response?.ok && !!$result?.inlineMessage) {
  return <div dangerouslySetInnerHTML={{ __html: $result.inlineMessage }} />
}

return (
  <form onSubmit={onSubmit}>
    {Fields.map((Field, key) => (
      <Field className="..." key={key} />
    ))}

    <button>Vote now!</button>
  </form>
)
```

## Config

Types are documented [here](/types.ts).

```ts
type Config = {
  portalId: string
  formId: string
  fields: Array<TextField | CheckboxField | SelectField>
}

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

type CheckboxField = Field & {
  type: 'checkbox'
  value?: boolean
}

type SelectField = Field & {
  type: 'select'
  options: string[]
}
```
