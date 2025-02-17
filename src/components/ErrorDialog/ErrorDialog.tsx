import React, { PropsWithChildren, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import enhanceMessage from './enhanceMessage';
import { TwilioError } from 'twilio-video';
import useSessionContext from 'hooks/useSessionContext';
import { UserGroup } from 'types/UserGroup';

interface ErrorDialogProps {
  dismissError: Function;
  error: TwilioError | Error | null;
}

function ErrorDialog({ dismissError, error }: PropsWithChildren<ErrorDialogProps>) {
  const { message, code } = error || {};
  const enhancedMessage = enhanceMessage(message, code);
  const { userGroup } = useSessionContext();

  useEffect(() => {
    if (userGroup == UserGroup.StreamServer || userGroup === UserGroup.StreamServerTranslated) {
      setTimeout(() => {
        dismissError();
      }, 5000);
    }
  }, [message]);

  return (
    <Dialog open={error !== null} onClose={() => dismissError()} fullWidth={true} maxWidth="xs">
      <DialogTitle>ERROR</DialogTitle>
      <DialogContent>
        <DialogContentText>{enhancedMessage}</DialogContentText>
        {Boolean(code) && (
          <pre>
            <code>Error Code: {code}</code>
          </pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dismissError()} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ErrorDialog;
