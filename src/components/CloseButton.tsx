import { X } from 'phosphor-react';
import { Popover } from '@headlessui/react';

function CloseButton() {
  return (
    <Popover.Button
      className='top-5 right-5 absolute text-zink-400'
      title='Fechar formulário'
    >
      <X className='w-4 h-4' weight='bold' />
    </Popover.Button>
  );
}

export default CloseButton;
