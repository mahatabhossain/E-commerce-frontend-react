import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet } from 'react-router-dom';
import './profile.css'
import SettingsIcon from '@mui/icons-material/Settings';
import PaymentIcon from '@mui/icons-material/Payment';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';


const drawerWidth = 220;
export default function ClippedDrawer() {

    const profilePaths = ['orders', 'account', 'payment'];
    const profileControl = ['help/center', 'logout'];
    const profileControlIcon = [ <PersonRemoveIcon/>, <LogoutIcon/>];
    const profielPathsIcon = [<ShoppingBasketIcon/>, <SettingsIcon/>, <PaymentIcon/>];

    return (
        <div className='profile_container'>
        <Box sx={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    position: 'none',
                     top: 'none',
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{
                     overflow: 'auto',
                     position: 'none',
                     top: 'none'
                     }}>
                    <List>
                        {['My Orders', 'Account Settings', 'Payment',].map((text, index) => (
                            <Link key={index + text} to={profilePaths[index]}>
                                <ListItem  disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                          {profielPathsIcon[index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Help Center', 'Logout'].map((text, index) => (
                            <Link key={index + text} to={profileControl[index]}>
                                <ListItem  disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {profileControlIcon[index]}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet/>
            </Box>
        </Box>
        </div>
    );
}
