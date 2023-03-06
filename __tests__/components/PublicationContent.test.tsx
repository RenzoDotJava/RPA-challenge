import { render, screen } from "@testing-library/react-native";
import PublicationContent from "../../components/PublicationContent";

const props = {
	index: 1,
  title: 'title',
  body: 'body'
};

describe("Testing <PublicationTitle />", () => {
	it("Matching snapshot", () => {
		render(<PublicationContent {...props} />);

		expect(screen).toMatchSnapshot();
	});

	it("Showing the props", () => {
		render(<PublicationContent {...props} />);

		expect(screen.getByText(props.title)).toBeTruthy();
		expect(screen.getByText(props.body)).toBeTruthy();
	});
});