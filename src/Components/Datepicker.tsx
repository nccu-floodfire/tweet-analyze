import {Box, Typography,createTheme, ThemeProvider} from '@mui/material';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs'; // 引入 Dayjs 類型
import utc from 'dayjs/plugin/utc'; // 導入 utc 插件

interface DatepickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
}
const newTheme = (theme) => createTheme({
  ...theme,
  typography: {
    fontSize: 20, // 調整這個值以改變字體大小
  },
  components: {
    MuiDateCalendar: {
      styleOverrides: {
        root: {
          color: 'black',
          borderRadius: '4px',
          borderWidth: '0px',
          borderColor: '#2196f3',
          border: '0px solid',
          backgroundColor: 'white',
        }
      }
    },
    MuiPickersToolbar: {
      styleOverrides: {
        content: {
          color: 'white',
          borderRadius: '4px',
          borderWidth: '0px',
          borderColor: 'white',
          border: '0px solid white' ,
          backgroundColor: 'white',
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#e3f2fd',
    },
  },
})
const theme = createTheme({
  
  
});
export function Datepicker({startDate, endDate, setStartDate, setEndDate}: DatepickerProps) {
  
  dayjs.extend(utc);

  return (
    <ThemeProvider theme={newTheme}>
              <Box >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="開始日期"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    sx={{backgroundColor: "#D0D0D0", borderRadius: "4px"}}
                  />
                  
                  <DatePicker
                    label="結束日期"
                    value={endDate}
                    onChange={(date) => setEndDate(date)}
                    sx={{backgroundColor: "#D0D0D0", borderRadius: "4px"}}

                  />
                </LocalizationProvider>
              </Box>
    </ThemeProvider>
  );
}