import React, { FormHTMLAttributes } from 'react'
import { AVAILABLE_EXERCISES_ARRAY } from '../../consts/exercises';
import { useForm } from "react-hook-form";

import styles from './PointForm.module.scss'

interface PointFormProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: never
}

export const PointForm: React.FC<PointFormProps> = ({...rest}) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <form className={styles.new_exercise__form} onSubmit={handleSubmit(onSubmit)} {...rest}>
      <ul>
        {AVAILABLE_EXERCISES_ARRAY.map((exercise) => (
          <li key={exercise.value} className={styles.input__wrapper}>
            <div className={styles.exercise__name}>
              <span>{exercise.label}&nbsp;</span>
              <span>({exercise.typeLabel.longLabel})</span>
            </div>
            <input 
              type="number" 
              size={1} 
              className={styles.exercise__points}
              placeholder="0"
              {...register(exercise.value)}
            />
          </li>
        ))}
      </ul>
    </form>
  );
}
