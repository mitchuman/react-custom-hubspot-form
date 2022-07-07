import React from 'react'
import ReactDOM from 'react-dom/client'
import { useHubspotForm } from './useHubspotForm'

const App = () => {
  const { Form } = useHubspotForm({
    portalId: process.env.REACT_APP_PORTAL_ID,
    formId: process.env.REACT_APP_FORM_ID,
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
      {
        name: 'watch_again',
        label: 'Watch again?',
        type: 'radio',
        options: ['Yes', 'No'],
      }
    ],
    debug: true,
    apiKey: process.env.REACT_APP_API_KEY,
  })

  return <Form/>
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
