import { Drawer, List, ListItem, ListItemText } from '@mui/material';

function LeftMenu({ isOpen, onClose }) {
    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        onClose(open);
    };

    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {['Home', 'Board', 'FAQ', 'Contact'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
}

export default LeftMenu;