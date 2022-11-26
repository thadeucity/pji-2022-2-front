import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '../Button/Button';
import { Portal } from '../Portal';

import styles from './GroupModal.module.scss';
import { groupFormSchema } from './GroupForm.schema';
import { enterGroup } from '../../io/group';
import { useAppMenu } from '../../hooks/useAppMenu';
import { useAppUser } from '../../hooks/user';

interface GroupModalProps{
  isOpen: boolean
  onClose: (b?: boolean) => void
  currentGroup?: string
}

interface GroupFormData {
  name: string
}

export const GroupModal: React.FC<GroupModalProps> = ({isOpen, onClose, currentGroup}) => {
  const { register, handleSubmit } = useForm<GroupFormData>({
    resolver: yupResolver(groupFormSchema),
    defaultValues: {name: currentGroup}
  });

  const {refreshUser} = useAppUser();

  const onSubmit = async (data: GroupFormData) => {
    const {res} = await enterGroup(data.name || '');

    if(res) {
      refreshUser();
      onClose(true);
    }
  }

  if (!isOpen) return null

  return (
    <Portal selector='__MODALS_PORTAL__'>
      <form className={styles.group__modal} onSubmit={handleSubmit(onSubmit)}>
        <button type="button" className={styles.close_btn} onClick={() => onClose()}/>
        <div className={styles.group__modal__content}>
          <input size={1} placeholder="nome do grupo" {...register('name')}/>
          <Button type='submit'>Criar / Entrar no Grupo</Button>
        </div>
      </form>
    </Portal>
  );
}
