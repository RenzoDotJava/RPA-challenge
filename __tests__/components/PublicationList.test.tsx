import { render, act, waitFor, screen } from "@testing-library/react-native";
import PublicationList from "../../components/PublicationList";
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

describe("Testing <PublicationList />", () => {
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
				<PublicationList />
			</PublicationContext.Provider>
		);

		act(() => {
			expect(screen).toMatchSnapshot();
		});

		waitFor(() => {
			expect(screen.getByTestId("publication-list")).toBeDefined();
		});
	});

	it("Showing the empty list", () => {
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
				<PublicationList />
			</PublicationContext.Provider>
		);

		expect(screen.getByText("No hay publicaciones")).toBeTruthy();
	});

	it("Showing the publication list", () => {
		render(
			<PublicationContext.Provider
				value={{
					filteredUsersPublications: userPublications,
					search: "",
					loading: false,
					getUsersPublications: jest.fn(),
					searchFilter: jest.fn(),
					onRefreshPublications: jest.fn()
				}}
			>
				<PublicationList />
			</PublicationContext.Provider>
		);

		expect(screen.queryAllByTestId("publication-title").length).toBe(
			userPublications.length
		);
	});

	it("Running onRefresh function when doing pull to refresh", async () => {

    const onRefreshMockup = jest.fn();

		render(
			<PublicationContext.Provider
				value={{
					filteredUsersPublications: userPublications,
					search: "",
					loading: false,
					getUsersPublications: jest.fn(),
					searchFilter: jest.fn(),
					onRefreshPublications: onRefreshMockup
				}}
			>
				<PublicationList />
			</PublicationContext.Provider>
		);

		const publicationList = screen.getByTestId("publication-list");
		expect(publicationList).toBeDefined();

		const { refreshControl } = publicationList.props;

		await act(async () => {
			refreshControl.props.onRefresh();
		});

		expect(onRefreshMockup).toHaveBeenCalled();
	});
});
