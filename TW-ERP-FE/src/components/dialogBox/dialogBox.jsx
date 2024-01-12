import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export const DialogBox = (props) => {
  const { title, children, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{ justifyContent: "center", display: "flex" }}
      open={open}
      maxWidth="md"
      fullWidth
      onClose={handleClose}
    >
      <DialogTitle>
        <div>{title}</div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
