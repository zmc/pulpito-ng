import { Link as RouterLink } from "react-router-dom";
import MuiLink from "@mui/material/Link";

export default function Link(props) {
  const LinkComponent = props.linkComponent || MuiLink;
  return (
    <RouterLink to={props.to} component={LinkComponent} target="_blank">
      {props.children}
    </RouterLink>
  );
}
