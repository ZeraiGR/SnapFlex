import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
	const error = useRouteError();
	console.error(error);

  return (
    <>
			<h1>Opp's some error has occured!</h1>
			<h3>Go to start page and try again!</h3>
			<p>
        <i>{error.statusText || error.message}</i>
      </p>
			<Link to={'/'}>To home</Link>
		</>
  );
}