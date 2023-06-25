import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
    image: {
        maxWidth: '600px',
        maxHeight: '100%',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

const ImageSlider = ({ open, images, handleClose }) => {
    const classes = useStyles();
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    };

    const handlePrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === 0 ? images.length - 1 : prevSlide - 1));
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogContent>
                <div className={classes.buttonContainer}>
                    <Button onClick={handlePrevSlide} color="primary">
                        <NavigateBeforeIcon />
                    </Button>
                    <img src={images[currentSlide]} alt={`Image ${currentSlide}`} className={classes.image} />
                    <Button onClick={handleNextSlide} color="primary">
                        <NavigateNextIcon />
                    </Button>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageSlider;