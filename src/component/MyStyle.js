import { styled } from '@mui/material/styles';
import { Button, TableCell, ListItem, List } from '@mui/material';
import { Drawer, Paper } from "@mui/material";



export const CustomButton = styled(Button)({
    color: '#fff',
    backgroundColor: '#fdb8b9',
    '&:hover': {
        backgroundColor: '#c1a5fc',
    },
});

export const CustomLoginButton = styled(Button)({
    color: '#fff',
    backgroundColor: '#fdb8b9',
    width: '300px',
    height: '50px',
    margin : '20px 0 30px 0',
    '&:hover': {
        backgroundColor: '#c1a5fc',

    },
});

export const CustomCurrentLoginButton = styled(Button)({
    color: '#fff',
    backgroundColor: '#fdb8b9',
    width: '100px',
    height: '50px',
    margin : '20px 0 30px 0',
    '&:hover': {
        backgroundColor: '#c1a5fc',

    },
});


export const CustomCategoryButton = styled(Button)({
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fff',
    backgroundColor: '#fdb8b9',
    width: '25%',
    height: '50px',
    margin : '20px 0 30px 0',
    '&:hover': {
        backgroundColor: '#c1a5fc',
    },
    '&:click': {
        backgroundColor: '#c1a5fc',
    }
})

export const CustomList = styled(List)({
    backgroundColor: '#fdb8b9',
})

export const CustomListItemButton = styled(ListItem)({
    color: '#fff',
    '&:hover': {
        color: '#c1a5fc',
    },

})




export const CustomTableCell = styled(TableCell)({
    backgroundColor: '#f2eeff',
    width: '10%',
    '& img': {
        maxWidth: '100%',
    },
});

