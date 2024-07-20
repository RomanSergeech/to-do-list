import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

import c from './checkbox.module.scss'

type CheckboxProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>

const Checkbox = (props: CheckboxProps) => {
	return (
		<div className={c.checkbox}>

			<input
				type="checkbox"
				{...props}
			/>

			<label htmlFor={props.id} >
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.91869 9.90412L3.17719 7.16262L2 8.33981L5.91869 12.2585L14 4.17719L12.8228 3L5.91869 9.90412Z" fill="#0D0D0D"/></svg>
      </label>

		</div>
	)
}

export { Checkbox }