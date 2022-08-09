import { forwardRef } from 'react'

// TODO: add error handling

export const Input = forwardRef(({ label, value, className, ...props }, ref) => (
	<label htmlFor={props.name} className={className} data-type={props.type || 'text'}>
		<small>{label}{props.required && <span>*</span>}</small>
		<input
			ref={ref}
			id={props.name}
			placeholder={label}
			defaultValue={value}
			{...props}
		/>
	</label>
))

export const Textarea = forwardRef(({ label, value, className, ...props }, ref) => (
	<label htmlFor={props.name} className={className} data-type={props.type}>
		<small>{label}{props.required && <span>*</span>}</small>
		<textarea
			id={props.name}
			placeholder={label}
			defaultValue={value}
			{...props}
		/>
	</label>
))

export const Select = forwardRef(({ label, options, value = '', className, ...props }, ref) => (
	<label htmlFor={props.name} className={className} data-type={props.type}>
		<small>{label}{props.required && <span>*</span>}</small>
		<select id={props.name} defaultValue={value} {...props}>
			<option value="" disabled>Please select</option>
			{options?.map((option, key) => (
				<option value={option} key={key}>{option}</option>
			))}
		</select>
	</label>
))

export const Checkbox = forwardRef(({ label, value, className, ...props }, ref) => (
	<label htmlFor={props.name} className={className} data-type={props.type}>
		<input
			id={props.name}
			defaultChecked={value}
			defaultValue={value}
			{...props}
		/>
		{label}
	</label>
))

export const Radio = forwardRef(({ label, options, value, className, ...props }, ref) => (
	<div className={className} data-type={props.type}>
		<small>{label}{props.required && <span>*</span>}</small>
		{options?.map((option, key) => (
			<label key={key}>
				<input
					defaultChecked={value === option}
					defaultValue={value === option && option}
					{...props}
				/>
				{option}
			</label>
		))}
	</div>
))
