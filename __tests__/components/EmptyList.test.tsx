import { render, screen } from "@testing-library/react-native";
import EmptyList from "../../components/EmptyList";

const props = {
	text: 'text'
};

describe("Testing <PublicationTitle />", () => {
	it("Matching snapshot", () => {
		render(<EmptyList {...props} />);

		expect(screen).toMatchSnapshot();
	});

	it("Showing the props", () => {
		render(<EmptyList {...props} />);

		expect(screen.getByText(props.text)).toBeTruthy();
	});
});