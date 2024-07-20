import { InputHTMLAttributes, forwardRef, ForwardedRef } from 'react'
import { classNames } from '@/shared/utils'

import c from './input.module.scss'

type IInputProps = {
   label?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef(( { label, className, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement> ) => {
	
   const input = (
      <input
			className={classNames(className, c.input )}
			{...props}
			ref={ref}
		/>
   )

   if ( !label ) {
      return input
   }

   return (
      <div className={c.label_wrapper} >
         <label htmlFor={props.id} >{label}</label>
         {input}
      </div>
   )
})
