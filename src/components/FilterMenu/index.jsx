import { styled } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Autocomplete from '@mui/material/Autocomplete';

const PREFIX = 'index';

const classes = {
  filterMenu: `${PREFIX}-filterMenu`
};

const StyledTextField = styled(TextField)({
  [`& .${classes.filterMenu}`]: {
    padding: "10px",
  },
});

export default function FilterMenu({type, value, setter, optionsHook, width}) {
  const query = optionsHook();
  if (query.isError) console.error(query.error);
  const style = {textTransform: "capitalize"};
  const label = type.replaceAll("_", " ");
  if ( width ) style.width = width;
  const onChange = (_, newValue) => {
    setter({[type]: newValue})
  };
  const filterOptions = (options, { inputValue }) => {
    if (!inputValue) return options;
    let result = [];
    result.push(...options.filter((item) => item === inputValue));
    result.push(
      ...options.filter((item) => {
        if (result.indexOf(item) !== -1) return false;
        return item.startsWith(inputValue);
      })
    );
    result.push(
      ...options.filter((item) => {
        if (result.indexOf(item) !== -1) return false;
        return item.includes(inputValue);
      })
    );
    return result;
  };

  return (
    <Autocomplete
      value={value || null}
      filterOptions={filterOptions}
      autoHighlight
      autoSelect
      loading={query.isLoading}
      onChange={onChange}
      options={query.data || []}
      renderInput={(params) => <StyledTextField {...params} label={label} />}
      className={classes.filterMenu}
      style={style}
      size="small"
    />
  );
}
