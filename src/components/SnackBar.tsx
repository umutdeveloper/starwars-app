import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

interface SnackBarProps {
  severity: 'error' | 'success';
  message: string;
}
function SnackBar({ severity, message }: SnackBarProps) {
  return (
    <Snackbar open>
      <MuiAlert elevation={6} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

export default SnackBar;
