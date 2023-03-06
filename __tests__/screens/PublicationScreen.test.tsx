import { render, act, waitFor, screen, fireEvent } from "@testing-library/react-native";
import PublicationScreen from "../../screens/PublicationScreen";
import { PublicationContext } from "../../context/PublicationContext";

describe("Testing <PublicationScreen />", () => {
	beforeEach(() => jest.clearAllMocks());

	it("Matching snapshot", () => {
		render(
			<PublicationContext.Provider
				value={{
					filteredUsersPublications: [],
					search: "",
					loading: false,
					getUsersPublications: jest.fn(),
					searchFilter: jest.fn(),
					onRefreshPublications: jest.fn()
				}}
			>
				<PublicationScreen />
			</PublicationContext.Provider>
		);

		act(() => {
			expect(screen).toMatchSnapshot();
		});

		waitFor(() => {
			expect(screen.getByTestId("publication-list")).toBeDefined();
		});
	});
});
