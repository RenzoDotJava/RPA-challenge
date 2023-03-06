import { render, screen, fireEvent } from "@testing-library/react-native";
import Header from "../../components/Header";
import { PublicationContext } from "../../context/PublicationContext";

const userPublications = [
	{
		userId: 1,
		data: [
			{
				id: 1,
				title: "title mockup 1",
				body: "body mockup 1",
			},
		],
	},
	{
		userId: 2,
		data: [
			{
				id: 2,
				title: "title mockup 2",
				body: "body mockup 2",
			},
		],
	},
];

describe("Testing <Header />", () => {
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
				<Header />
			</PublicationContext.Provider>
		);

		expect(screen).toMatchSnapshot();
	});

	it("Running searchFilter function when changing the text", () => {
		const searchFilterMockup = jest.fn();
		const text = "title";

		render(
			<PublicationContext.Provider
				value={{
					filteredUsersPublications: userPublications,
					search: "",
					loading: false,
					getUsersPublications: jest.fn(),
					searchFilter: searchFilterMockup,
					onRefreshPublications: jest.fn()
				}}
			>
				<Header />
			</PublicationContext.Provider>
		);

		const textInput = screen.getByTestId("search-bar");

		fireEvent.changeText(textInput, text);

		expect(searchFilterMockup).toHaveBeenCalledWith(text);
	});

});
