import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, AppBar, Toolbar } from "@mui/material";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Определяем индекс активной вкладки по текущему пути
  const currentTab = location.pathname === "/favorites" ? 1 : 0;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    if (newValue === 0) navigate(`/movies`);
    else if (newValue === 1) navigate(`/favorites`);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 5 }}>
      <Toolbar sx={{ height: 56, px: 3 }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="fullWidth"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Поиск" />
          <Tab label="Избранное" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}
