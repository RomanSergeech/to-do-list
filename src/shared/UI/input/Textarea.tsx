import { forwardRef, ForwardedRef, TextareaHTMLAttributes } from 'react'
import { classNames } from '@/shared/utils'

import c from './input.module.scss'

type ITextareaProps = {
   label?: string
   wrapperClassName?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = forwardRef(( { label, wrapperClassName, className, ...props }: ITextareaProps, ref: ForwardedRef<HTMLTextAreaElement> ) => {
	
   const textarea = (
      <textarea
			className={classNames(className, c.input )}
			{...props}
			ref={ref}
		/>
   )

   if ( !label ) {
      return textarea
   }

   return (
      <div className={classNames(c.label_wrapper, wrapperClassName)} >
         <label htmlFor={props.id} >{label}</label>
         {textarea}
      </div>
   )
})
