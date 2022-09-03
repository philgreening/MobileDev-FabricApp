import AddItemScreen from "../screens/AddItemScreen";
import { render } from "@testing-library/react-native";

const navOptions = {
  navigation: {
    setOptions: () => {},
  },
};

describe("<AddItemScreen />", () => {
  it("should match snapshot", () => {
    const snap = render(
      <AddItemScreen route={{ params: { data: "somedata" } }} {...navOptions} />
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
