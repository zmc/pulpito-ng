import MuiLink from "@mui/material/Link";

export default function IconLink(props) {
  return (
    <MuiLink href={props.to} target="_blank" color="inherit">
      {props.children}
    </MuiLink>
  );
}
