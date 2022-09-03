import SearchScreen from "../screens/SearchScreen";
import { render } from "@testing-library/react-native";

const navOptions = {
  navigation: {
    setOptions: () => {},
  },
};

describe("<SearchScreen />", () => {
  it("should match snapshot", () => {
    const snap = render(
      <SearchScreen route={{ params: { data: "somedata" } }} {...navOptions} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
