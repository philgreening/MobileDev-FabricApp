import DetailsScreen from "../screens/DetailsScreen";
import { render } from "@testing-library/react-native";

const navOptions = {
  navigation: {
    setOptions: () => {},
  },
};

describe("<DetailsScreen />", () => {
  it("should match snapshot", () => {
    const snap = render(
      <DetailsScreen
        route={{ params: { data: { uri: "data" } } }}
        {...navOptions}
      />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
