# Customizable HubSpot Form (React Hook)
A React hook to render customizable Hubspot forms

## Installation

```sh
npm install react-custom-hubspot-form
```

## Usage

### Basic implementation

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
    ],
    submitLabel: 'Vote now!',
  })

  return <Form />
}
```

### Custom fields

```jsx
const { Fields, Form } = useHubspotForm(/* config */)
const [Name, Movie] = Fields  // order based on `config.fields`

return (
  <Form className="...">
    <Name component={CustomField} />
    <Movie className="..." />

    <button type="submit">Vote now!</button>
    <button type="reset">Reset</button>
  </Form>
)
```

Default `<Field>` components are documented [here](/src/fields.jsx).

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

### Custom form (and response)

```jsx
const { onSubmit, response, result, Fields } = useHubspotForm(/* config */)

if (response?.ok && !!result?.redirectUri) {
  window.location.href = result.redirectUri
  return <p>Redirecting...</p>
}

if (response?.ok && !!result?.inlineMessage) {
  return <div dangerouslySetInnerHTML={{ __html: result.inlineMessage }} />
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

## Debug

Set `config.debug: true` with an `apiKey` to retrieve the API endpoint to help with populating `config.fields`.

```jsx
useHubspotForm({
  portalId: '...',
  formId: '...',
  // fields: idk yet...,

  debug: true,
  apiKey: '...',
})

// open browser console (debug panel) to see the endpoint URL
```

## Config

`config` parameters are documented [here](/src/types.ts).

## Return values

|value|description|example|
|-|-|-|
|`onSubmit`| Submission handler to use in the native `<form>` tag | `<form onSubmit={onSubmit} />` |
|`response`| Response object returned from the HubSpot API | `response.ok` |
|`result`| Resulting object from a successful response | `result.inlineMessage`<br>`result.redirectUri` |
|`Fields`| Array of inputs as React components used to destructure | `const [First, Second, ...theRest] = Fields` |
|`Form`| React component with `onSubmit`, `Fields` and a submit button included by default.<br>Setting `children` will override the fields and submit button. | `<Form>...</Form>` |
