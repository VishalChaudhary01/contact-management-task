import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISortByProps {
  sort: string;
  handleSort: (e: SelectChangeEvent) => void;
}
export function SortBy({ sort, handleSort }: ISortByProps) {

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="sortBy">Sort by</InputLabel>
      <Select
        labelId="sortBy"
        id="sort"
        value={sort}
        label="Sort"
        onChange={handleSort}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="latest">Latest</MenuItem>
        <MenuItem value="oldest">Oldest</MenuItem>
        <MenuItem value="name">Name</MenuItem>
      </Select>
    </FormControl>
  );
}