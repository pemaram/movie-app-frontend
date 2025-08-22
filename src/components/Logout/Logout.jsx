import { Button, Typography } from "@mui/material"
import useLogout from "../../hooks/api-hook/useLogoutApi"
import useDevicePreference from "../../hooks/device-responsive-hook/useMediaQuery"
import LogoutIcon from "@mui/icons-material/Logout";
const Logout = () => {

    const isMobile = useDevicePreference()
    const handleLogout = useLogout()

    return (
        <Button onClick={handleLogout} style={{ color: "white" }}>
            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                    fontSize: "18px",
                    fontWeight: 500,
                    fontFamily: 'Montserrat, sans-serif'
                }}
            >
                {!isMobile && "Logout"}
                <LogoutIcon />
            </Typography>
        </Button>
    )
}

export default Logout