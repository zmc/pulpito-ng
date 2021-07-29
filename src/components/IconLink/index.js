import Link from "@material-ui/core/Link";

export default function IconLink(props) {
  return (
    <Link href={props.href} target="_blank" color="inherit">
      {props.children}
    </Link>
  );
}
