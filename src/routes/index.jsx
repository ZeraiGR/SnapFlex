import { Link } from "react-router-dom";

export default function Index() {
  return (
    <>
			<h1>Hi, there!</h1>
			<h3>Let's train immediately</h3>
			<Link className="button" to={'/combinator'}>Train!</Link>
		</>
  );
}