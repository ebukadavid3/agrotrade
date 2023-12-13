import { Button,Dialog,DialogActions,DialogContent,DialogTitle, } from '@mui/material';

export default function CustomDialog({openProp,handleCloseProp,title,children}) {
    return (
        <Dialog
        open={openProp}
        onClose={handleCloseProp}
        aria-labelledby="alert-dialog-title"
        aria-aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

            <DialogContent>{children}</DialogContent>

            <DialogActions><Button onClick={handleCloseProp}>Dismiss</Button></DialogActions>
        </Dialog>
    )
}