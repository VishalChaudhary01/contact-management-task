import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function Loader() {
  return (
    <Stack sx={{ alignItems: 'center'}} spacing={1}>
      <Skeleton variant="text" width={'90%'} sx={{ fontSize: '5rem' }} />
      <Skeleton variant="rectangular" width={'90%'} height={400} />
    </Stack>
  );
}