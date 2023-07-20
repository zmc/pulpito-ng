import MuiLink from "@mui/material/Link";

export default function Link(props) {
  return (
    <MuiLink href={props.to} target="_blank">
      {props.children}
    </MuiLink>
  );
}
