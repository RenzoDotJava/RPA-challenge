import { render, screen } from "@testing-library/react-native";
import PublicationTitle from "../../components/PublicationTitle";

const props = {
	userId: 1,
};

describe("Testing <PublicationTitle />", () => {
	it("Matching snapshot", () => {
		render(<PublicationTitle {...props} />);

		expect(screen).toMatchSnapshot();
	});

	it("Showing the props", () => {
		render(<PublicationTitle {...props} />);

		expect(screen.getByText(`User ${props.userId}`)).toBeTruthy();
	});
});
