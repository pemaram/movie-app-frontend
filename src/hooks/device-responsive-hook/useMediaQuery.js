import { useMediaQuery, useTheme } from "@mui/material";

export default function useDevicePreference() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return isMobile;
}
