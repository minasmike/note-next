'use client'
import * as React from 'react';
import { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Buttoncomponent from './button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
interface ConfirmationDialogProps {
    onDelete: () => void;
    title: string;
    openConfirmation: boolean;
    setopenConfirmation: (value: boolean) => void;
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide: FC<ConfirmationDialogProps> = ({ title, onDelete, openConfirmation, setopenConfirmation }) => {


    const handleClickOpen = () => {
        setopenConfirmation(true);
    };

    const handleClose = () => {
        setopenConfirmation(false);
    };

    const handleDelete = () => {
        onDelete(); // Call the delete function passed as a prop
        setopenConfirmation(false); // Close the confirmation dialog
    };

    return (
        <React.Fragment>
            <Dialog
                open={openConfirmation}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete this note?
                    </DialogContentText>
                    <div className='bg bg-gray-100  rounded-xl py-4 flex justify-center'>
                        <DialogContentText id="alert-dialog-slide-description">
                            {title.toUpperCase()}
                        </DialogContentText>
                    </div>

                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button> */}
                    <Buttoncomponent
                        text='Cancel'
                        onClickAction={handleClose}
                        disabled={false}
                        className='bg-blue-600 text-black hover:bg-blue-600 hover:text-white '
                    />
                    <Buttoncomponent
                        text='Delete'
                        onClickAction={handleDelete}
                        disabled={false}
                        className='bg-red-600 text-black hover:bg-red-600 hover:text-white '
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
export default AlertDialogSlide;