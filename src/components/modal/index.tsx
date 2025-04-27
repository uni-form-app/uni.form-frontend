import { ReactNode } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface ModalProps {
  triggerText: string;
  title: string;
  description?: string;
  children?: ReactNode;
  buttonProps?: React.ComponentProps<typeof Button>;
}

export const Modal = (props: ModalProps) => {
  const {
    triggerText,
    title,
    description,
    children,
    buttonProps = {},
  } = props;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...buttonProps}>
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
